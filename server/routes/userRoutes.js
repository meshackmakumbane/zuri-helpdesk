import express from 'express';
const router = express.Router();

import { createAdmin } from '../controllers/userControllers.js';
import { organizationMiddleware } from '../middleware/organizationMiddleware.js';

router.post(
    '/create-admin',
    organizationMiddleware,
    createAdmin
);

router.post(
    "/invite-consultant",
    adminMiddleware,
    inviteConsultant
);

export default router;