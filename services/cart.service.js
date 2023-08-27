import Cart from '../models/cart.js'
import { validateCart } from '../utils/validation.js'

const createCart = async(req , res)=>{
    const {error} = validateCart(req.body);
    if(error){return res.status(400).send({error:error.details[0].message})}

    try{
        const existingCart = Cart.find({user:req.user})
        if(existingCart){
            console.log(existingCart)
        }
        const newCart = new Cart({
            user:req.user,
            items:req.body.items
        })
        const response  = await newCart.save()
        res.send({response})
    }catch(error){
        console.log(error)
    }
}

export default createCart