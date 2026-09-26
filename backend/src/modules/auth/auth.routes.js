import express from "express";

import {
    register,
    login,
    me,
    forgotPassword,
    verifyOTP,
    resetPasswordController,
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

router.post(
    "/forgot-password",
    forgotPassword
);

router.post(
    "/verify-otp",
    verifyOTP
);

router.post(
    "/reset-password",
    resetPasswordController
);

export default router;