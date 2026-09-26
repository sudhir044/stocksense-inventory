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

    return updateProduct(id, data);
};

export const deactivateProductService = async (id) => {
    const product = await findProductById(id);

    if (!product) {
        throw new Error("Product not found");
    }

    return deactivateProduct(id);
};