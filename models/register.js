import mongoose from 'mongoose'

const registerSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

export default mongoose.model('Register', registerSchema);
