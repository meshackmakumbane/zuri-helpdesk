import crypto from "crypto";
import User from "../models/user.js";
import bcrypt from "bcryptjs";

import { sendConsultantInviteEmail } from "../email/sendEmails.js";

/* CREATE CONSULTANT ------------------------------------ */
export const inviteConsultant = async (req, res, next) => {
    try {
        const { firstName, lastName, email } = req.body;

        if (!firstName || !lastName || !email ) {
            return res.status(400).json({
                success: false,
                message: "Please provide an email."
            });
        }

        const existingUser = await User.findOne({
            email: email.toLowerCase()
        });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "A user with this email already exists."
            });
        }

        const token = crypto.randomBytes(32).toString("hex");

        const consultant = await User.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            role: "consultant",
            organization: req.admin.organization._id,
            inviteToken: token,
            inviteTokenExpires: Date.now() + 1000 * 60 * 60 * 24,
            inviteAccepted: false
        });

        const inviteLink = `${process.env.CLIENT_URL}/create-account?token=${token}`;

        try {
            await sendConsultantInviteEmail(req.admin.organization.name, inviteLink, email);
        } catch (error) {
            await User.findByIdAndDelete(consultant._id);
            throw error;
        }

        res.status(200).json({
            success: true,
            message: "Invitation sent successfully."
        });

    } catch (error) {
        next(error);
    }
};

/* CONSULTANT (CREATES PASSWORD) ------------------------------------ */
export const consultantPassword = async (req, res, next) => {
    try {
        const { password } = req.body;
        const { token } = req.params;

        if (!password) {
            return res.status(400).json({
                success: false,
                message: "Password is required."
            });
        }

        const consultant = await User.findOne({
            inviteToken: token,
            inviteTokenExpires: { $gt: Date.now() }
        });

        if (!consultant) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired invitation link."
            });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        consultant.password = hashedPassword;
        consultant.inviteToken = null;
        consultant.inviteTokenExpires = null;
        consultant.inviteAccepted = true;
        consultant.isActive = true;

        await consultant.save();

        res.status(200).json({
            success: true,
            message: "Account created successfully. You can now log in."
        });

    } catch (error) {
        next(error);
    }
};