import mongoose from 'mongoose'

const subcategorySchema = new mongoose.Schema({
  name: String,
  products: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
});

const categorySchema = new mongoose.Schema({
    name: {
      type: String,
      required: true,
      unique: true
    },
    description: String,
    // You can add more fields here as needed, such as an array of products in this category.
    subcategories:[{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'SubCategory'
    }],

  });
  

export default mongoose.model('Category', categorySchema);

export const Subcategory = mongoose.model('Subcategory', subcategorySchema);