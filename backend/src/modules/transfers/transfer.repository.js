import { pool } from "../../config/database.js";

export const createTransfer = async ({
    reference,
    sourceLocationId,
    destinationLocationId,
    scheduledDate,
    createdBy,
}) => {
    const result = await pool.query(
        `
        INSERT INTO transfers (
            reference,
            source_location_id,
            destination_location_id,
            scheduled_date,
            created_by
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            reference,
            sourceLocationId,
            destinationLocationId,
            scheduledDate || null,
            createdBy,
        ]
    );

    return result.rows[0];
};

export const addTransferItem = async ({
    transferId,
    productId,
    quantity,
}) => {
    const result = await pool.query(
        `
        INSERT INTO transfer_items (
            transfer_id,
            product_id,
            quantity
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            transferId,
            productId,
            quantity,
        ]
    );

    return result.rows[0];
};

export const findTransferById = async (id) => {
    const transferResult = await pool.query(
        `
        SELECT
            t.*,

            sl.name AS source_location_name,
            dl.name AS destination_location_name,

            sw.name AS source_warehouse_name,
            dw.name AS destination_warehouse_name

        FROM transfers t

        JOIN locations sl
            ON sl.id = t.source_location_id

        JOIN locations dl
            ON dl.id = t.destination_location_id

        JOIN warehouses sw
            ON sw.id = sl.warehouse_id

        JOIN warehouses dw
            ON dw.id = dl.warehouse_id

        WHERE t.id = $1
        `,
        [id]
    );

    if (!transferResult.rows[0]) {
        return null;
    }

    const itemsResult = await pool.query(
        `
        SELECT
            ti.id,
            ti.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,
            ti.quantity

        FROM transfer_items ti

        JOIN products p
            ON p.id = ti.product_id

        WHERE ti.transfer_id = $1

        ORDER BY p.name
        `,
        [id]
    );

    return {
        ...transferResult.rows[0],
        items: itemsResult.rows,
    };
};

export const findAllTransfers = async () => {
    const result = await pool.query(
        `
        SELECT
            t.id,
            t.reference,
            t.status,
            t.scheduled_date,
            t.transfer_date,

            sl.name AS source_location_name,
            dl.name AS destination_location_name,

            sw.name AS source_warehouse_name,
            dw.name AS destination_warehouse_name,

            t.created_at

        FROM transfers t

        JOIN locations sl
            ON sl.id = t.source_location_id

        JOIN locations dl
            ON dl.id = t.destination_location_id

        JOIN warehouses sw
            ON sw.id = sl.warehouse_id

        JOIN warehouses dw
            ON dw.id = dl.warehouse_id

        ORDER BY t.created_at DESC
        `
    );

    return result.rows;
};

export const getTransferItemsForUpdate = async (
    client,
    transferId
) => {
    const result = await client.query(
        `
        SELECT
            product_id,
            quantity

        FROM transfer_items

        WHERE transfer_id = $1
        `,
        [transferId]
    );

    return result.rows;
};

export const markTransferDone = async (
    client,
    transferId,
    validatedBy
) => {
    const result = await client.query(
        `
        UPDATE transfers

        SET
            status = 'done',
            transfer_date = NOW(),
            validated_by = $1,
            validated_at = NOW(),
            updated_at = NOW()

        WHERE id = $2
          AND status != 'done'
          AND status != 'canceled'

        RETURNING *
        `,
        [validatedBy, transferId]
    );

    return result.rows[0];
};