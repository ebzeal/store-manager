import db from '../models/connect';
import validateIncidents from '../validation/incidents';

const Incident = {
  /**
   * Create A incident
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */

  async create(req, res) {
    const { errors, isValid } = validateIncidents(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const text = `INSERT INTO
      incidents(incidentTime,incidentImage,incidentDetails)
      VALUES($1, $2, $3)
      returning *`;
    const values = [
      req.body.incidentTime,
      req.body.incidentImage,
      req.body.incidentDetails,
    ];

    try {
      const { rows } = await db.query(text, values);
      return res.status(201).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get All incidents
   * @param {object} req
   * @param {object} res
   * @returns {object} incidents array
   */
  async getAll(req, res) {
    const findAllQuery = 'SELECT * FROM incidents';
    try {
      const { rows } = await db.query(findAllQuery);
      return res.status(200).json({ rows });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Get A incident
   * @param {object} req
   * @param {object} res
   * @returns {object} incident object
   */
  async getOne(req, res) {
    const incidentId = req.params.id;
    const text = `SELECT * FROM incidents WHERE id = ${incidentId}`;
    try {
      const { rows } = await db.query(text);
      if (!rows[0]) {
        return res.status(404).json({ message: 'incident not found' });
      }
      return res.status(200).json(rows[0]);
    } catch (error) {
      return res.status(400).json(error);
    }
  },
  /**
   * Update A incident
   * @param {object} req
   * @param {object} res
   * @returns {object} updated incident
   */
  async update(req, res) {
    const { errors, isValid } = validateIncidents(req.body);

    // Check Validation
    if (!isValid) {
      return res.status(400).json(errors);
    }
    const findOneQuery = 'SELECT * FROM incidents WHERE id=$1';
    const updateOneQuery = `UPDATE incidents
      SET incidentTime=$1,incidentImage=$2,incidentDetails=$3
      WHERE id=$4 returning *`;
    try {
      const { rows } = await db.query(findOneQuery, [req.params.id]);
      if (!rows[0]) {
        return res.status(404).json({ message: 'incident not found' });
      }
      const values = [
        req.body.incidentTime || rows[0].incidentTime,
        req.body.incidentImage || rows[0].incidentImage,
        req.body.incidentDetails || rows[0].incidentDetails,
        req.params.id,
      ];
      const response = await db.query(updateOneQuery, values);
      return res.status(200).json(response.rows[0]);
    } catch (err) {
      return res.status(400).json(err);
    }
  },
  /**
   * Delete A incident
   * @param {object} req
   * @param {object} res
   * @returns {void} return statuc code 204
   */
  async delete(req, res) {
    const deleteQuery = `DELETE FROM incidents WHERE id=${req.params.id} returning *`;
    try {
      const { rows } = await db.query(deleteQuery);
      if (!rows[0]) {
        return res.status(404).json({ message: 'incident not found' });
      }
      return res.status(204).json({ message: 'deleted' });
    } catch (error) {
      return res.status(400).json(error);
    }
  },
};

export default Incident;
