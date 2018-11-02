import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateSales(input) {
  const errors = {};
  input.attendant = !checkEmpty(input.attendant) ? input.attendant : errors.attendant = 'Name of attendant is required';
  input.productName = !checkEmpty(input.productName) ? input.productName : errors.productName = 'Product Name field is required';
  input.quantity = !checkEmpty(input.quantity) ? input.quantity : errors.quantity = 'Please enter quantity purchased';
  input.amount = !checkEmpty(input.amount) ? input.amount : errors.amount = 'Please enter amount purchased';

  if (!Validator.isLength(input.attendant, { min: 1, max: 30 })) {
    errors.attendant = 'Attendant Name must be added to record';
  }


  if (!Validator.isLength(input.productName, { min: 1, max: 30 })) {
    errors.attendant = 'Enter Valid Product Name';
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
