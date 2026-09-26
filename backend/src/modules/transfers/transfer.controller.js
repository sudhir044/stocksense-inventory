import {
    createTransferService,
    getTransfersService,
    getTransferService,
    validateTransferService,
} from "./transfer.service.js";

export const createTransfer = async (req, res) => {
    try {
        const transfer =
            await createTransferService({
                ...req.body,
                createdBy: req.user.id,
            });

        res.status(201).json({
            success: true,
            message: "Transfer created successfully",
            data: transfer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTransfers = async (req, res) => {
    try {
        const transfers =
            await getTransfersService();

        res.status(200).json({
            success: true,
            data: transfers,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getTransfer = async (req, res) => {
    try {
        const transfer =
            await getTransferService(
                req.params.id
            );

        res.status(200).json({
            success: true,
            data: transfer,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const validateTransfer = async (
    req,
    res
) => {
    try {
        const transfer =
            await validateTransferService(
                req.params.id,
                req.user.id
            );

        res.status(200).json({
            success: true,
            message: "Transfer validated successfully",
            data: transfer,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};
