import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  phone: String,
  account: String
});

export default mongoose.model('Register', registerSchema);
