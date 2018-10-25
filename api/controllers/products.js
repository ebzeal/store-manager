import Joi from 'joi';
import ProductModel from '../models/product';

const Product = {

  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} products array

  validateProduct(product) {
    const schema = {
      productCategory: Joi.string().min(3).required(),
      productName: Joi.string().min(3).required(),
      productImage: Joi.string().min(3),
      productDetails: Joi.string(),
      productSpec: Joi.string(),
      productPrice: Joi.number().required(),
    };

    return Joi.validate(product, schema);
  },

  getAll(req, res) {
    const products = ProductModel.findAll();
    return res.status(200).send(products);
  },
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} product object

  create(req, res) {
    // const { error } = this.validateProduct(req.body);
    // if (error) {
    //   return res.status(400).send(error.details[0].message);
    // }
    if (!req.body.productCategory || !req.body.productName || !req.body.productPrice) {
      return res.status(400).send({ message: 'Category, Name and Price fields are required' });
    }
    const product = ProductModel.create(req.body);
    return res.status(201).send(product);
  },
  // update single product
  update(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    const updatedProduct = ProductModel.update(req.params.id, req.body);
    return res.status(200).send(updatedProduct);
  },

  // Find one product
  getOne(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    return res.status(200).send(product);
  },

  // Delete Single product

  delete(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).send({ message: 'product not found' });
    }
    const ref = ProductModel.delete(req.params.id);
    return res.status(204).send(ref);
  },

};

export default Product;
