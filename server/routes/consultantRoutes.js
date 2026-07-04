import express from "express";
const router = express.Router();

import { 
    inviteConsultant, 
    consultantPassword 
} from "../controllers/consultantControllers.js";

import { adminMiddleware } from "../middleware/adminMiddleware.js";

router.post(
    "/invite-consultant",
    adminMiddleware,
    inviteConsultant
);

router.post( 
    "/consultant/accept/:token",
    consultantPassword
);

export default router;