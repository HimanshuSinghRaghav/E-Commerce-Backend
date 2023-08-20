import express from 'express'
import registerUser, { loginUser } from '../services/register.service.js';
import verifyToken from '../middalware/auth.js';
import getUserDetails from '../services/user.service.js';
import Category, { Subcategory } from '../models/categories.js';
const router = express.Router();


router.use(verifyToken)


router.post('/categories/:id', async (req, res) => {
    try {
      const newCategory = await Subcategory.create(req.body);
      const category = await Category.findOne({ name: req.params.id });
      console.log(req.params.id , category)
      category.subcategories.push(newCategory._id)
      await category.save()
      res.status(201).json(newCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  });

export default router;