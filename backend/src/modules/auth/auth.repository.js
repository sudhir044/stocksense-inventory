import { pool } from "../../config/database.js";

export const findUserByEmail = async (email) => {
    const result = await pool.query(
        `
        SELECT id, name, email, password_hash, role, is_active
        FROM users
        WHERE email = $1
        `,
        [email]
    );

    return result.rows[0];
};

export const findUserById = async (id) => {
    const result = await pool.query(
        `
        SELECT id, name, email, role, is_active, created_at
        FROM users
        WHERE id = $1
        `,
        [id]
    );

    return result.rows[0];
};

export const createUser = async ({
    name,
    email,
    passwordHash,
    role,
}) => {
    const result = await pool.query(
        `
        INSERT INTO users (
            name,
            email,
            password_hash,
            role
        )
        VALUES ($1, $2, $3, $4)
        RETURNING id, name, email, role, is_active, created_at
        `,
        [name, email, passwordHash, role]
    );

    return result.rows[0];
};