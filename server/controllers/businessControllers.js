import { sendVerificationCode } from '../email/sendEmails.js'
import Organization from '../models/organization.js'
import User from '../models/user.js'

import { verificationCode } from '../utils/verificationCode.js'
import cloud from "../config/cloudinary.js";
import streamifier from "streamifier";

import { nanoid } from "nanoid";
import { organizationToken } from '../utils/organizationToken.js';

/* Create Business --------------------------------------------------- */
export const createBusiness = async(req, res, next)=> {
    const { name, email } = req.body
    try {
        if(!name || !email){
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        //Find existing business
        const existingOrganization = await Organization.findOne({ email })

        if(existingOrganization){
           return res.status(409).json({
                success: false,
                message: "A business with this email already exist"
            }) 
        }

        const slugify = (text)=>{
            return text 
            .toLowerCase()
            .trim()
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, '-')
            .replace(/-+/g, '-')
        }

        const slugName = `org-${slugify(name)}-${nanoid(6)}`;
        const ticketPrefix = name
        .replace(/\s+/g, "")
        .slice(0, 3)
        .toUpperCase();
        const now = new Date()
        const codeDuration = new Date(now.getTime() + 15 * 60 * 1000)
        const code = verificationCode()

        //Create Business
        const business = await Organization.create({
            name,
            email,
            slug: slugName,
            ticketPrefix,
            verificationCode: code,
            verificationCodeExpiresAt: codeDuration
        })

        //Send Verification Email
        try {
            await sendVerificationCode(name, email, code);
        } catch (error) {
            await Organization.findByIdAndDelete(business._id);
            throw error;
        }

        res.status(201).json({
            success: true,
            message: "Organization created. Please verify your email.",
        })

    } catch (error) {
        next(error)
    }
}

/* Verify Email --------------------------------------------------- */
export const verifyBusiness = async (req, res, next) => {
    const code = req.body.code?.trim();

    try {
        if (!code) {
            return res.status(400).json({
                success: false,
                message: "Provide the verification code sent to your email."
            });
        }

        const business = await Organization.findOne({
            verificationCode: code,
            verificationCodeExpiresAt: { $gt: new Date() }
        });

        if (!business) {
            return res.status(400).json({
                success: false,
                message: "Invalid or expired verification code."
            });
        }
        const generateToken = () =>{
            nanoId(48)
        } 

        business.isVerified = true;
        business.verificationCode = null;
        business.verificationCodeExpiresAt = null;
        await business.save();

        await organizationToken(business._id, res)

        return res.status(200).json({
            success: true,
            message: "Email verified successfully."
        });
    } catch (error) {
        next(error);
    }
};

/* Update Business --------------------------------------------------- */
export const updateBusiness = async (req, res, next) => {
    const {
        name,
        phone,
        website,
        street,
        city,
        state,
        country,
        postalCode,
    } = req.body;

    try {
        const business = await Organization.findById(req.user.organization);

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Organization not found."
            });
        }

        // Update basic details
        if (name !== undefined) business.name = name.trim();
        if (phone !== undefined) business.phone = phone.trim();
        if (website !== undefined) business.website = website.trim();

        // Ensure address object exists
        if (!business.address) {
            business.address = {};
        }

        // Update address
        if (street !== undefined) business.address.street = street.trim();
        if (city !== undefined) business.address.city = city.trim();
        if (state !== undefined) business.address.state = state.trim();
        if (country !== undefined) business.address.country = country.trim();
        if (postalCode !== undefined) business.address.postalCode = postalCode.trim();

        await business.save();

        return res.status(200).json({
            success: true,
            message: "Organization details updated successfully."
        });

    } catch (error) {
        next(error);
    }
};

/* Update Business Logo --------------------------------------------------- */
export const updateBusinessLogo = async (req, res, next) => {
    try {
        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "Please upload a logo."
            });
        }

        const allowedTypes = [
            "image/png",
            "image/jpeg",
            "image/jpg",
            "image/webp",
            "image/svg+xml"
        ];

        if (!allowedTypes.includes(req.file.mimetype)) {
            return res.status(400).json({
                success: false,
                message: "Only PNG, JPG, JPEG, SVG and WebP images are allowed."
            });
        }

        const business = await Organization.findById(req.user.organization);

        if (!business) {
            return res.status(404).json({
                success: false,
                message: "Organization not found."
            });
        }

        // Delete old logo if it exists
        if (business.logo?.public_id) {
            await cloudinary.uploader.destroy(business.logo.public_id);
        }

        // Upload new logo
        const uploadResult = await new Promise((resolve, reject) => {
            const stream = cloudinary.uploader.upload_stream(
                {
                    folder: "zuri-helpdesk/logos"
                },
                (error, result) => {
                    if (error) return reject(error);
                    resolve(result);
                }
            );

            streamifier.createReadStream(req.file.buffer).pipe(stream);
        });

        business.logo = {
            url: uploadResult.secure_url,
            public_id: uploadResult.public_id
        };

        await business.save();

        res.status(200).json({
            success: true,
            message: "Logo updated successfully.",
            logo: business.logo.url
        });

    } catch (error) {
        next(error);
    }
};