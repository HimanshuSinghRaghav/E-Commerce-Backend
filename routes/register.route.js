import express from 'express'
import registerUser, { loginUser } from '../services/register.service.js';
const router = express.Router();



router.post('/register', registerUser);


export default router;