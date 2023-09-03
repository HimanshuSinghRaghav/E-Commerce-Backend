import Joi from 'joi'

const validateRegistration = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    phone: Joi.string().min(13).max(13).required(),
    isAdmin: Joi.boolean().required()
  });

  return schema.validate(data);
};

const validateCart = (data) => {
  const cartSchema = Joi.object({
    items: Joi.array().items(Joi.object({
        product: Joi.string().required(),
        quantity: Joi.number().integer().min(1).required()
    })).min(1).required()
});
return cartSchema.validate(data)
};


const validateProduct = (data) => {
  const schema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    price: Joi.number().required(),
    stock: Joi.number().required(),
    category: Joi.string().required(),
    imageUrl: Joi.string().required(),
    subcategorie: Joi.string().required(),
  });

  return schema.validate(data);
};

export default validateRegistration
export {validateCart}
export {validateProduct}

