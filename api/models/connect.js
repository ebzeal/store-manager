import { Pool } from 'pg';
import dotenv from 'dotenv';

dotenv.config();


// if (process.env.current_env === 'test') {
//   const connectionString = process.env.TEST_DATABASE_URL;
// }

const connectionEnv = () => {
  if (process.env.current_env === 'test') {
    return process.env.TEST_DATABASE_URL;
  }
  return process.env.DATABASE_URL;
};


const pool = new Pool({
  connectionString: connectionEnv(),
});
pool.on('connect', () => {
  console.log('Connected to DB');
});


export default {
  /**
   * DB Query
   * @param {object} req
   * @param {object} res
   * @returns {object} object
   */
  query(text, params) {
    return new Promise((resolve, reject) => {
      pool.query(text, params)
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
};
