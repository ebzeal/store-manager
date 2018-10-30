import db from '../models/connect';

const Product = {
  /**
   * Create A product
   * @param {object} req
   * @param {object} res
   * @returns {object} product object
   */
  constructor() {
    this.theDate = () => new Date();
  },
  async create(req, res) {
    const text = `INSERT INTO
      products(productName, productPriviledge, password)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.productName,
      req.body.productPriviledge,
      req.body.password,
    ];

    try {
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
      console.log(error);
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
    const findOneQuery = 'SELECT * FROM products WHERE id=$1';
    const updateOneQuery = `UPDATE products
      SET productName=$1,productPriviledge=$2,password=$3,dateModified=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'product not found' });
      }
      const values = [
        req.body.productName || rows[0].productName,
        req.body.productPriviledge || rows[0].productPriviledge,
        req.body.password || rows[0].password,
        new Date(),
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
      const { rows } = await db.query(deleteQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'product not found' });
      }
      return res.status(204).json({ message: 'deleted' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Product;
