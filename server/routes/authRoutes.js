import express from 'express'
const router = express.Router()

import { loginUser } from '../controllers/authControllers'

router.post('/login', loginUser)

export default router