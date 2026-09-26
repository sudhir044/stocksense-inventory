import {
    createProduct,
    findAllProducts,
    findProductById,
    findProductBySku,
    updateProduct,
    deactivateProduct,
} from "./product.repository.js";

export const createProductService = async (data) => {
    const existingProduct = await findProductBySku(data.sku);

    if (existingProduct) {
        throw new Error("Product with this SKU already exists");
    }

    return createProduct(data);
};

export const getProductsService = async () => {
    return findAllProducts();
};

export const getProductService = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return product;
};

export const updateProductService = async (id, data) => {
    const product = await findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    if (data.sku && data.sku !== product.sku) {
        const existingProduct = await findProductBySku(data.sku);
        if (existingProduct && existingProduct.id !== id) {
            throw new Error("Product with this SKU already exists");
        }
    }

    return updateProduct(id, {
        name: data.name !== undefined ? data.name : product.name,
        sku: data.sku !== undefined ? data.sku : product.sku,
        categoryId: data.categoryId !== undefined ? data.categoryId : product.category_id,
        unit: data.unit !== undefined ? data.unit : product.unit,
        description: data.description !== undefined ? data.description : product.description,
        costPrice: data.costPrice !== undefined ? data.costPrice : product.cost_price,
        reorderLevel: data.reorderLevel !== undefined ? data.reorderLevel : product.reorder_level,
    });
};

export const deactivateProductService = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return deactivateProduct(id);
};