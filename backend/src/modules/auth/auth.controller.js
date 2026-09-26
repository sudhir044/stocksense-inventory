import {
    registerUser,
    loginUser,
    getCurrentUser,
} from "./auth.service.js";
import {
    requestPasswordReset,
    verifyPasswordResetOTP,
    resetPassword,
} from "./auth.service.js";

export const register = async (req, res) => {
    try {
        const result = await registerUser(req.body);

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            data: result,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const login = async (req, res) => {
    try {
        const result = await loginUser(req.body);

        res.status(200).json({
            success: true,
            message: "Login successful",
            data: result,
        });
    } catch (error) {
        res.status(401).json({
            success: false,
            message: error.message,
        });
    }
};

export const me = async (req, res) => {
    try {
        const user = await getCurrentUser(req.user.id);

        res.status(200).json({
            success: true,
            data: user,
        });
    } catch (error) {
        res.status(404).json({
            success: false,
            message: error.message,
        });
    }
};

export const forgotPassword = async (req, res) => {
    try {
        const { email } = req.body;

        if (!email) {
            return res.status(400).json({
                success: false,
                message: "Email is required",
            });
        }

        const result = await requestPasswordReset(
            email.toLowerCase().trim()
        );

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        console.error(
            "Forgot password error:",
            error
        );

        res.status(500).json({
            success: false,
            message: "Failed to process password reset",
        });
    }
};

export const verifyOTP = async (req, res) => {
    try {
        const { email, otp } = req.body;

        const result = await verifyPasswordResetOTP({
            email: email.toLowerCase().trim(),
            otp,
        });

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};

export const resetPasswordController = async (req, res) => {
    try {
        const {
            email,
            otp,
            newPassword,
        } = req.body;

        const result = await resetPassword({
            email: email.toLowerCase().trim(),
            otp,
            newPassword,
        });

        res.status(200).json({
            success: true,
            ...result,
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
};