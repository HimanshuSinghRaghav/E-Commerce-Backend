import mongoose from 'mongoose'
import config from 'config'
import jwt from "jsonwebtoken"

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  isAdmin: Boolean
});

userSchema.methods.generateAuthToken = function() {
  const token = jwt.sign({_id:this._id , isAdmin:this.isAdmin} , config.get("jwtPrivateKey"))
  return token
}

export default mongoose.model('User', userSchema);
