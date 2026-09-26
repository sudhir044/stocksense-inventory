import { pool } from "../../config/database.js";

export const findLedgerEntries = async ({
    productId,
    locationId,
    warehouseId,
    movementType,
    referenceType,
    fromDate,
    toDate,
    search,
}) => {
    const values = [];
    const conditions = [];

    const addCondition = (condition, value) => {
        values.push(value);
        conditions.push(condition.replace("$VALUE", `$${values.length}`));
    };

    if (productId) {
        addCondition("sl.product_id = $VALUE", productId);
    }

    if (locationId) {
        addCondition("sl.location_id = $VALUE", locationId);
    }

    if (warehouseId) {
        addCondition("w.id = $VALUE", warehouseId);
    }

    if (movementType) {
        addCondition("sl.movement_type = $VALUE", movementType);
    }

    if (referenceType) {
        addCondition("sl.reference_type = $VALUE", referenceType);
    }

    if (fromDate) {
        addCondition("sl.created_at >= $VALUE", fromDate);
    }

    if (toDate) {
        addCondition("sl.created_at <= $VALUE", toDate);
    }

    if (search) {
        values.push(`%${search}%`);

        conditions.push(`
            (
                p.name ILIKE $${values.length}
                OR p.sku ILIKE $${values.length}
                OR sl.reference_type ILIKE $${values.length}
                OR sl.movement_type ILIKE $${values.length}
            )
        `);
    }

    const whereClause =
        conditions.length > 0
            ? `WHERE ${conditions.join(" AND ")}`
            : "";

    const query = `
        SELECT
            sl.id,

            sl.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,

            sl.location_id,
            l.name AS location_name,
            l.short_code AS location_code,

            w.id AS warehouse_id,
            w.name AS warehouse_name,
            w.short_code AS warehouse_code,

            sl.movement_type,
            sl.quantity_change,

            sl.reference_type,
            sl.reference_id,

            sl.performed_by,
            u.name AS performed_by_name,

            sl.notes,
            sl.created_at

        FROM stock_ledger sl

        JOIN products p
            ON p.id = sl.product_id

        JOIN locations l
            ON l.id = sl.location_id

        JOIN warehouses w
            ON w.id = l.warehouse_id

        LEFT JOIN users u
            ON u.id = sl.performed_by

        ${whereClause}

        ORDER BY sl.created_at DESC
    `;

    const result = await pool.query(query, values);

    return result.rows;
};


export const findLedgerEntryById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            sl.id,

            sl.product_id,
            p.name AS product_name,
            p.sku,
            p.unit,

            sl.location_id,
            l.name AS location_name,
            l.short_code AS location_code,

            w.id AS warehouse_id,
            w.name AS warehouse_name,
            w.short_code AS warehouse_code,

            sl.movement_type,
            sl.quantity_change,

            sl.reference_type,
            sl.reference_id,

            sl.performed_by,
            u.name AS performed_by_name,

            sl.notes,
            sl.created_at

        FROM stock_ledger sl

        JOIN products p
            ON p.id = sl.product_id

        JOIN locations l
            ON l.id = sl.location_id

        JOIN warehouses w
            ON w.id = l.warehouse_id

        LEFT JOIN users u
            ON u.id = sl.performed_by

        WHERE sl.id = $1
        `,
        [id]
    );

    return result.rows[0];
};