import {
    createReceiptService,
    getReceiptsService,
    getReceiptService,
    validateReceiptService,
} from "./receipt.service.js";

export const createReceipt = async (req, res) => {
    try {
        const receipt = await createReceiptService({
            ...req.body,
            createdBy: req.user.id,
        });

        res.status(201).json({
            success: true,
            message: "Receipt created successfully",
            data: receipt,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getReceipts = async (req, res) => {
    try {
        const receipts = await getReceiptsService();

        res.status(200).json({
            success: true,
            data: receipts,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getReceipt = async (req, res) => {
    try {
        const receipt = await getReceiptService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            data: receipt,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const validateReceipt = async (req, res) => {
    try {
        const receipt =
            await validateReceiptService(
                req.params.id,
                req.user.id
            );

        res.status(200).json({
            success: true,
            message: "Receipt validated successfully",
            data: receipt,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};