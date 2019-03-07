import db from '../models/connect';
import validateNotification from '../validation/notifications';

const notification = {
  /**
   * Create A notification
   * @param {object} req
   * @param {object} res
   * @returns {object} notification object
   */

  async create(req, res) {
    const { errors, isValid } = validateNotification(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = `INSERT INTO
      notifications(notifications)
      VALUES($1)
      returning *`;
    const values = [
      req.body.notifications,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get All notification
   * @param {object} req
   * @param {object} res
   * @returns {object} notification array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM notifications';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  // /**
  //  * Get A notification
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} notification object
  //  */
  // async getOne(req, res) {
  //   const notificationId = req.params.id;
  //   const text = `SELECT * FROM notification WHERE id = ${notificationId}`;
  //   try {
  //     const { rows } = await db.query(text);
  //     if (!rows[0]) {
  //       return res.status(404).json({ message: 'notification not found' });
  //     }
  //     return res.status(200).json(rows[0]);
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  // },
  // /**
  //  * Update A notification
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {object} updated notification
  //  */
  // async update(req, res) {
  //   const { errors, isValid } = validateNotification(req.body);

  //   // Check Validation
  //   if (!isValid) {
  //     return res.status(400).json(errors);
  //   }
  //   const findOneQuery = 'SELECT * FROM notification WHERE id=$1';
  //   const updateOneQuery = `UPDATE notification
  //     SET notification=$1,notificationImage=$2,notificationDetails=$3
  //     WHERE id=$4 returning *`;
  //   try {
  //     const { rows } = await db.query(findOneQuery, [req.params.id]);
  //     if (!rows[0]) {
  //       return res.status(404).json({ message: 'notification not found' });
  //     }
  //     const values = [
  //       req.body.notification || rows[0].notification,
  //       req.body.notificationImage || rows[0].notificationImage,
  //       req.body.notificationDetails || rows[0].notificationDetails,
  //       req.params.id,
  //     ];
  //     const response = await db.query(updateOneQuery, values);
  //     return res.status(200).json(response.rows[0]);
  //   } catch (err) {
  //     return res.status(400).json(err);
  //   }
  // },
  // /**
  //  * Delete A notification
  //  * @param {object} req
  //  * @param {object} res
  //  * @returns {void} return statuc code 204
  //  */
  // async delete(req, res) {
  //   const deleteQuery = `DELETE FROM notification WHERE id=${req.params.id} returning *`;
  //   try {
  //     const { rows } = await db.query(deleteQuery);
  //     if (!rows[0]) {
  //       return res.status(404).json({ message: 'notification not found' });
  //     }
  //     return res.status(204).json({ message: 'deleted' });
  //   } catch (error) {
  //     return res.status(400).json(error);
  //   }
  // },
};

export default notification;
