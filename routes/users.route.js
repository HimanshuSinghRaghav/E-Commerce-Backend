import express from 'express'
import registerUser, { loginUser } from '../services/register.service.js';
import verifyToken from '../middalware/auth.js';
import getUserDetails from '../services/user.service.js';
import adminAuth from '../middalware/admin.js';
const router = express.Router();


router.use(verifyToken)


router
.post('/me', loginUser)
.get('/me' , getUserDetails)

export default router;