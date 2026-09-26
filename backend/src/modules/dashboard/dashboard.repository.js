import { pool } from "../../config/database.js";




export const getTotalProducts = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM products
        WHERE is_active = TRUE
    `);

    return result.rows[0].total;
};



export const getTotalStock = async () => {
    const result = await pool.query(`
        SELECT COALESCE(SUM(quantity), 0) AS total
        FROM stock
    `);

    return result.rows[0].total;
};



export const getLowStockCount = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM (
            SELECT
                p.id,
                p.reorder_level,
                COALESCE(SUM(s.quantity), 0) AS total_quantity
            FROM products p
            LEFT JOIN stock s
                ON s.product_id = p.id
            WHERE p.is_active = TRUE
            GROUP BY p.id, p.reorder_level
            HAVING COALESCE(SUM(s.quantity), 0) <= p.reorder_level
        ) low_stock
    `);

    return result.rows[0].total;
};



export const getOutOfStockCount = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM (
            SELECT
                p.id
            FROM products p
            LEFT JOIN stock s
                ON s.product_id = p.id
            WHERE p.is_active = TRUE
            GROUP BY p.id
            HAVING COALESCE(SUM(s.quantity), 0) = 0
        ) out_of_stock
    `);

    return result.rows[0].total;
};




export const getPendingReceipts = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM receipts
        WHERE status IN ('draft', 'waiting', 'ready')
    `);

    return result.rows[0].total;
};




export const getPendingDeliveries = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM deliveries
        WHERE status IN ('draft', 'waiting', 'ready')
    `);

    return result.rows[0].total;
};





export const getScheduledTransfers = async () => {
    const result = await pool.query(`
        SELECT COUNT(*)::int AS total
        FROM transfers
        WHERE status IN ('draft', 'waiting', 'ready')
    `);

    return result.rows[0].total;
};




export const getRecentMovements = async (limit = 10) => {
    const result = await pool.query(
        `
        SELECT
            sl.id,
            sl.movement_type,
            sl.quantity_change,
            sl.reference_type,
            sl.reference_id,
            sl.created_at,

            p.name AS product_name,
            p.sku,

            l.name AS location_name,

            w.name AS warehouse_name,

            u.name AS performed_by_name

        FROM stock_ledger sl

        JOIN products p
            ON p.id = sl.product_id

        JOIN locations l
            ON l.id = sl.location_id

        JOIN warehouses w
            ON w.id = l.warehouse_id

        LEFT JOIN users u
            ON u.id = sl.performed_by

        ORDER BY sl.created_at DESC

        LIMIT $1
        `,
        [limit]
    );

    return result.rows;
};