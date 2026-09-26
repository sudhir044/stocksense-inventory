import express from "express";

import {
    createCategory,
    getCategories,
    getCategory,
    updateCategory,
    deactivateCategory,
} from "./category.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getCategories);
router.get("/:id", getCategory);

router.post(
    "/",
    authorizeRoles("admin", "inventory_manager"),
    createCategory
);

router.put(
    "/:id",
    authorizeRoles("admin", "inventory_manager"),
    updateCategory
);

router.delete(
    "/:id",
    authorizeRoles("admin", "inventory_manager"),
    deactivateCategory
);

export default router;