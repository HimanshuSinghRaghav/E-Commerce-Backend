import jwt from "jsonwebtoken"


const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    try{
    if (authHeader && authHeader.startsWith('Bearer ')) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, 'secretKey', (err, decoded) => {
        if (err) {
          return res.status(401).json({ error: 'Invalid token' });
        }
  
        req.user = decoded;
        next();
      });
    } else {
      res.status(401).json({ error: 'No token provided' });
    }
    }catch(error){
        res.status(401).json({ success:false , error:error.message });
    }

    return next
  };

  export default verifyToken