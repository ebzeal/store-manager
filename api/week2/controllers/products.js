
import ProductModel from '../models/product';

const Product = {
  /**
* Gets All Product.
* @param {object} req
* @param {object} res
* @returns {object} products array
*/
  getAll(req, res) {
    const products = ProductModel.findAll();
    return res.status(200).json(products);
  },

  /**
* Creates Product.
* @param {object} req
* @param {object} res
* @returns {object} products object
*/
  create(req, res) {
    if (!req.body.productCategory || !req.body.productName || !req.body.productPrice
      || !req.body.userPriviledge) {
      return res.status(400).json({ message: 'Category, Name and Price fields are required' });
    }
    if (req.body.userPriviledge !== 'Admin' || !req.body.userPriviledge) {
      return res.status(403).json({ message: 'Access Denied, contact Admin' });
    }
    const product = ProductModel.create(req.body);
    return res.status(201).json(product);
  },

  /**
* Updates Product.
* @param {object} req
* @param {object} res
* @returns {object} products object
*/

  update(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    if (req.body.userPriviledge !== 'Admin' || !req.body.userPriviledge) {
      return res.status(403).json({ message: 'Access Denied, contact Admin' });
    }

    const updatedProduct = ProductModel.update(req.params.id, req.body);
    return res.status(200).json(updatedProduct);
  },

  /**
* Gets a Product.
* @param {object} req
* @param {object} res
* @returns {object} products object
*/
  getOne(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    return res.status(200).json(product);
  },

  /**
* Delete Product.
* @param {object} req
* @param {object} res
* @returns {object} products object
*/

  delete(req, res) {
    const product = ProductModel.findOne(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'product not found' });
    }
    if (req.body.userPriviledge !== 'Admin' || !req.body.userPriviledge) {
      return res.status(403).json({ message: 'Access Denied, contact Admin' });
    }
    let del = ProductModel.delete(req.params.id);
    del = {
      message: 'Product Deleted',
    };
    return res.status(200).json(del.message);
  },

};

export default Product;
