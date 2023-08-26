import express from 'express'
import registerUser, { loginUser } from '../services/register.service.js';
import verifyToken from '../middalware/auth.js';
const router = express.Router();


router.post('/login', loginUser);

export default router;