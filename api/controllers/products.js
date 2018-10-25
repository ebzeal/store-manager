import ProductModel from '../models/product';

const Product = {
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} reflection object


  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} products array

  getAll(req, res) {
    const products = ProductModel.findAll();
    return res.status(200).send(products);
  },
};

export default Product;
