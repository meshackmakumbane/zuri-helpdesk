import express from 'express'
const router = express.Router()

import { updateBusinessLogo, createBusiness, verifyBusiness } from "../controllers/businessControllers.js";
import { protect } from "../middleware/protectMiddleware.js";
import { upload } from "../middleware/upload.js";

router.patch("/logo",protect, upload.single("logo"),updateBusinessLogo);
router.post('/onboarding', createBusiness)
router.post('verify', verifyBusiness)

export default router
