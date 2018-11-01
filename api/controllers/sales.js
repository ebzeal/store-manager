import db from '../models/connect';
import validateSales from '../validation/categories';

const Sales = {
  /**
   * Create A sale
   * @param {object} req
   * @param {object} res
   * @returns {object} sale object
   */

  async create(req, res) {
    const { errors, isValid } = validateSales(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = `INSERT INTO
      sales(attendant,productName,quantity,amount,productSpec)
      VALUES($1, $2, $3, $4, $5)
      returning *`;
    const values = [
      req.body.attendant,
      req.body.productName,
      req.body.quantity,
      req.body.amount,
      req.body.productSpec,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get All sales
   * @param {object} req
   * @param {object} res
   * @returns {object} sales array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM sales';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get A sale
   * @param {object} req
   * @param {object} res
   * @returns {object} sale object
   */
  async getOne(req, res) {
    const saleId = req.params.id;
    const text = `SELECT * FROM sales WHERE id = ${saleId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'sale not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Sales;
