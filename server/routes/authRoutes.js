import express from 'express'
const router = express.Router()

import { loginUser } from '../controllers/authControllers.js'

router.post('/login', loginUser)

export default router