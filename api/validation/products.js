import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateProduct(input) {
  const errors = {};
  input.categories_id = !checkEmpty(input.categories_id) ? input.categories_id : errors.categories_id = 'Categories field is required';
  input.productName = !checkEmpty(input.productName) ? input.productName : errors.productName = 'Product Name field is required';
  input.productPrice = !checkEmpty(input.productPrice) ? input.productPrice : errors.productPrice = 'Product Price field is required';

  if (!Validator.isLength(input.productName, { min: 2, max: 150 })) {
    errors.productName = 'Product Name must be between 2 and 150 characters';
  }

  if (!Validator.isLength(input.productPrice, { min: 2, max: 30 })) {
    errors.productPrice = 'Product Price must be at least 2 characters';
  }

  // if (!Validator.isMimeType(input.productImage)) {
  //   errors.productPrice = 'Product Image must be an image file';
  // }


  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
