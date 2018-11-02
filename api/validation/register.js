import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateRegister(input) {
  const errors = {};
  input.userName = !checkEmpty(input.userName) ? input.userName : errors.userName = 'userName field is required';
  input.userEmail = !checkEmpty(input.userEmail) ? input.userEmail : errors.userName = 'userEmail field is required';
  input.userPriviledge = !checkEmpty(input.userPriviledge) ? input.userPriviledge : errors.userPriviledge = 'userPriviledge field is required';
  input.password = !checkEmpty(input.password) ? input.password : errors.password = 'password field is required';
  input.password2 = !checkEmpty(input.password2) ? input.password2 : errors.password2 = 'password confirm field field is required';

  if (!Validator.isLength(input.userName, { min: 2, max: 30 })) {
    errors.userName = 'User Name must be between 2 and 30 characters';
  }


  if (!Validator.isEmail(input.userEmail)) {
    errors.userEmail = 'userEmail is invalid';
  }

  if (!Validator.isLength(input.userPriviledge, { min: 4, max: 5 })) {
    errors.userPriviledge = 'User Priviledge must either be User or Admin';
  }

  if (!Validator.isLength(input.password, { min: 6, max: 30 })) {
    errors.password = 'Password must be at least 6 characters';
  }

  if (!Validator.equals(input.password, input.password2)) {
    errors.password2 = 'Passwords must match';
  }

  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
