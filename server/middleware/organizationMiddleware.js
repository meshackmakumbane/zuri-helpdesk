import jwt from 'jsonwebtoken';
import Organization from '../models/organization.js';

export const organizationMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.organizationToken;

        if (!token) {
            return res.status(401).json({
                success: false,
                message: "Authentication required."
            });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

        const organization = await Organization.findById(decoded.id);

        if (!organization) {
            return res.status(404).json({
                success: false,
                message: "Organization not found."
            });
        }

        req.organization = organization;

        next();
    } catch (error) {
        next(error);
    }
};