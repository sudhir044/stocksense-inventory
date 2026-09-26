import { pool } from "../../config/database.js";

import {
    createTransfer,
    addTransferItem,
    findTransferById,
    findAllTransfers,
    getTransferItemsForUpdate,
    markTransferDone,
} from "./transfer.repository.js";

import {
    increaseStock,
    decreaseStock,
} from "../stock/stock.service.js";

export const createTransferService = async ({
    reference,
    sourceLocationId,
    destinationLocationId,
    scheduledDate,
    items,
    createdBy,
}) => {
    if (sourceLocationId === destinationLocationId) {
        throw new Error(
            "Source and destination locations must be different"
        );
    }

    if (!items || items.length === 0) {
        throw new Error(
            "Transfer must contain at least one product"
        );
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const transfer = await createTransfer({
            reference,
            sourceLocationId,
            destinationLocationId,
            scheduledDate,
            createdBy,
        });

        for (const item of items) {
            await addTransferItem({
                transferId: transfer.id,
                productId: item.productId,
                quantity: item.quantity,
            });
        }

        await client.query("COMMIT");

        return findTransferById(transfer.id);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getTransfersService = async () => {
    return findAllTransfers();
};

export const getTransferService = async (id) => {
    const transfer = await findTransferById(id);

    if (!transfer) {
        throw new Error("Transfer not found");
    }

    return transfer;
};

export const validateTransferService = async (
    transferId,
    validatedBy
) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const transfer =
            await findTransferById(transferId);

        if (!transfer) {
            throw new Error("Transfer not found");
        }

        if (transfer.status === "done") {
            throw new Error(
                "Transfer has already been validated"
            );
        }

        if (transfer.status === "canceled") {
            throw new Error(
                "Canceled transfer cannot be validated"
            );
        }

        const items =
            await getTransferItemsForUpdate(
                client,
                transferId
            );

        if (items.length === 0) {
            throw new Error(
                "Cannot validate transfer without products"
            );
        }

        /*
         * First remove stock from source.
         *
         * If any item does not have enough stock,
         * decreaseStock throws an error and the
         * entire transaction is rolled back.
         */

        for (const item of items) {
            await decreaseStock({
                productId: item.product_id,

                locationId:
                    transfer.source_location_id,

                quantity: Number(item.quantity),

                movementType: "transfer_out",

                referenceType: "transfer",

                referenceId: transferId,

                performedBy: validatedBy,

                notes: `Transfer ${transfer.reference}`,

                client,
            });
        }

        /*
         * Then add stock to destination.
         */

        for (const item of items) {
            await increaseStock({
                productId: item.product_id,

                locationId:
                    transfer.destination_location_id,

                quantity: Number(item.quantity),

                movementType: "transfer_in",

                referenceType: "transfer",

                referenceId: transferId,

                performedBy: validatedBy,

                notes: `Transfer ${transfer.reference}`,

                client,
            });
        }

        const updatedTransfer =
            await markTransferDone(
                client,
                transferId,
                validatedBy
            );

        if (!updatedTransfer) {
            throw new Error(
                "Transfer could not be validated"
            );
        }

        await client.query("COMMIT");

        return findTransferById(transferId);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};