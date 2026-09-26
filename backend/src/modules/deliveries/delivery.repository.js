import { pool } from "../../config/database.js";

export const createDelivery = async ({
    reference,
    customerName,
    sourceLocationId,
    scheduledDate,
    createdBy,
}) => {
    const result = await pool.query(
        `
        INSERT INTO deliveries (
            reference,
            customer_name,
            source_location_id,
            scheduled_date,
            created_by
        )
        VALUES ($1, $2, $3, $4, $5)
        RETURNING *
        `,
        [
            reference,
            customerName || null,
            sourceLocationId,
            scheduledDate || null,
            createdBy,
        ]
    );

    return result.rows[0];
};

export const addDeliveryItem = async ({
    deliveryId,
    productId,
    quantity,
}) => {
    const result = await pool.query(
        `
        INSERT INTO delivery_items (
            delivery_id,
            product_id,
            quantity
        )
        VALUES ($1, $2, $3)
        RETURNING *
        `,
        [
            deliveryId,
            productId,
            quantity,
        ]
    );

    return result.rows[0];
};

export const findDeliveryById = async (id) => {
    const deliveryResult = await pool.query(
        `
        SELECT
            d.*,
            l.name AS source_location_name,
            l.short_code AS source_location_code,
            w.name AS warehouse_name
        FROM deliveries d
        JOIN locations l
            ON l.id = d.source_location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        WHERE d.id = $1
        `,
        [id]
    );

    if (!deliveryResult.rows[0]) {
        return null;
    }

    const itemsResult = await pool.query(
        `
        SELECT
            di.id,
            di.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,
            di.quantity
        FROM delivery_items di
        JOIN products p
            ON p.id = di.product_id
        WHERE di.delivery_id = $1
        ORDER BY p.name
        `,
        [id]
    );

    return {
        ...deliveryResult.rows[0],
        items: itemsResult.rows,
    };
};

export const findAllDeliveries = async () => {
    const result = await pool.query(
        `
        SELECT
            d.id,
            d.reference,
            d.customer_name,
            d.status,
            d.scheduled_date,
            d.delivery_date,
            l.name AS source_location_name,
            w.name AS warehouse_name,
            d.created_at
        FROM deliveries d
        JOIN locations l
            ON l.id = d.source_location_id
        JOIN warehouses w
            ON w.id = l.warehouse_id
        ORDER BY d.created_at DESC
        `
    );

    return result.rows;
};

export const getDeliveryItemsForUpdate = async (
    client,
    deliveryId
) => {
    const result = await client.query(
        `
        SELECT
            product_id,
            quantity
        FROM delivery_items
        WHERE delivery_id = $1
        `,
        [deliveryId]
    );

    return result.rows;
};

export const markDeliveryDone = async (
    client,
    deliveryId,
    validatedBy
) => {
    const result = await client.query(
        `
        UPDATE deliveries
        SET
            status = 'done',
            delivery_date = NOW(),
            validated_by = $1,
            validated_at = NOW(),
            updated_at = NOW()
        WHERE id = $2
          AND status != 'done'
          AND status != 'canceled'
        RETURNING *
        `,
        [validatedBy, deliveryId]
    );

    return result.rows[0];
};