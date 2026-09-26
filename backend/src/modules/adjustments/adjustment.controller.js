import {
    createAdjustmentService,
    getAdjustmentsService,
    getAdjustmentService,
    validateAdjustmentService,
} from "./adjustment.service.js";

export const createAdjustment = async (
    req,
    res
) => {
    try {
        const adjustment =
            await createAdjustmentService({
                ...req.body,
                createdBy: req.user.id,
            });

        res.status(201).json({
            success: true,
            message:
                "Adjustment created successfully",
            data: adjustment,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdjustments = async (
    req,
    res
) => {
    try {
        const adjustments =
            await getAdjustmentsService();

        res.status(200).json({
            success: true,
            data: adjustments,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getAdjustment = async (
    req,
    res
) => {
    try {
        const adjustment =
            await getAdjustmentService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: adjustment,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const validateAdjustment = async (
    req,
    res
) => {
    try {
        const adjustment =
            await validateAdjustmentService(
                req.params.id,
                req.user.id
            );

        res.status(200).json({
            success: true,
            message:
                "Adjustment validated successfully",
            data: adjustment,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};