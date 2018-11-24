import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateLogin(input) {
  const errors = {};
  input.userEmail = !checkEmpty(input.userEmail) ? input.userEmail : errors.userEmail = 'user email field is required';
  input.password = !checkEmpty(input.password) ? input.password : errors.password = 'password field is required';

  if (!Validator.isEmail(input.userEmail)) {
    errors.userEmail = 'user email is invalid';
  }

  if (!Validator.isLength(input.password, { min: 5, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }
  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
