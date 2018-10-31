// import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import db from '../models/connect';
import validateRegister from '../validation/register';
import validateLogin from '../validation/login';
import keys from '../config/keys';


const User = {
  /**
   * Register A User
   * @param {object} req
   * @param {object} res
   * @returns {object} user object
   */

  async signUp(req, res) {
    const { errors, isValid } = validateRegister(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = `INSERT INTO
      users(userName, userEmail, password)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.userName,
      req.body.userEmail,
      req.body.password,
    ];

    try {
      // bcrypt.genSalt(10, (err, salt) => {
      //   bcrypt.hash(values[2], salt, (err, hash) => {
      //     if (err) throw err;
      //     values[2].password = hash;
      //     values
      //       .then()
      //       .catch(err => console.log(err));
      //   });
      // });

      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  /**
 * Login a user
 * @param {object} req
 * @param {object} res
 * @returns {object} user object
 */
  async logIn(req, res) {
    const { errors, isValid } = validateLogin(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const values = [
      req.body.userEmail,
      req.body.password,
    ];
    const findUser = 'SELECT * FROM users WHERE userEmail=$1 AND password=$2';
    try {
      const { rows } = await db.query(findUser, values);

      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      const payload = {
        id: rows[0].id,
        userName: rows[0].username,
        userPriviledge: rows[0].userpriviledge,
      };
      // Create JWT Payload
      // Sign Token
      jwt.sign(
        payload,
        keys.JWT_SECRET,
        { expiresIn: 3600 },
        (err, token) => {
          res.json({
            success: true,
            token: `Bearer  + ${token}`,
          });
        },
      );
    } catch (error) {
      console.log(error);
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
    const { errors, isValid } = validateRegister(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
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
      SET userName=$1,userEmail=$2,userPriviledge=$3,password=$4,dateModified=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      const values = [
        req.body.userName || rows[0].userName,
        req.body.userEmail || rows[0].userEmail,
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
