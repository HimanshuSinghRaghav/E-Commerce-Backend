import jwt from "jsonwebtoken";
import Register from "../models/register.js";
import validateRegistration from "../utils/validation.js";
import bcrypt from "bcrypt"
import _ from 'lodash'

const registerUser = async (req, res) => {
  const { error } = validateRegistration(req.body);
  if (error) {
    return res
      .status(400)
      .json({ success: false, error: error.details[0].message });
  }

  try {
    const existingUser = await Register.findOne({ email: req.body.email });

    if (existingUser) {
      return res
        .status(409)
        .json({ success: false, error: "Email already exists" });
    }

    const register = new Register(_.pick(req.body , ['name' , 'email' ,'password' , 'phone' , 'role']));
    const salt = await bcrypt.genSalt(10);
    register.password = await bcrypt.hash(register.password , salt)

    await register.save();

    res.json({
      success: true,
      user: { name: register.name, email: register.email },
    });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

// login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await Register.findOne({ email });

    if (!user) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    if (user.password !== password) {
      return res
        .status(401)
        .json({ success: false, error: "Invalid credentials" });
    }

    res.json({ success: true, user: { name: user.name, email: user.email } });
  } catch (err) {
    return res
      .status(500)
      .json({ success: false, error: "Internal server error" });
  }
};

export default registerUser;
export { loginUser };
