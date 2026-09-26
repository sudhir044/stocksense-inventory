import express from "express";

import {
    register,
    login,
    me,
} from "./auth.controller.js";

import { authenticate } from "../../middleware/auth.middleware.js";
import { authorizeRoles } from "../../middleware/role.middleware.js";

const router = express.Router();

router.post("/register", register);

router.post("/login", login);

router.get(
    "/me",
    authenticate,
    authorizeRoles(
        "admin",
        "inventory_manager",
        "warehouse_staff"
    ),
    me
);

export default router;