import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateSales(input) {
  const errors = {};
  input.attendant = !checkEmpty(input.attendant) ? input.attendant : errors.attendant = 'Name of attendant is required';
  input.productName = !checkEmpty(input.productName) ? input.productName : errors.productName = 'Product Name field is required';
  input.quantity = !checkEmpty(input.quantity) ? input.quantity : errors.quantity = 'Please enter quantity purchased';
  input.amount = !checkEmpty(input.amount) ? input.amount : errors.amount = 'Please enter amount purchased';

  if (!Validator.isLength(input.attendant, { min: 2, max: 30 })) {
    errors.attendant = 'Attendant Name must be added to record';
  }


  if (!Validator.isLength(input.productName, { min: 2, max: 30 })) {
    errors.attendant = 'Product Name must be between 2 and 30 characters';
  }

  if (!Validator.isLength(input.quantity, { min: 2, max: 30 })) {
    errors.quantity = 'Product Price must be at least 2 characters';
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
