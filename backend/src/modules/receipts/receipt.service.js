import { pool } from "../../config/database.js";

import {
    createReceipt,
    addReceiptItem,
    findReceiptById,
    findAllReceipts,
    getReceiptItemsForUpdate,
    markReceiptDone,
} from "./receipt.repository.js";

import {
    increaseStock,
} from "../stock/stock.service.js";

export const createReceiptService = async ({
    reference,
    supplierName,
    destinationLocationId,
    scheduledDate,
    items,
    createdBy,
}) => {
    if (!items || items.length === 0) {
        throw new Error(
            "Receipt must contain at least one product"
        );
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const receipt = await createReceipt({
            reference,
            supplierName,
            destinationLocationId,
            scheduledDate,
            createdBy,
        });

        for (const item of items) {
            await addReceiptItem({
                receiptId: receipt.id,
                productId: item.productId,
                quantity: item.quantity,
                unitCost: item.unitCost,
            });
        }

        await client.query("COMMIT");

        return findReceiptById(receipt.id);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getReceiptsService = async () => {
    return findAllReceipts();
};

export const getReceiptService = async (id) => {
    const receipt = await findReceiptById(id);

    if (!receipt) {
        throw new Error("Receipt not found");
    }

    return receipt;
};

export const validateReceiptService = async (
    receiptId,
    validatedBy
) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const receipt = await findReceiptById(receiptId);

        if (!receipt) {
            throw new Error("Receipt not found");
        }

        if (receipt.status === "done") {
            throw new Error(
                "Receipt has already been validated"
            );
        }

        if (receipt.status === "canceled") {
            throw new Error(
                "Canceled receipt cannot be validated"
            );
        }

        const items = await getReceiptItemsForUpdate(
            client,
            receiptId
        );

        if (items.length === 0) {
            throw new Error(
                "Cannot validate receipt without products"
            );
        }

        for (const item of items) {
            await increaseStock({
                productId: item.product_id,

                locationId:
                    receipt.destination_location_id,

                quantity: Number(item.quantity),

                movementType: "receipt",

                referenceType: "receipt",

                referenceId: receiptId,

                performedBy: validatedBy,

                notes: `Receipt ${receipt.reference}`,

                client,
            });
        }

        const updatedReceipt = await markReceiptDone(
            client,
            receiptId,
            validatedBy
        );

        if (!updatedReceipt) {
            throw new Error(
                "Receipt could not be validated"
            );
        }

        await client.query("COMMIT");

        return findReceiptById(receiptId);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};