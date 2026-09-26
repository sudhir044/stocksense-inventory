import express from "express";

import {
    createTransfer,
    getTransfers,
    getTransfer,
    validateTransfer,
} from "./transfer.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getTransfers);

router.get("/:id", getTransfer);

router.post(
    "/",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    createTransfer
);

router.post(
    "/:id/validate",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    validateTransfer
);

export default router;