import uuid from 'uuid';

class Product {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.products = [];

    this.theDate = () => new Date();
  }

  /**
     * @param {object} data
     * returns object
     */

  create(data) {
    const newProduct = {
      id: uuid.v4(),
      productCategory: data.productCategory,
      productName: data.productName,
      productImage: data.productImage,
      productDetails: data.productDetails,
      productSpec: data.productSpec,
      productPrice: data.productPrice,
      userPriviledge: data.userPriviledge,
      dateAdded: this.theDate(),
      dateModified: this.theDate(),
    };
    this.products.push(newProduct);
    return newProduct;
  }

  /**
     * @param {object} id
     * @returns single product
     */
  findOne(id) {
    return this.products.find(product => product.id === id);
  }

  /**
   * @returns array
   */

  findAll() {
    return this.products;
  }

  /**
   * @param {object} id, data
   * @returns {object}
   */

  update(id, data) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index].productCategory = data.productCategory || product.productCategory;
    this.products[index].productName = data.productName || product.productName;
    this.products[index].productImage = data.productImage || product.productImage;
    this.products[index].productDetails = data.productDetails || product.productDetails;
    this.products[index].productSpec = data.productSpec || product.productSpec;
    this.products[index].productPrice = data.productPrice || product.productPrice;
    this.products[index].dateModified = this.theDate;
    return this.products[index];
  }

  /**
   * class constructor
   * @param {object} id
   * @returns object
   */

  delete(id) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return {};
  }
}
export default new Product();
