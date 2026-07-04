import User from '../models/user.js'
import bcrypt from 'bcryptjs'

import { generateToken } from '../utils/generateToken.js'

/* Login User ------------------------------------ */
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    try {
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide your email and password."
            });
        }

        const normalizedEmail = email.trim().toLowerCase();

        const user = await User.findOne({ email: normalizedEmail })
            .select("+password")
            .populate("organization");

        if (!user) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid email or password."
            });
        }

        user.lastLogin = new Date();
        await user.save();

        generateToken(user._id, res);

        const { password: _, ...safeUser } = user.toObject();

        res.status(200).json({
            success: true,
            message: "Logged in successfully.",
            user: safeUser
        });

    } catch (error) {
        next(error);
    }
};

/* Logout User ------------------------------------ */
export const logoutUser = async (req, res, next) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
        });

        return res.status(200).json({
            success: true,
            message: "Logged out successfully."
        });
    } catch (error) {
        next(error);
    }
};

/* Get Profile ------------------------------------ */
export const getProfile = async (req, res, next) => {
    try {
        return res.status(200).json({
            success: true,
            message: "Profile fetched successfully.",
            user: req.user,
        });
    } catch (error) {
        next(error);
    }
};