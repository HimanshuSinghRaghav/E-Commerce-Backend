import jwt from 'jsonwebtoken'
import Register from '../models/register.js'
import  validateRegistration  from '../utils/validation.js'


const registerUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res.status(400).json({ success: false, error: error.details[0].message });
  }

  try {
    const existingUser = await Register.findOne({ email: req.body.email });

    if (existingUser) {
      return res.status(409).json({ success:false ,error: 'Email already exists' });
    }

    const register = new Register({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    });

    await register.save();

    res.json({ success:true , user: { name: register.name, email: register.email } });
  } catch (err) {
    return res.status(500).json({ success:false , error: 'Internal server error' });
  }
};



  // login user 
  const loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
  
      const user = await Register.findOne({ email });
  
      if (!user) {
        return res.status(401).json({ success:false ,error: 'Invalid credentials' });
      }
  
      if (user.password !== password) {
        return res.status(401).json({ success:false ,error: 'Invalid credentials' });
      }
  
      const token = jwt.sign({ email: user.email }, 'secretKey');
  
      res.json({ success:true , user: { name: user.name, email: user.email } });
    } catch (err) {
      return res.status(500).json({ success:false ,error: 'Internal server error' });
    }
  };

  export default registerUser
  export {loginUser}