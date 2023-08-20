export const error = (err , req , res , next)=>{
    //Log the Exception
    res.ststus(500).send("Somthing Faild")
}
