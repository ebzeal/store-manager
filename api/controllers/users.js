import db from '../models/connect';

const User = {
  /**
   * Create A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async create(req, res) {
    const text = `INSERT INTO
      users(userName, userPriviledge, password)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.userName,
      req.body.userPriviledge,
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
   * Get All Users
   * @param {object} req
   * @param {object} res
   * @returns {object} users array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM users';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get A user
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */
  async getOne(req, res) {
    const userId = req.params.id;
    const text = `SELECT * FROM users WHERE id = ${userId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  },
  /**
   * Update A user
   * @param {object} req
   * @param {object} res
   * @returns {object} updated user
   */
  async update(req, res) {
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET userName=$1,userPriviledge=$2,password=$3,dateModified=$4
      WHERE id=$5 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      const values = [
        req.body.userName || rows[0].userName,
        req.body.userPriviledge || rows[0].userPriviledge,
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
   * Delete A user
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete(req, res) {
    const deleteQuery = `DELETE FROM users WHERE id=${req.params.id} returning *`;
    try {
      const { rows } = await db.query(deleteQuery);
      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      return res.status(204).json({ message: 'deleted' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default User;
