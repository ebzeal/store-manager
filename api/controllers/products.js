import db from '../models/connect';
import validateProduct from '../validation/products';

const Product = {
  /**
   * Create A product
   * @param {object} req
   * @param {object} res
   * @returns {object} product object
   */
  constructor() {

  },

  async create(req, res) {
    const { errors, isValid } = validateProduct(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const values = [
      req.body.categories_id,
      req.body.productName,
      req.file.path,
      req.body.productDetails,
      req.body.productSpec,
      req.body.productPrice,
    ];
    const uniqueVal = [
      values[0].trim(),
      values[1].trim(),
    ];
    const uniqueProduct = 'SELECT categories_id,productName FROM products WHERE categories_id=$1 AND LOWER(productName)=LOWER($2)';

    const text = `INSERT INTO
      products(categories_id,productName,productImage,productDetails,productSpec,productPrice)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;


    try {
      const unique = await db.query(uniqueProduct, uniqueVal);
      if (unique.rows[0]) return res.status(401).json({ message: `A product called ${unique.rows[0].productname} of Category ${unique.rows[0].categories_id} already exist` });
      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get All products
   * @param {object} req
   * @param {object} res
   * @returns {object} products array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM products';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  /**
   * Get A product
   * @param {object} req
   * @param {object} res
   * @returns {object} product object
   */
  async getOne(req, res) {
    const productId = req.params.id;
    const text = `SELECT * FROM products WHERE id = ${productId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'product not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Update A product
   * @param {object} req
   * @param {object} res
   * @returns {object} updated product
   */
  async update(req, res) {
    const { errors, isValid } = validateProduct(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }

    const findOneQuery = 'SELECT * FROM products WHERE id=$1';
    const updateOneQuery = `UPDATE products
      SET categories_id=$1,productName=$2,productImage=$3,productDetails=$4,productSpec=$5,productPrice=$6
      WHERE id=$7 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'product not found' });
      }
      const values = [
        req.body.categories_id || rows[0].categories_id,
        req.body.productName || rows[0].productName,
        req.body.productImage || rows[0].productImage,
        req.body.productDetails || rows[0].productDetails,
        req.body.productSpec || rows[0].productSpec,
        req.body.productPrice || rows[0].productPrice,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  /**
   * Delete A product
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete(req, res) {
    const deleteQuery = `DELETE FROM products WHERE id=${req.params.id} returning *`;
    try {
      const { rows } = await db.query(deleteQuery);
      if (!rows[0]) {
        return res.status(404).json({ message: 'product not found' });
      }
      res.json({ message: 'Deleted Successfully' });
      return res.status(204);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Product;
