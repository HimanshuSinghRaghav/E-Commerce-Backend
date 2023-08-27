import mongoose from 'mongoose';
import Cart from '../models/cart.js'
import { validateCart } from '../utils/validation.js'

const createCart = async(req , res)=>{
    const {error} = validateCart(req.body);
    if(error){return res.status(400).send({error:error.details[0].message})}

    try{
        const existingCart = await Cart.findOne({ user: req.user });
        if(existingCart){
            console.log(existingCart)
            existingCart.items.push(req.body.items)
            const response = await existingCart.save()
            return res.send({success:true , response })
        }
        const newCart = new Cart({
            user:req.user,
            items:req.body.items,
            order:'unsigned'
        })
        const response  = await newCart.save()
        res.send({response})
    }catch(error){
        console.log(error.message)
    }
}

const getCart = async(req , res)=>{
    try{
        const cart = await Cart.findOne({user:req.user})
        res.send({success:true , cart})
    }catch(error){
        console.log(error.message)
    }
}

const deleteCart = async(req , res)=>{
    try{
        const deleteCart = await Cart.findByIdAndDelete(req.params.id)
        res.send({success:true})
    }catch(error){
        console.log(error.message)
    }
}

const removeItemFromCart = async(req , res)=>{
    const cartId = req.params.id;
    const itemId = req.params.itemId;
    try{
        if (!mongoose.Types.ObjectId.isValid(cartId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }
        console.log(cartId , itemId)

        // Find the cart by ID and update it to remove the item
        const updatedCart = await Cart.findByIdAndUpdate(
            cartId,
            { $pull: { items: { _id: itemId } } },
            { new: true }
        );
        console.log(updatedCart)
            if(updatedCart.items.length<1){
                await Cart.findByIdAndDelete(cartId)
            }
        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart not found' });
        }

        return res.json({ success: true });
    }catch(error){
        console.log(error.message)
    }
}

const updateItemFromCart = async(req , res)=>{
    const cartId = req.params.id;
    const itemId = req.params.itemId;
    const { quantity } = req.body;

    try {
        // Check if the provided IDs are valid ObjectId values
        if (!mongoose.Types.ObjectId.isValid(cartId) || !mongoose.Types.ObjectId.isValid(itemId)) {
            return res.status(400).json({ error: 'Invalid ObjectId' });
        }

        // Check if quantity is a positive integer
        if (!Number.isInteger(quantity) || quantity <= 0) {
            return res.status(400).json({ error: 'Invalid quantity' });
        }

        // Find the cart by ID and update the quantity of the specified item
        const updatedCart = await Cart.findOneAndUpdate(
            { _id: cartId, 'items._id': itemId },
            { $set: { 'items.$.quantity': quantity } },
            { new: true }
        );

        if (!updatedCart) {
            return res.status(404).json({ error: 'Cart or item not found' });
        }

        return res.json({ success: true, updatedCart });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
}
export default createCart
export {getCart , deleteCart ,removeItemFromCart , updateItemFromCart}