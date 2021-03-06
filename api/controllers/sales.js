import db from '../models/connect';
import validateSales from '../validation/sales';

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
      sales(invoice_num,users_id,products_id,quantity,amount,totalAmount)
      VALUES($1, $2, $3, $4, $5, $6)
      returning *`;
    const values = [
      req.body.invoice_num,
      req.body.users_id,
      req.body.products_id,
      req.body.quantity,
      req.body.amount,
      req.body.totalAmount,
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
   * Get All sales
   * @param {object} req
   * @param {object} res
   * @returns {object} sales array
   */
  async getOwnAll(req, res) {
    const userId = req.params.id;
    const text = `SELECT * FROM sales WHERE users_id = ${userId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'sale not found' });
      }
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
  async getOneById(req, res) {
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


  /**
   * Get A sale
   * @param {object} req
   * @param {object} res
   * @returns {object} sale object
   */
  async getByInvoice(req, res) {
    const saleId = req.params.id;
    const text = `SELECT * FROM sales WHERE invoice_num = ${saleId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'sale not found' });
      }
      return res.status(200).json(rows);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

};

export default Sales;
