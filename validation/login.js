const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateLoginInput(data) {
  let errors = {};

  data.Logon = isEmpty(data.Logon) ? '' : data.Logon;
  data.Password = isEmpty(data.Password) ? '' : data.Password;

  if (validator.isEmpty(data.Logon)) {
    errors.Logon = 'Logon is required';
  }

  if (validator.isEmpty(data.Password)) {
    errors.Password = 'Password is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
