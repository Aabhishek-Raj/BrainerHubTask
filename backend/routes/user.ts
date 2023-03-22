import express from 'express'
import { signupUser, signinUser } from '../controller/userController'

const router = express.Router()

router.post('/', signupUser)
router.post('/login', signinUser)

export default router