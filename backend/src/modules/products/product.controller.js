import {
    createProductService,
    getProductsService,
    getProductService,
    updateProductService,
    deactivateProductService,
} from "./product.service.js";

export const createProduct = async (req, res) => {
    try {
        const product = await createProductService(req.body);

        res.status(201).json({
            success: true,
            message: "Product created successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProducts = async (req, res) => {
    try {
        const products = await getProductsService();

        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const product = await getProductService(req.params.id);

        res.status(200).json({
            success: true,
            data: product,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateProduct = async (req, res) => {
    try {
        const product = await updateProductService(
            req.params.id,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            data: product,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deactivateProduct = async (req, res) => {
    try {
        const product = await deactivateProductService(
            req.params.id
        );

        res.status(200).json({
            success: true,
            message: "Product deactivated successfully",
            data: product,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};