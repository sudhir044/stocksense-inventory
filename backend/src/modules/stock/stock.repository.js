import { pool } from "../../config/database.js";

export const findStock = async ({
    productId,
    locationId,
}) => {
    const result = await pool.query(
        `
        SELECT
            s.id,
            s.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,
            s.location_id,
            l.name AS location_name,
            l.short_code AS location_code,
            w.id AS warehouse_id,
            w.name AS warehouse_name,
            s.quantity,
            s.reserved_quantity,
            (s.quantity - s.reserved_quantity) AS free_to_use,
            s.updated_at
        FROM stock s

        JOIN products p
            ON p.id = s.product_id

        JOIN locations l
            ON l.id = s.location_id

        JOIN warehouses w
            ON w.id = l.warehouse_id

        WHERE
            ($1::uuid IS NULL OR s.product_id = $1)
            AND
            ($2::uuid IS NULL OR s.location_id = $2)

        ORDER BY p.name, w.name, l.name
        `,
        [productId || null, locationId || null]
    );

    return result.rows;
};