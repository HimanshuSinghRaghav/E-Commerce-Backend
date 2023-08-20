import jwt from "jsonwebtoken"
const adminAuth = (req, res, next) => {
    if(req.user.isAdmin){
        next()
    }else{
        res.status(403).send('Access Denid!')
    }
  };

  export default adminAuth