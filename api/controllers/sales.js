import db from '../models/connect';

const Sales = {
  /**
   * Create A sale
   * @param {object} req
   * @param {object} res
   * @returns {object} sale object
   */

  async create(req, res) {
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
      console.log(error);
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
      console.log(error);
      return res.status(400).json(error);
    }
  },
  /**
   * Update A sale
   * @param {object} req
   * @param {object} res
   * @returns {object} updated sale
   */
  // async update(req, res) {
  //   const findOneQuery = 'SELECT * FROM sales WHERE id=$1';
  //   const updateOneQuery = `UPDATE sales
  //     SET attendant=$1,productName=$2,quantity=$3,
  // amount=$4,productSpec=$5,salesTime=$6,salesDate=$7
  //     WHERE id=$8 returning *`;
  //   try {
  //     const { rows } = await db.query(findOneQuery, [req.params.id]);
  //     if (!rows[0]) {
  //       return res.status(404).json({ message: 'sale not found' });
  //     }
  //     const values = [
  //       req.body.attendant || rows[0].attendant,
  //       req.body.productName || rows[0].productName,
  //       req.body.quantity || rows[0].quantity,
  //       req.body.amount || rows[0].amount,
  //       req.body.productSpec || rows[0].productSpec,
  //       req.body.salesTime || rows[0].salesTime,
  //       req.body.salesDate || rows[0].salesDate,
  //       req.params.id,
  //     ];
  //     const response = await db.query(updateOneQuery, values);
  //     return res.status(200).json(response.rows[0]);
  //   } catch (err) {
  //     console.log(err);
  //     return res.status(400).json(err);
  //   }
  // },
  /**
   * Delete A sale
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  // async delete(req, res) {
  //   const deleteQuery = `DELETE FROM sales WHERE id=${req.params.id} returning *`;
  //   try {
  //     const { rows } = await db.query(deleteQuery);
  //     if (!rows[0]) {
  //       return res.status(404).json({ message: 'sale not found' });
  //     }
  //     return res.status(204).json({ message: 'deleted' });
  //   } catch (error) {
  //     console.log(error);
  //     return res.status(400).json(error);
  //   }
  // },
};

export default Sales;
