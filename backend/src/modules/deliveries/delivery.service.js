import { pool } from "../../config/database.js";

import {
    createDelivery,
    addDeliveryItem,
    findDeliveryById,
    findAllDeliveries,
    getDeliveryItemsForUpdate,
    markDeliveryDone,
} from "./delivery.repository.js";

import {
    decreaseStock,
} from "../stock/stock.service.js";

export const createDeliveryService = async ({
    reference,
    customerName,
    sourceLocationId,
    scheduledDate,
    items,
    createdBy,
}) => {
    if (!items || items.length === 0) {
        throw new Error(
            "Delivery must contain at least one product"
        );
    }

    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const delivery = await createDelivery({
            reference,
            customerName,
            sourceLocationId,
            scheduledDate,
            createdBy,
        });

        for (const item of items) {
            await addDeliveryItem({
                deliveryId: delivery.id,
                productId: item.productId,
                quantity: item.quantity,
            });
        }

        await client.query("COMMIT");

        return findDeliveryById(delivery.id);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};

export const getDeliveriesService = async () => {
    return findAllDeliveries();
};

export const getDeliveryService = async (id) => {
    const delivery = await findDeliveryById(id);

    if (!delivery) {
        throw new Error("Delivery not found");
    }

    return delivery;
};

export const validateDeliveryService = async (
    deliveryId,
    validatedBy
) => {
    const client = await pool.connect();

    try {
        await client.query("BEGIN");

        const delivery = await findDeliveryById(
            deliveryId
        );

        if (!delivery) {
            throw new Error("Delivery not found");
        }

        if (delivery.status === "done") {
            throw new Error(
                "Delivery has already been validated"
            );
        }

        if (delivery.status === "canceled") {
            throw new Error(
                "Canceled delivery cannot be validated"
            );
        }

        const items =
            await getDeliveryItemsForUpdate(
                client,
                deliveryId
            );

        if (items.length === 0) {
            throw new Error(
                "Cannot validate delivery without products"
            );
        }

        for (const item of items) {
            await decreaseStock({
                productId: item.product_id,

                locationId:
                    delivery.source_location_id,

                quantity: Number(item.quantity),

                movementType: "delivery",

                referenceType: "delivery",

                referenceId: deliveryId,

                performedBy: validatedBy,

                notes: `Delivery ${delivery.reference}`,

                client,
            });
        }

        const updatedDelivery =
            await markDeliveryDone(
                client,
                deliveryId,
                validatedBy
            );

        if (!updatedDelivery) {
            throw new Error(
                "Delivery could not be validated"
            );
        }

        await client.query("COMMIT");

        return findDeliveryById(deliveryId);
    } catch (error) {
        await client.query("ROLLBACK");
        throw error;
    } finally {
        client.release();
    }
};