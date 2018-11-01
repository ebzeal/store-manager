import bcrypt from 'bcryptjs';
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
  // constructor() {
  //   const hashed = bcrypt.hashSync(req.body.password, 8);
  // },

  async signUp(req, res) {
    const { errors, isValid } = validateRegister(req.body);
    // Check Validation
    if (!isValid) return res.json(errors);

    const hashed = bcrypt.hashSync(req.body.password, 8);
    const text = `INSERT INTO
      users(userName, userEmail, userPriviledge, password)
      VALUES($1, $2, $3, $4)
      returning *`;
    const values = [
      req.body.userName,
      req.body.userEmail,
      req.body.userPriviledge,
      hashed,
    ];

    try {
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
    ];
    const findUser = 'SELECT * FROM users WHERE userEmail=$1';
    try {
      const { rows } = await db.query(findUser, values);

      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }

      const passwordTrue = bcrypt.compareSync(req.body.password, rows[0].password);
      if (!passwordTrue) return res.status(401).json({ auth: false, token: null, message: 'Password is wrong' });

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
        { expiresIn: 10800 },
        (err, token) => {
          res.json({
            success: true,
            token: `${token}`,
            message: `${rows[0].username} Logged in as ${rows[0].userpriviledge}`,
          });
        },
      );
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
      return res.status(400).json(error);
    }
  },


  /**
     * Get Own profile
     * @param {object} req
     * @param {object} res
     * @returns {object} user object
     */
  async getOwn(req, res) {

    const tokenId = decoded.id;
    const userId = req.params.id;

    if (userId == tokenId) {
      const values = [
        userId,
      ];
      const text = 'SELECT * FROM users WHERE id = $1';
      try {
        const { rows } = db.query(text, values);
        if (!rows[0]) {
          return res.status(404).json({ message: 'user not found' });
        }
        return res.status(200).json(rows[0]);
      } catch (error) {
        return res.status(400).json(error);
      }
    } else {
      return res.status(404).json({ message: 'You can only access your profile' });
    }
  },


  /**
   * Update A user
   * @param {object} req
   * @param {object} res
   * @returns {object} updated user
   */
  async update(req, res) {
    const { errors, isValid } = validateLogin(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findOneQuery = 'SELECT * FROM users WHERE id=$1';
    const updateOneQuery = `UPDATE users
      SET userName=$1,userEmail=$2,userPriviledge=$3,password=$4,dateModified=$5
      WHERE id=$6 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'user not found' });
      }
      const hashed = bcrypt.hashSync(req.body.password, 8);
      const values = [
        req.body.userName || rows[0].userName,
        req.body.userEmail || rows[0].userEmail,
        req.body.userPriviledge || rows[0].userPriviledge,
        hashed || rows[0].password,
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
      return res.status(204).json({ message: 'User deleted Succefully' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  // a function for tests
  // async remove() {
  //   const deleteQuery = 'DELETE FROM users';

  //   await db.query(deleteQuery);
  // },

};

export default User;
