import express from 'express'
const router = express.Router()

import { 
        createAdmin,
    
} from '../controllers/userControllers'

router.post('/create-admin/:slug', createAdmin)

export default router