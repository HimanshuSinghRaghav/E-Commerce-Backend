import User from "../models/register.js"



const getUserDetails = async(req , res)=>{

    try{
        const user = await User.findById(req.user._id).select('-password')
        res.send({success:true , user})
    }catch(error){
        next(error)
    }
}

export default getUserDetails