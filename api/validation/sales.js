import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateSales(input) {
  const errors = {};
  input.users_id = !checkEmpty(input.users_id) ? input.users_id : errors.users_id = 'Users_id is required';
  input.products_id = !checkEmpty(input.products_id) ? input.products_id : errors.products_id = 'Product id field is required';
  input.quantity = !checkEmpty(input.quantity) ? input.quantity : errors.quantity = 'Please enter quantity purchased';
  input.amount = !checkEmpty(input.amount) ? input.amount : errors.amount = 'Please enter amount purchased';

  if (!Validator.isLength(input.users_id, { min: 1, max: 30 })) {
    errors.users_id = 'users_id must be added to record';
  }


  if (!Validator.isLength(input.products_id, { min: 1, max: 30 })) {
    errors.users_id = 'Enter Valid Product Name';
  }

  if (!Validator.isLength(input.amount, { min: 2, max: 30 })) {
    errors.amount = 'Product Price must be at least 2 characters';
  }

  // if (!Validator.isMimeType(input.productImage)) {
  //   errors.quantity = 'Product Image must be an image file';
  // }


  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
