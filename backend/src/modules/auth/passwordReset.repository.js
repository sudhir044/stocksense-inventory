import { pool } from "../../config/database.js";


export const createPasswordResetToken = async ({
    userId,
    otpHash,
    expiresAt,
}) => {
    const result = await pool.query(
        `
        INSERT INTO password_reset_tokens
        (user_id, otp_hash, expires_at)
        VALUES ($1, $2, $3)
        RETURNING id, user_id, expires_at, created_at
        `,
        [userId, otpHash, expiresAt]
    );

    return result.rows[0];
};


export const findLatestValidResetToken = async (userId) => {
    const result = await pool.query(
        `
        SELECT *
        FROM password_reset_tokens
        WHERE user_id = $1
          AND used = FALSE
          AND expires_at > NOW()
        ORDER BY created_at DESC
        LIMIT 1
        `,
        [userId]
    );

    return result.rows[0];
};


export const incrementOtpAttempts = async (id) => {
    await pool.query(
        `
        UPDATE password_reset_tokens
        SET attempts = attempts + 1
        WHERE id = $1
        `,
        [id]
    );
};


export const markResetTokenUsed = async (id) => {
    await pool.query(
        `
        UPDATE password_reset_tokens
        SET used = TRUE
        WHERE id = $1
        `,
        [id]
    );
};


export const invalidatePreviousTokens = async (userId) => {
    await pool.query(
        `
        UPDATE password_reset_tokens
        SET used = TRUE
        WHERE user_id = $1
          AND used = FALSE
        `,
        [userId]
    );
};