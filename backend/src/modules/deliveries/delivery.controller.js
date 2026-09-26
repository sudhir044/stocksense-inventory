import {
    createDeliveryService,
    getDeliveriesService,
    getDeliveryService,
    validateDeliveryService,
} from "./delivery.service.js";

export const createDelivery = async (req, res) => {
    try {
        const delivery =
            await createDeliveryService({
                ...req.body,
                createdBy: req.user.id,
            });

        res.status(201).json({
            success: true,
            message: "Delivery created successfully",
            data: delivery,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDeliveries = async (req, res) => {
    try {
        const deliveries =
            await getDeliveriesService();

        res.status(200).json({
            success: true,
            data: deliveries,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getDelivery = async (req, res) => {
    try {
        const delivery =
            await getDeliveryService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: delivery,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const validateDelivery = async (
    req,
    res
) => {
    try {
        const delivery =
            await validateDeliveryService(
                req.params.id,
                req.user.id
            );

        res.status(200).json({
            success: true,
            message: "Delivery validated successfully",
            data: delivery,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};