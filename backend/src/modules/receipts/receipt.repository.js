import { pool } from "../../config/database.js";

export const createReceipt = async ({
    reference,
    supplierName,
    destinationLocationId,
    scheduledDate,
    createdBy,
}) => {
    const result = await pool.query(
        `
        INSERT INTO receipts (
            reference,
            supplier_name,
            destination_location_id,
            scheduled_date,
            created_by
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            reference,
            supplierName || null,
            destinationLocationId,
            scheduledDate || null,
            createdBy,
        ]
    );

    return result.rows[0];
};

export const addReceiptItem = async ({
    receiptId,
    productId,
    quantity,
    unitCost,
}) => {
    const result = await pool.query(
        `
        INSERT INTO receipt_items (
            receipt_id,
            product_id,
            quantity,
            unit_cost
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            receiptId,
            productId,
            quantity,
            unitCost ?? 0,
        ]
    );

    return result.rows[0];
};

export const findReceiptById = async (id) => {
    const receiptResult = await pool.query(
        `
        SELECT
            r.*,
            l.name AS destination_location_name,
            w.name AS warehouse_name
        FROM receipts r
        JOIN locations l
            ON l.id = r.destination_location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        WHERE r.id = $1
        `,
        [id]
    );

    if (!receiptResult.rows[0]) {
        return null;
    }

    const itemsResult = await pool.query(
        `
        SELECT
            ri.id,
            ri.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,
            ri.quantity,
            ri.unit_cost
        FROM receipt_items ri
        JOIN products p
            ON p.id = ri.product_id
        WHERE ri.receipt_id = $1
        ORDER BY p.name
        `,
        [id]
    );

    return {
        ...receiptResult.rows[0],
        items: itemsResult.rows,
    };
};

export const findAllReceipts = async () => {
    const result = await pool.query(
        `
        SELECT
            r.id,
            r.reference,
            r.supplier_name,
            r.status,
            r.scheduled_date,
            r.receipt_date,
            l.name AS destination_location_name,
            w.name AS warehouse_name,
            r.created_at
        FROM receipts r
        JOIN locations l
            ON l.id = r.destination_location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        ORDER BY r.created_at DESC
        `
    );

    return result.rows;
};

export const getReceiptItemsForUpdate = async (
    client,
    receiptId
) => {
    const result = await client.query(
        `
        SELECT
            ri.product_id,
            ri.quantity
        FROM receipt_items ri
        WHERE ri.receipt_id = $1
        `,
        [receiptId]
    );

    return result.rows;
};

export const markReceiptDone = async (
    client,
    receiptId,
    validatedBy
) => {
    const result = await client.query(
        `
        UPDATE receipts
        SET
            status = 'done',
            receipt_date = NOW(),
            validated_by = $1,
            validated_at = NOW(),
            updated_at = NOW()
        WHERE id = $2
          AND status != 'done'
          AND status != 'canceled'
        RETURNING *
        `,
        [validatedBy, receiptId]
    );

    return result.rows[0];
};