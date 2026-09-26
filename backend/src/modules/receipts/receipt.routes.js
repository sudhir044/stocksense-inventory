import express from "express";

import {
    createReceipt,
    getReceipts,
    getReceipt,
    validateReceipt,
} from "./receipt.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getReceipts);

router.get("/:id", getReceipt);

router.post(
    "/",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    createReceipt
);

router.post(
    "/:id/validate",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    validateReceipt
);

export default router;