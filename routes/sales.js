import express from 'express';
import moment from 'moment';
import uuid from 'uuid';
import Joi from 'joi';

const sales = [
  {
    id: '', attendant: '', productName: '', quantity: '', amount: '', salesTime: '', salesDate: '',
  },
];

function validatesale(sale) {
  const schema = {
    attendant: Joi.string().required(),
    productName: Joi.string().required(),
    quantity: Joi.string().required(),
    amount: Joi.string().required(),
  };

  return Joi.validate(sale, schema);
}

function checkIfExist(saleid, res) {
  const sale = sales.find(prod => prod.id === saleid);
  if (!sale) return res.status(404).send('sale with the given ID does not exist');
  return sale;
}

const router = express.Router();

// @route GET api/sales
// @desc View/Read All sales
// @access public
router.get('/', (req, res) => {
  res.json(sales);
});

// @route POST api/sales
// @desc Create New sale
// @access admin
router.post('/', (req, res) => {
  const { error } = validatesale(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const sale = {
    id: uuid.v4(),
    attendant: req.body.attendant,
    productName: req.body.productName,
    quantity: req.body.quantity,
    amount: req.body.amount,
    salesTime: moment.now('HH:mm:ss'),
    salesDate: moment.now('MMMM Do YYYY'),
  };

  sales.push(sale);
  return res.json(sales);
});

// @route GET api/sales/:id
// @desc View/Read a sale
// @access public
router.get('/:id', (req, res) => {
  // const sale = sales.find(prod => prod.id === req.params.id);
  // if (!sale) return res.status(404).send('sale with the given ID does not exist');
  // return res.send(sale);
  const sale = checkIfExist(req.params.id, res);
  res.send(sale);
});


// @route DELETE api/sales/:id
// @desc delete a sale
// @access admin
router.delete('/:id', (req, res) => {
  const sale = checkIfExist(req.params.id, res);
  const saleIndex = sales.indexOf(sale);
  sales.splice(saleIndex, 1);
  return res.send(sales);
});

export default router;
