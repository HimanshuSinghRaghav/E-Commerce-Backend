import jwt from "jsonwebtoken"
import config from 'config'

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    try{
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, config.get('jwtPrivateKey'), (err, decoded) => {
        if (err) {
          return res.status(403).json({ error: 'Invalid token' });
        }
  
        req.user = decoded;
        next();
      });
    } else {
      res.status(403).json({ error: 'No token provided' });
    }
    }catch(error){
        res.status(403).json({ success:false , error:error.message });
    }

    return next
  };

  export default verifyToken