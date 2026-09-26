import { pool } from "../../config/database.js";

export const createAdjustment = async ({
    reference,
    locationId,
    reason,
    createdBy,
}) => {
    const result = await pool.query(
        `
        INSERT INTO adjustments (
            reference,
            location_id,
            reason,
            created_by
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            reference,
            locationId,
            reason || null,
            createdBy,
        ]
    );

    return result.rows[0];
};

export const addAdjustmentItem = async ({
    adjustmentId,
    productId,
    systemQuantity,
    countedQuantity,
}) => {
    const result = await pool.query(
        `
        INSERT INTO adjustment_items (
            adjustment_id,
            product_id,
            system_quantity,
            counted_quantity
        )
        VALUES ($1, $2, $3, $4)
        RETURNING *
        `,
        [
            adjustmentId,
            productId,
            systemQuantity,
            countedQuantity,
        ]
    );

    return result.rows[0];
};

export const findAdjustmentById = async (id) => {
    const adjustmentResult = await pool.query(
        `
        SELECT
            a.*,
            l.name AS location_name,
            l.short_code AS location_code,
            w.name AS warehouse_name
        FROM adjustments a
        JOIN locations l
            ON l.id = a.location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        WHERE a.id = $1
        `,
        [id]
    );

    if (!adjustmentResult.rows[0]) {
        return null;
    }

    const itemsResult = await pool.query(
        `
        SELECT
            ai.id,
            ai.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,
            ai.system_quantity,
            ai.counted_quantity,
            ai.difference
        FROM adjustment_items ai
        JOIN products p
            ON p.id = ai.product_id
        WHERE ai.adjustment_id = $1
        ORDER BY p.name
        `,
        [id]
    );

    return {
        ...adjustmentResult.rows[0],
        items: itemsResult.rows,
    };
};

export const findAllAdjustments = async () => {
    const result = await pool.query(
        `
        SELECT
            a.id,
            a.reference,
            a.reason,
            a.status,
            a.location_id,
            l.name AS location_name,
            w.name AS warehouse_name,
            a.created_at,
            a.validated_at
        FROM adjustments a
        JOIN locations l
            ON l.id = a.location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        ORDER BY a.created_at DESC
        `
    );

    return result.rows;
};

export const markAdjustmentDone = async (
    client,
    adjustmentId,
    validatedBy
) => {
    const result = await client.query(
        `
        UPDATE adjustments
        SET
            status = 'done',
            validated_by = $1,
            validated_at = NOW(),
            updated_at = NOW()
        WHERE id = $2
          AND status = 'draft'
        RETURNING *
        `,
        [validatedBy, adjustmentId]
    );

    return result.rows[0];
};