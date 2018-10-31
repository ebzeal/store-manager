import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateProduct(input) {
  const errors = {};
  input.categoryName = !checkEmpty(input.categoryName) ? input.categoryName : errors.categoryName = 'categoryName field is required';

  if (!Validator.isLength(input.categoryName, { min: 2, max: 30 })) {
    errors.productCategory = 'Product Name must be between 2 and 30 characters';
  }

  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
