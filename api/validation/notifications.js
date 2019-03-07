import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateNotifications(input) {
  const errors = {};
  input.notifications = !checkEmpty(input.notifications) ? input.notifications : errors.notifications = 'Notifications field is required';
  if (!Validator.isLength(input.notifications, { min: 2 })) {
    errors.notifications = 'notifications Time must be correct';
  }

  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
