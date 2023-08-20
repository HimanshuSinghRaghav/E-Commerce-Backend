import express from "express";
import createProduct , {deleteProduct, getAllProduct , updateProduct} from '../services/product.service.js'
import verifyToken from "../middalware/auth.js";
import adminAuth from "../middalware/admin.js";
const router = express.Router()

router.use([verifyToken , adminAuth])

router
    .post('/product',createProduct)
    .get('/product' , getAllProduct)
    .patch('/product/:id' , updateProduct)
    .delete('/product/:id' , deleteProduct)

export default router