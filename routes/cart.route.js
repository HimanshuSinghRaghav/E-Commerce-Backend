import express from 'express'
import verifyToken from '../middalware/auth.js';
import createCart, { deleteCart, getCart, removeItemFromCart, updateItemFromCart } from '../services/cart.service.js';

const router = express.Router();

router.use(verifyToken)

router
     .post('/carts', createCart)
     .get('/carts' , getCart)
     .delete('/carts/:id' , deleteCart)
     .delete('/carts/:id/items/:itemId' , removeItemFromCart)
     .patch('/carts/:id/items/:itemId' , updateItemFromCart)

export default router;