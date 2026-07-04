import express from "express";
const router = express.Router();

import { inviteConsultant } from "../controllers/userControllers.js";
import { adminMiddleware } from "../middleware/adminMiddleware.js";

router.post(
    "/invite-consultant",
    adminMiddleware,
    inviteConsultant
);

export default router;