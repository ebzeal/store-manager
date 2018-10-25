import moment from 'moment';
import uuid from 'uuid';

class Product {
  /**
   * class constructor
   * @param {object} data
   */
  constructor() {
    this.products = [];
  }

  create(data) {
    const newProduct = {
      id: uuid.v4(),
      productCategory: data.productCategory,
      productName: data.productName,
      productImage: data.productImage,
      productDetails: data.productDetails,
      productSpec: data.productSpec,
      productPrice: data.productPrice,
      dateAdded: moment.now(),
      dateModified: moment.now(),
    };
    this.product.push(newProduct);
    return newProduct;
  }


  findOne(id) {
    return this.products.find(product => product.id === id);
  }

  //  returns all products

  findAll() {
    return this.products;
  }

  //  data  updates product

  update(id, data) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products[index].productCategory = data.productCategory || product.productCategory;
    this.products[index].productName = data.productName || product.productName;
    this.products[index].productImage = data.productImage || product.productImage;
    this.products[index].productDetails = data.productDetails || product.productDetails;
    this.products[index].productSpec = data.productSpec || product.productSpec;
    this.products[index].productPrice = data.productPrice || product.productPrice;
    this.products[index].dateModified = moment.now();
    return this.products[index];
  }

  // @param {uuid}id delete product

  delete(id) {
    const product = this.findOne(id);
    const index = this.products.indexOf(product);
    this.products.splice(index, 1);
    return {};
  }
}
export default new Product();
