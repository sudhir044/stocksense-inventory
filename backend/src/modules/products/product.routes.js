import express from "express";

import {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deactivateProduct,
} from "./product.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getProducts);

router.get("/:id", getProduct);

router.post(
    "/",
    authorizeRoles("admin", "inventory_manager"),
    createProduct
);

router.put(
    "/:id",
    authorizeRoles("admin", "inventory_manager"),
    updateProduct
);

router.delete(
    "/:id",
    authorizeRoles("admin", "inventory_manager"),
    deactivateProduct
);

export default router;