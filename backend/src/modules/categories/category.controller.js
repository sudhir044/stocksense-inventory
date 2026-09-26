import {
    createCategoryService,
    getCategoriesService,
    getCategoryService,
    updateCategoryService,
    deactivateCategoryService,
} from "./category.service.js";

export const createCategory = async (req, res) => {
    try {
        const category = await createCategoryService(req.body);

        res.status(201).json({
            success: true,
            message: "Category created successfully",
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCategories = async (req, res) => {
    try {
        const categories = await getCategoriesService();

        res.json({
            success: true,
            data: categories,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};

export const getCategory = async (req, res) => {
    try {
        const category = await getCategoryService(req.params.id);

        res.json({
            success: true,
            data: category,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const updateCategory = async (req, res) => {
    try {
        const category = await updateCategoryService(
            req.params.id,
            req.body
        );

        res.json({
            success: true,
            message: "Category updated successfully",
            data: category,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const deactivateCategory = async (req, res) => {
    try {
        const category = await deactivateCategoryService(
            req.params.id
        );

        res.json({
            success: true,
            message: "Category deactivated successfully",
            data: category,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};