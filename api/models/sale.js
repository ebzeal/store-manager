import uuid from 'uuid';

class Sale {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.sales = [];
    this.Date = () => new Date();
  }

  create(data) {
    const newSale = {
      id: uuid.v4(),
      attendant: data.attendant,
      productName: data.productName,
      quantity: data.quantity,
      amount: data.amount,
      salesTime: this.Date(),
      salesDate: this.Date(),
    };
    this.sales.push(newSale);
    return newSale;
  }


  findOne(id) {
    return this.sales.find(sale => sale.id === id);
  }

  //  returns all sales

  findAll() {
    return this.sales;
  }


  /**
 *  @param {uuid}id delete sale
 * @returns object
 */

  delete(id) {
    const sale = this.findOne(id);
    const index = this.sales.indexOf(sale);
    this.sales.splice(index, 1);
    return {};
  }
}
export default new Sale();
