const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateTestInput(data) {
  let errors = {};

  data.Logon = isEmpty(data.Logon) ? '' : data.Logon;

  if (validator.isEmpty(data.Logon)) {
    console.log(data.Logon);
    errors.Logon = 'A user logon is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
