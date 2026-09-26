import { pool } from "../../config/database.js";

import {
    createAdjustment,
    addAdjustmentItem,
    findAdjustmentById,
    findAllAdjustments,
    markAdjustmentDone,
} from "./adjustment.repository.js";

export const createAdjustmentService = async ({
    reference,
    locationId,
    reason,
    items,
    createdBy,
}) => {
    if (!items || items.length === 0) {
        throw new Error(
            "Adjustment must contain at least one product"
        );
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const adjustment = await createAdjustment({
            reference,
            locationId,
            reason,
            createdBy,
        });

        for (const item of items) {
            const stockResult = await client.query(
                `
                SELECT quantity
                FROM stock
                WHERE product_id = $1
                  AND location_id = $2
                FOR UPDATE
                `,
                [
                    item.productId,
                    locationId,
                ]
            );

            const systemQuantity =
                stockResult.rows[0]
                    ? Number(
                        stockResult.rows[0].quantity
                    )
                    : 0;

            await addAdjustmentItem({
                adjustmentId: adjustment.id,
                productId: item.productId,
                systemQuantity,
                countedQuantity:
                    Number(item.countedQuantity),
            });
        }

        await client.query("COMMIT");

        return findAdjustmentById(adjustment.id);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getAdjustmentsService = async () => {
    return findAllAdjustments();
};

export const getAdjustmentService = async (id) => {
    const adjustment =
        await findAdjustmentById(id);

    if (!adjustment) {
        throw new Error("Adjustment not found");
    }

    return adjustment;
};

export const validateAdjustmentService = async (
    adjustmentId,
    validatedBy
) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const adjustment =
            await findAdjustmentById(
                adjustmentId
            );

        if (!adjustment) {
            throw new Error(
                "Adjustment not found"
            );
        }

        if (adjustment.status === "done") {
            throw new Error(
                "Adjustment has already been validated"
            );
        }

        if (adjustment.status === "canceled") {
            throw new Error(
                "Canceled adjustment cannot be validated"
            );
        }

        if (adjustment.items.length === 0) {
            throw new Error(
                "Adjustment has no products"
            );
        }

        for (const item of adjustment.items) {
            const currentStock =
                await client.query(
                    `
                    SELECT quantity
                    FROM stock
                    WHERE product_id = $1
                      AND location_id = $2
                    FOR UPDATE
                    `,
                    [
                        item.product_id,
                        adjustment.location_id,
                    ]
                );

            const currentQuantity =
                currentStock.rows[0]
                    ? Number(
                        currentStock.rows[0]
                            .quantity
                    )
                    : 0;

            const countedQuantity =
                Number(item.counted_quantity);

            const difference =
                countedQuantity -
                currentQuantity;

            if (difference === 0) {
                continue;
            }

            if (currentStock.rows.length === 0) {
                if (difference < 0) {
                    throw new Error(
                        "Invalid negative stock adjustment"
                    );
                }

                await client.query(
                    `
                    INSERT INTO stock (
                        product_id,
                        location_id,
                        quantity
                    )
                    VALUES ($1, $2, $3)
                    `,
                    [
                        item.product_id,
                        adjustment.location_id,
                        countedQuantity,
                    ]
                );
            } else {
                await client.query(
                    `
                    UPDATE stock
                    SET
                        quantity = $1,
                        updated_at = NOW()
                    WHERE product_id = $2
                      AND location_id = $3
                    `,
                    [
                        countedQuantity,
                        item.product_id,
                        adjustment.location_id,
                    ]
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
                VALUES (
                    $1,
                    $2,
                    'adjustment',
                    $3,
                    'adjustment',
                    $4,
                    $5,
                    $6
                )
                `,
                [
                    item.product_id,
                    adjustment.location_id,
                    difference,
                    adjustmentId,
                    validatedBy,
                    `Adjustment ${adjustment.reference}`,
                ]
            );
        }

        const updatedAdjustment =
            await markAdjustmentDone(
                client,
                adjustmentId,
                validatedBy
            );

        if (!updatedAdjustment) {
            throw new Error(
                "Adjustment could not be validated"
            );
        }

        await client.query("COMMIT");

        return findAdjustmentById(
            adjustmentId
        );
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};