import { pool } from "../../config/database.js";

export const createCategory = async ({ name, description }) => {
    const result = await pool.query(
        `
        INSERT INTO categories (name, description)
        VALUES ($1, $2)
        RETURNING *
        `,
        [name, description || null]
    );

    return result.rows[0];
};

export const findAllCategories = async () => {
    const result = await pool.query(
        `
        SELECT *
        FROM categories
        WHERE is_active = TRUE
        ORDER BY name ASC
        `
    );

    return result.rows;
};

export const findCategoryById = async (id) => {
    const result = await pool.query(
        `
        SELECT *
        FROM categories
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const updateCategory = async (id, { name, description }) => {
    const result = await pool.query(
        `
        UPDATE categories
        SET
            name = $1,
            description = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
        [name, description || null, id]
    );

    return result.rows[0];
};

export const deactivateCategory = async (id) => {
    const result = await pool.query(
        `
        UPDATE categories
        SET
            is_active = FALSE,
            updated_at = NOW()
        WHERE id = $1
        RETURNING *
        `,
        [id]
    );

    return result.rows[0];
};