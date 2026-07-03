import express from 'express'
const router = express.Router()

import { updateBusinessLogo } from "../controllers/businessControllers.js";
import { protect } from "../middleware/protectMiddleware.js";
import { upload } from "../middleware/upload.js";

router.patch("/logo",protect, upload.single("logo"),updateBusinessLogo);

export default router