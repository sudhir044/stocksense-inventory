import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import {
    createUser,
    findUserByEmail,
    findUserById,
    updateUserPassword,
} from "./auth.repository.js";

import {
    createPasswordResetToken,
    findLatestValidResetToken,
    incrementOtpAttempts,
    markResetTokenUsed,
    invalidatePreviousTokens,
} from "./passwordReset.repository.js";

import { generateOTP } from "../../utils/otp.js";

const generateToken = (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.role,
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export const registerUser = async ({
    name,
    email,
    password,
    role = "inventory_manager",
}) => {
    const existingUser = await findUserByEmail(email);

    if (existingUser) {
        throw new Error("User with this email already exists");
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await createUser({
        name,
        email,
        passwordHash,
        role,
    });

    const token = generateToken(user);

    return {
        user,
        token,
    };
};

export const loginUser = async ({ email, password }) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid email or password");
    }

    if (!user.is_active) {
        throw new Error("User account is inactive");
    }

    const isPasswordValid = await bcrypt.compare(
        password,
        user.password_hash
    );

    if (!isPasswordValid) {
        throw new Error("Invalid email or password");
    }

    const token = generateToken(user);

    return {
        user: {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role,
            is_active: user.is_active,
        },
        token,
    };
};

export const getCurrentUser = async (userId) => {
    const user = await findUserById(userId);

    if (!user) {
        throw new Error("User not found");
    }

    return user;
};

export const requestPasswordReset = async (email) => {
    const user = await findUserByEmail(email);


    if (!user) {
        return {
            message: "If the email exists, an OTP has been sent",
        };
    }

    await invalidatePreviousTokens(user.id);

    const otp = generateOTP();

    const otpHash = await bcrypt.hash(otp, 10);

    const expiresAt = new Date(
        Date.now() + 10 * 60 * 1000
    );

    await createPasswordResetToken({
        userId: user.id,
        otpHash,
        expiresAt,
    });


    console.log(`Password reset OTP for ${user.email}: ${otp}`);

    return {
        message: "If the email exists, an OTP has been sent",
    };
};

export const verifyPasswordResetOTP = async ({
    email,
    otp,
}) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid OTP");
    }

    const resetToken = await findLatestValidResetToken(user.id);

    if (!resetToken) {
        throw new Error("OTP expired or invalid");
    }

    if (resetToken.attempts >= 5) {
        throw new Error("Too many OTP attempts");
    }

    const isValid = await bcrypt.compare(
        otp,
        resetToken.otp_hash
    );

    if (!isValid) {
        await incrementOtpAttempts(resetToken.id);

        throw new Error("Invalid OTP");
    }

    return {
        message: "OTP verified successfully",
    };
};

export const resetPassword = async ({
    email,
    otp,
    newPassword,
}) => {
    const user = await findUserByEmail(email);

    if (!user) {
        throw new Error("Invalid OTP");
    }

    const resetToken = await findLatestValidResetToken(user.id);

    if (!resetToken) {
        throw new Error("OTP expired or invalid");
    }

    if (resetToken.attempts >= 5) {
        throw new Error("Too many OTP attempts");
    }

    const isValid = await bcrypt.compare(
        otp,
        resetToken.otp_hash
    );

    if (!isValid) {
        await incrementOtpAttempts(resetToken.id);

        throw new Error("Invalid OTP");
    }

    if (newPassword.length < 8) {
        throw new Error(
            "Password must be at least 8 characters"
        );
    }

    const passwordHash = await bcrypt.hash(
        newPassword,
        12
    );

    await updateUserPassword(
        user.id,
        passwordHash
    );

    await markResetTokenUsed(
        resetToken.id
    );

    return {
        message: "Password reset successfully",
    };
};