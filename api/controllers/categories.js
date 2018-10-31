import db from '../models/connect';
import validateCategories from '../validation/categories';

const Category = {
  /**
   * Create A category
   * @param {object} req
   * @param {object} res
   * @returns {object} category object
   */

  async create(req, res) {
    const { errors, isValid } = validateCategories(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = `INSERT INTO
      categories(categoryName,categoryDetails)
      VALUES($1, $2)
      returning *`;
    const values = [
      req.body.categoryName,
      req.body.categoryDetails,
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
   * Get All categories
   * @param {object} req
   * @param {object} res
   * @returns {object} categories array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM categories';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get A category
   * @param {object} req
   * @param {object} res
   * @returns {object} category object
   */
  async getOne(req, res) {
    const categoryId = req.params.id;
    const text = `SELECT * FROM categories WHERE id = ${categoryId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'category not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
  /**
   * Update A category
   * @param {object} req
   * @param {object} res
   * @returns {object} updated category
   */
  async update(req, res) {
    const { errors, isValid } = validateCategories(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findOneQuery = 'SELECT * FROM categories WHERE id=$1';
    const updateOneQuery = `UPDATE categories
      SET categoryName=$1,categoryDetails=$2
      WHERE id=$3 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'category not found' });
      }
      const values = [
        req.body.categoryName || rows[0].categoryName,
        req.body.categoryDetails || rows[0].categoryDetails,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      console.log(err);
      return res.status(400).json(err);
    }
  },
  /**
   * Delete A category
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete(req, res) {
    const deleteQuery = `DELETE FROM categories WHERE id=${req.params.id} returning *`;
    try {
      const { rows } = await db.query(deleteQuery);
      if (!rows[0]) {
        return res.status(404).json({ message: 'category not found' });
      }
      return res.status(204).json({ message: 'deleted' });
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
};

export default Category;
