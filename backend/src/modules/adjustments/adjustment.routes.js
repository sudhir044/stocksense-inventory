import express from "express";

import {
    createAdjustment,
    getAdjustments,
    getAdjustment,
    validateAdjustment,
} from "./adjustment.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getAdjustments);

router.get("/:id", getAdjustment);

router.post(
    "/",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    createAdjustment
);

router.post(
    "/:id/validate",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    validateAdjustment
);

export default router;