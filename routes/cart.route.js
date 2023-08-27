import express from 'express'
import verifyToken from '../middalware/auth.js';
import createCart from '../services/cart.service.js';

const router = express.Router();

router.use(verifyToken)
router.post('/carts', createCart);

export default router;