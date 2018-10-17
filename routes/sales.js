import express from 'express';
import moment from 'moment';
import uuid from 'uuid';
import Joi from 'joi';

const sales = [
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

const router = express.Router();

router.get('/', (req, res) => {
  res.send(sales);
});

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

  sales.push(product);
  return res.send(sales);
});

router.get('/:id', (req, res) => {
  const product = sales.find(prod => prod.id === req.params.id);
  if (!product) return res.status(404).send('Product with the given ID does not exist');
  return res.send(product);
});

export default router;
