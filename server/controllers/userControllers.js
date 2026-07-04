import User from '../models/user.js';
import Organization from '../models/organization.js'
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";
import { nanoid } from 'nanoid';

/* CREATE SUPER ADMIN ------------------------------------ */
export const createSuperAdmin = async (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
        // Validate required fields
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        // Check if a super admin already exists
        const superAdminExists = await User.exists({
            role: "super_admin",
        });

        if (superAdminExists) {
            return res.status(403).json({
                success: false,
                message: "Initial system setup has already been completed.",
            });
        }

        // Check if email is already in use
        const userExists = await User.exists({ email });

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        // Create super admin
        const superAdmin = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            role: "super_admin",
        });

        res.status(201).json({
            success: true,
            message: "Super admin created successfully.",
            data: {
                id: superAdmin._id,
                firstName: superAdmin.firstName,
                lastName: superAdmin.lastName,
                email: superAdmin.email,
                phone: superAdmin.phone,
                role: superAdmin.role,
                createdAt: superAdmin.createdAt,
            },
        });
    } catch (error) {
        next(error);
    }
};

/* CREATE ADMIN ------------------------------------ */
export const createAdmin = async (req, res, next) => {
    try {
        const { firstName, lastName, email, password } = req.body;

        const organization = req.organization;

        /* ---------- Validate Input ---------- */
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all admin details."
            });
        }

        /* ---------- Check Email Verification ---------- */
        if (!organization.isVerified) {
            return res.status(403).json({
                success: false,
                message: "Organization email has not been verified."
            });
        }

        /* ---------- Check Existing Admin ---------- */
        const existingAdmin = await User.findOne({
            organization: organization._id,
            role: "admin"
        });

        if (existingAdmin) {
            return res.status(409).json({
                success: false,
                message: "This organization already has an administrator."
            });
        }

        /* ---------- Check Email ---------- */
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({
                success: false,
                message: "Email already exists."
            });
        }

        /* ---------- Hash Password ---------- */
        const hashedPassword = await bcrypt.hash(password, 10);

        /* ---------- Create Admin ---------- */
        await User.create({
            firstName,
            lastName,
            email,
            password: hashedPassword,
            role: "admin",
            organization: organization._id
        });

        res.status(201).json({
            success: true,
            message: "Admin account created successfully."
        });

    } catch (error) {
        next(error);
    }
};


/* CREATE CLIENT ------------------------------------ */
export const createClient = async (req, res, next) => {
    const { firstName, lastName, email, phone } = req.body;
    try{
        if (!firstName || !lastName || !email) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        const userExist = await User.findOne({ email })

        if(userExist){
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        //find the organization using the slug
        const organization = await Organization.findOne({ slug: req.user.organization });

        const client = await User.create({
            firstName,
            lastName,
            phone,
            email,
            role: "client",
            organization: organization._id,
        });

        return res.status(201).json({
            success: true,
            message: "Client created successfully.",
            data: {
                id: client._id,
                firstName: client.firstName,
                lastName: client.lastName,
                email: client.email,
                phone: client.phone,
                role: client.role,
                organization: client.organization,
                createdAt: client.createdAt,
            },
        });

    }catch(error){
        next(error)
    }
}