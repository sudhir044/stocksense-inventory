import {
    createCategory,
    findAllCategories,
    findCategoryById,
    updateCategory,
    deactivateCategory,
} from "./category.repository.js";

export const createCategoryService = async (data) => {
    return createCategory(data);
};

export const getCategoriesService = async () => {
    return findAllCategories();
};

export const getCategoryService = async (id) => {
    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return category;
};

export const updateCategoryService = async (id, data) => {
    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return updateCategory(id, data);
};

export const deactivateCategoryService = async (id) => {
    const category = await findCategoryById(id);

    if (!category) {
        throw new Error("Category not found");
    }

    return deactivateCategory(id);
};