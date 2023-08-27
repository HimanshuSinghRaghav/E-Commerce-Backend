import _ from 'lodash';
import Product from '../models/product.js'
import { validateProduct } from '../utils/validation.js'
import Category, { Subcategory } from '../models/categories.js';

const createProduct = async (req, res) => {
    const { error } = validateProduct(req.body);
    if (error) {
        if (error) {
            return res
                .status(400)
                .json({ success: false, error: error.details[0].message });
        }
    }

    try {
        const product = new Product(_.pick(req.body, ['name', 'description', 'price', 'stock', 'category', 'imageUrl', 'subcategorie']))
        product.user = req.user._id
        const a = await product.save();
        console.log(product, req.body.subcategorie)
        // Find the category by its name
        const subcategory = await Subcategory.findOne({ name: req.body.subcategorie });

        if (subcategory) {
            // Add the product ID to the products array of the subcategory
            subcategory.products.push(product._id);

            await subcategory.save();


            res.send({ success: true, message: "Product Successfully Added!" })
        }

    } catch (error) {
        console.log(error)
    }
}

const getAllProduct = async (req, res) => {
    try {
        const products = await Product.find({ user: req.user._id });
        res.send({ success: true, products })
    } catch (error) {
        res.status(404).send({ success: false, error: error })
    }
}

const updateProduct = async (req, res) => {
    try {
        const products = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.send({ success: true, products })
    } catch (error) {
        res.status(404).send({ success: false, error: error })
    }
}

const deleteProduct = async (req, res) => {
    try {
        // Find product by ID and get its reference
        const product = await Product.findById(req.params.id);


        // Update subcategories to remove the product reference
        const a = await Subcategory.updateMany(
            { name: product.subcategorie },
            { $pull: { products: product._id } }
        );
        // Delete the product document
        await Product.findByIdAndDelete(req.params.id);
        console.log(a)
        res.send({ success: true });
    } catch (error) {
        console.log(error);
        res.status(404).send({ success: false, error: error });
    }
}

export default createProduct
export { getAllProduct, updateProduct, deleteProduct }