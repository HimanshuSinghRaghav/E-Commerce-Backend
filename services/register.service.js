import User from "../models/register.js";
import validateRegistration from "../utils/validation.js";
import bcrypt from "bcrypt"
import _ from 'lodash'
import Joi from 'joi'


const registerUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }

  try {
    const existingUser = await User.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }

    const user = new User(_.pick(req.body , ['name' , 'email' ,'password' , 'phone' , 'isAdmin']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password , salt)

    await user.save();
    const token = user.generateAuthToken();
    res.header('x-auth-token' , token).send({
      success: true,
      user: { name: user.name, email: user.email },
    });
  } catch (error) {
    console.log(error)
    return next(error)
  }
};

// login user
const loginUser = async (req, res) => {
  const { error } = validate(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    console.log(email)
    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    
    const validPassword = await bcrypt.compare(password , user.password)
    console.log(validPassword)
    if (!validPassword) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }
    const token = user.generateAuthToken();
    res.json({ success: true, token});
  } catch (error) {
    console.log(error)
    return next(error);
  }
};
const validate = (req) => {
  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  return schema.validate(req);
};

export default registerUser;
export { loginUser };
