import Register from "../models/register.js"



const getUserDetails = async(req , res)=>{

    try{
        const details = Register.findById(req.id)
    }catch(error){
        
    }
}

export default getUserDetails