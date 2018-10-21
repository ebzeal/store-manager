import express from 'express';
import moment from 'moment';
import uuid from 'uuid';
import Joi from 'joi';

const products = [
  {
    id: '', productCategory: '', productName: '', productImage: '', productDetails: '', productSpec: '', productPrice: '', dateAdded: '', dateModified: '',
  },
];

function validateProduct(product) {
  const schema = {
    productCategory: Joi.string().min(3).required(),
    productName: Joi.string().min(3).required(),
    productImage: Joi.string().min(3),
    productDetails: Joi.string(),
    productSpec: Joi.string(),
    productPrice: Joi.number().required(),
  };

  return Joi.validate(product, schema);
}

function checkIfExist(productid, res) {
  const product = products.find(prod => prod.id === productid);
  if (!product) return res.status(404).send('Product with the given ID does not exist');
  return product;
}

const router = express.Router();

// @route GET api/products
// @desc View/Read All products
// @access public
router.get('/', (req, res) => {
  res.json(products);
});

// @route POST api/products
// @desc Create New Product
// @access admin
router.post('/', (req, res) => {
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const product = {
    id: uuid.v4(),
    productCategory: req.body.productCategory,
    productName: req.body.productName,
    productImage: req.body.productImage,
    productDetails: req.body.productDetails,
    productSpec: req.body.productSpec,
    productPrice: req.body.productPrice,
    dateAdded: moment.now(),
    dateModified: moment.now(),
  };

  products.push(product);
  return res.json(products);
});

// @route GET api/products/:id
// @desc View/Read a product
// @access public
router.get('/:id', (req, res) => {
  // const product = products.find(prod => prod.id === req.params.id);
  // if (!product) return res.status(404).send('Product with the given ID does not exist');
  // return res.send(product);
  const product = checkIfExist(req.params.id, res);
  res.send(product);
});

// @route PUT api/products/:id
// @desc Update/edit a product
// @access admin
router.put('/:id', (req, res) => {
  const product = checkIfExist(req.params.id, res);
  const { error } = validateProduct(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  product.productCategory = req.body.productCategory;
  product.productName = req.body.productName;
  product.productImage = req.body.productImage;
  product.productDetails = req.body.productDetails;
  product.productSpec = req.body.productSpec;
  product.productPrice = req.body.productPrice;
  product.dateModified = moment.now();
  return res.json(product);
});

// @route DELETE api/products/:id
// @desc delete a product
// @access admin
router.delete('/:id', (req, res) => {
  const product = checkIfExist(req.params.id, res);
  const productIndex = products.indexOf(product);
  products.splice(productIndex, 1);
  return res.send(products);
});

export default router;
