import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import mongoose from "mongoose";

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

/* CREATE ORGANIZATION & ADMIN ------------------------------------ */
export const createOrganizationAdmin = async (req, res, next) => {
    const session = await mongoose.startSession();

    try {
        session.startTransaction();

        const {
            organizationName,
            slug,
            firstName,
            lastName,
            email,
            password,
            phone,
        } = req.body;

        // Validate
        if (
            !organizationName ||
            !slug ||
            !firstName ||
            !lastName ||
            !email ||
            !password
        ) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        // Check organization
        const organizationExists = await Organization.findOne({
            $or: [
                { name: organizationName },
                { slug: slug.toLowerCase() },
            ],
        }).session(session);

        if (organizationExists) {
            await session.abortTransaction();
            session.endSession();

            return res.status(409).json({
                success: false,
                message: "Organization already exists.",
            });
        }

        // Check email
        const emailExists = await User.findOne({ email }).session(session);

        if (emailExists) {
            await session.abortTransaction();
            session.endSession();

            return res.status(409).json({
                success: false,
                message: "Email already exists.",
            });
        }

        // Create Organization
        const organization = await Organization.create(
            [
                {
                    name: organizationName,
                    slug: slug.toLowerCase(),
                },
            ],
            { session }
        );

        // Create Admin
        const admin = await User.create(
            [
                {
                    firstName,
                    lastName,
                    email,
                    password,
                    phone,
                    role: "admin",
                    organization: organization[0]._id,
                },
            ],
            { session }
        );

        await session.commitTransaction();
        session.endSession();

        return res.status(201).json({
            success: true,
            message: "Organization created successfully.",
            data: {
                organization: organization[0],
                admin: {
                    id: admin[0]._id,
                    firstName: admin[0].firstName,
                    lastName: admin[0].lastName,
                    email: admin[0].email,
                    role: admin[0].role,
                },
            },
        });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        next(error);
    }
};

/* CREATE CONSULTANT ------------------------------------ */
export const createConsultant = async (req, res, next) => {
    const { firstName, lastName, email, password, phone } = req.body;

    try {
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Please provide all required fields.",
            });
        }

        // Check if email already exists
        const userExists = await User.findOne({ email });

        if (userExists) {
            return res.status(409).json({
                success: false,
                message: "Email is already registered.",
            });
        }

        const consultant = await User.create({
            firstName,
            lastName,
            email,
            password,
            phone,
            role: "consultant",
            organization: req.user.organization,
        });

        return res.status(201).json({
            success: true,
            message: "Consultant created successfully.",
            data: {
                id: consultant._id,
                firstName: consultant.firstName,
                lastName: consultant.lastName,
                email: consultant.email,
                phone: consultant.phone,
                role: consultant.role,
                organization: consultant.organization,
                createdAt: consultant.createdAt,
            },
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