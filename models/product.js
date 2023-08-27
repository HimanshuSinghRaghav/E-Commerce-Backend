import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
  category: String,
  imageUrl: String,
  user:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  },
  subcategorie: String,
},{timestamps: true});


export default mongoose.model('Product', productSchema);
