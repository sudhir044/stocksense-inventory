import { pool } from "../../config/database.js";

export const createProduct = async ({
    name,
    sku,
    categoryId,
    unit,
    description,
    costPrice,
    reorderLevel,
}) => {
    const result = await pool.query(
        `
        INSERT INTO products (
            name,
            sku,
            category_id,
            unit,
            description,
            cost_price,
            reorder_level
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *
        `,
        [
            name,
            sku,
            categoryId || null,
            unit,
            description || null,
            costPrice ?? 0,
            reorderLevel ?? 0,
        ]
    );

    return result.rows[0];
};

export const findAllProducts = async () => {
    const result = await pool.query(
        `
        SELECT
            p.id,
            p.name,
            p.sku,
            p.unit,
            p.description,
            p.cost_price,
            p.reorder_level,
            p.is_active,
            p.created_at,
            c.id AS category_id,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c
            ON p.category_id = c.id
        WHERE p.is_active = TRUE
        ORDER BY p.created_at DESC
        `
    );

    return result.rows;
};

export const findProductById = async (id) => {
    const result = await pool.query(
        `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c
            ON p.category_id = c.id
        WHERE p.id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const findProductBySku = async (sku) => {
    const result = await pool.query(
        `
        SELECT
            p.*,
            c.name AS category_name
        FROM products p
        LEFT JOIN categories c
            ON p.category_id = c.id
        WHERE p.sku = $1
        `,
        [sku]
    );

    return result.rows[0];
};

export const updateProduct = async (
    id,
    {
        name,
        sku,
        categoryId,
        unit,
        description,
        costPrice,
        reorderLevel,
    }
) => {
    const result = await pool.query(
        `
        UPDATE products
        SET
            name = $1,
            sku = $2,
            category_id = $3,
            unit = $4,
            description = $5,
            cost_price = $6,
            reorder_level = $7,
            updated_at = NOW()
        WHERE id = $8
        RETURNING *
        `,
        [
            name,
            sku,
            categoryId || null,
            unit,
            description || null,
            costPrice ?? 0,
            reorderLevel ?? 0,
            id,
        ]
    );

    return result.rows[0];
};

export const deactivateProduct = async (id) => {
    const result = await pool.query(
        `
        UPDATE products
        SET
            is_active = FALSE,
            updated_at = NOW()
        WHERE id = $1
        RETURNING id, name, sku, is_active
        `,
        [id]
    );

    return result.rows[0];
};