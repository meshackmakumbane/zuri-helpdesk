import express from 'express'
const router = express.Router()

import { 
        createAdmin,
    
} from '../controllers/userControllers'
import { organizationMiddleware } from '../middleware/organizationMiddleware'


router.post('/create-admin/:slug', 
    organizationMiddleware, 
    createAdmin
)

export default router