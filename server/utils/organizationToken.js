import jwt from 'jsonwebtoken'

import jwt from "jsonwebtoken";

export const organizationToken = (organizationId, res) => {
    const token = jwt.sign(
        { id: organizationId },
        process.env.JWT_SECRET_KEY,
        {
            expiresIn: "15m",
        }
    );

    res.cookie("organizationToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 15 * 60 * 1000, // 15 minutes
    });

};