import SaleModel from '../models/sale';

const Sale = {

  /**
* Gets All Product.
* @param {object} req
* @param {object} res
* @returns {object} sales array
*/


  getAll(req, res) {
    const sales = SaleModel.findAll();
    return res.status(200).send(sales);
  },

  /**
* Create New Product.
* @param {object} req
* @param {object} res
* @returns {object} sale object
*/


  create(req, res) {
    if (!req.body.attendant || !req.body.productName || !req.body.quantity || !req.body.amount) {
      return res.status(400).send({ message: 'Category, Name and Price fields are required' });
    }
    const sale = SaleModel.create(req.body);
    return res.status(201).send(sale);
  },


  /**
* Gets a Sale.
* @param {object} req
* @param {object} res
* @returns {object} sales object
*/
  getOne(req, res) {
    const sale = SaleModel.findOne(req.params.id);
    if (!sale) {
      return res.status(404).send({ message: 'sale not found' });
    }
    return res.status(200).send(sale);
  },

};

export default Sale;
