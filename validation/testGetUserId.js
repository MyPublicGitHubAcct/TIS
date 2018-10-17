const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestInput(data) {
  let errors = {};

  data.Logon = isEmpty(data) ? '' : data;

  if (validator.isEmpty(data)) {
    console.log(data);
    errors.Logon = 'A user logon is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
