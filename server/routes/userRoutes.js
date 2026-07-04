import express from 'express';
const router = express.Router();

import { createAdmin } from '../controllers/userControllers.js';
import { organizationMiddleware } from '../middleware/organizationMiddleware.js';

router.post(
    '/create-admin',
    organizationMiddleware,
    createAdmin
);

export default router;