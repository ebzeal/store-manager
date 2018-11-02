import Validator from 'validator';
import checkEmpty from './checkEmpty';

/* eslint-disable no-param-reassign */
export default function validateIncidents(input) {
  const errors = {};
  input.incidentTime = !checkEmpty(input.incidentTime) ? input.incidentTime : errors.incidentTime = 'Time of Incidnece field is required';
  input.incidentDetails = !checkEmpty(input.incidentDetails) ? input.incidentDetails : errors.incidentDetails = 'incident Details field is required';

  if (!Validator.isLength(input.incidentTime, { min: 2, max: 30 })) {
    errors.incidentTime = 'incident Time must be correct';
  }

  if (!Validator.isLength(input.incidentDetails, { min: 5, max: 30 })) {
    errors.incidentDetails = 'Please enter detailed description of event';
  }
  return {
    // obj destructuring instead of errors:errors
    errors,
    isValid: checkEmpty(errors),
  };
}
/* eslint-enable no-param-reassign */
