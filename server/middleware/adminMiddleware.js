import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const adminMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const admin = await User.findById(decoded.id).populate("organization");

        if (!admin) {
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }

        if (admin.role !== "admin") {
            return res.status(403).json({
                success: false,
                message: "Access denied."
            });
        }

        req.admin = admin;

        next();

    } catch (error) {
        next(error);
    }
};