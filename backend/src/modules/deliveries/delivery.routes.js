import express from "express";

import {
    createDelivery,
    getDeliveries,
    getDelivery,
    validateDelivery,
} from "./delivery.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";

import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.use(authenticate);

router.get("/", getDeliveries);

router.get("/:id", getDelivery);

router.post(
    "/",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    createDelivery
);

router.post(
    "/:id/validate",
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    validateDelivery
);

export default router;