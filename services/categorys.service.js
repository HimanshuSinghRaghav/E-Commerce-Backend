import Category from '../models/categories.js'; // Adjust the import path
import {Subcategory} from '../models/categories.js'; // Adjust the import path for Subcategory

const getCategorys = async (req, res) => {
  try {
    const categorys = await Category.find().populate({
      path: 'subcategories',
      model: Subcategory, // Use the Subcategory model
      select: '-_id name'
    });

    res.send({ success: true, categorys });
  } catch (error) {
    console.log(error);
    res.status(404).send({ success: false, error: error });
  }
};

export default getCategorys;