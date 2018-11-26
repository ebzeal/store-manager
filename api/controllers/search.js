import db from '../models/connect';

const Search = {

  constructor() {

  },
  /**
    * Return Products by Category
    * @param {object} req
    * @param {object} res
    * @returns {object} products array
    */
  async searchProductsByCategories(req, res) {
    const values = req.params.id;
    const searchProduct = `SELECT * FROM products WHERE categories_id=${values} ORDER BY productname ASC`;

    try {
      const search = await db.query(searchProduct);
      return res.status(201).json(search.rows);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

  /**
   * Return Products by Search
   * @param {object} req
   * @param {object} res
   * @returns {object} products array
   */
  async searchProductsByText(req, res) {
    const values = [
      req.params.id,
    ];
    const value = req.params.id;
    const searchProduct = `SELECT * FROM products WHERE productName LIKE '${value}'`;
    try {
      console.log(values);
      const searchme = await db.query(searchProduct, value);
      return res.status(201).json(searchme.rows);
    } catch (error) {
      return res.status(400).json(error);
    }
  },

};

export default Search;
