import { pool } from "../../config/database.js";

export const increaseStock = async ({
    productId,
    locationId,
    quantity,
    movementType,
    referenceType,
    referenceId,
    performedBy,
    notes,
    client = pool,
}) => {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    await client.query(
        `
        INSERT INTO stock (
            product_id,
            location_id,
            quantity
        )
        VALUES ($1, $2, $3)

        ON CONFLICT (product_id, location_id)

        DO UPDATE SET
            quantity = stock.quantity + EXCLUDED.quantity,
            updated_at = NOW()
        `,
        [
            productId,
            locationId,
            quantity,
        ]
    );

    await client.query(
        `
        INSERT INTO stock_ledger (
            product_id,
            location_id,
            movement_type,
            quantity_change,
            reference_type,
            reference_id,
            performed_by,
            notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
            productId,
            locationId,
            movementType,
            quantity,
            referenceType,
            referenceId,
            performedBy,
            notes || null,
        ]
    );
};

export const decreaseStock = async ({
    productId,
    locationId,
    quantity,
    movementType,
    referenceType,
    referenceId,
    performedBy,
    notes,
    client = pool,
}) => {
    if (quantity <= 0) {
        throw new Error("Quantity must be greater than zero");
    }

    const result = await client.query(
        `
        UPDATE stock
        SET
            quantity = quantity - $1,
            updated_at = NOW()
        WHERE
            product_id = $2
            AND location_id = $3
            AND quantity - reserved_quantity >= $1
        RETURNING *
        `,
        [
            quantity,
            productId,
            locationId,
        ]
    );

    if (result.rowCount === 0) {
        throw new Error(
            "Insufficient available stock"
        );
    }

    await client.query(
        `
        INSERT INTO stock_ledger (
            product_id,
            location_id,
            movement_type,
            quantity_change,
            reference_type,
            reference_id,
            performed_by,
            notes
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `,
        [
            productId,
            locationId,
            movementType,
            -quantity,
            referenceType,
            referenceId,
            performedBy,
            notes || null,
        ]
    );
};