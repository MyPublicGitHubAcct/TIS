const validator = require('validator');
const isEmpty = require('./is-empty');
const schema = require('../config/password');

module.exports = function validateCreateUserInput(data) {
  let errors = {};

  data.FirstName = isEmpty(data.FirstName) ? '' : data.FirstName;
  data.LastName = isEmpty(data.LastName) ? '' : data.LastName;
  data.Manager = isEmpty(data.Manager) ? '' : data.Manager;
  data.Logon = isEmpty(data.Logon) ? '' : data.Logon;
  data.Password = isEmpty(data.Password) ? '' : data.Password;
  data.Department = isEmpty(data.Department) ? '' : data.Department;
  data.isManager = isEmpty(data.isManager) ? '' : data.isManager;
  data.isActive = isEmpty(data.isActive) ? '' : data.isActive;

  if (validator.isEmpty(data.FirstName)) {
    errors.FirstName = 'First name is required';
  }

  if (!validator.isLength(data.FirstName, { min: 2, max: 30 })) {
    errors.FirstName = 'First name must be between 2 and 30 characters';
  }

  if (!validator.isLength(data.LastName, { min: 2, max: 30 })) {
    errors.LastName = 'Last name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.LastName)) {
    errors.LastName = 'Last name is required';
  }

  if (validator.isEmpty(data.Manager)) {
    errors.Manager = 'Manager is required';
  }

  if (validator.isEmpty(data.Logon)) {
    errors.Logon = 'Logon is required';
  }

  if (!validator.isLength(data.Logon, { min: 7, max: 7 })) {
    errors.Logon = 'Logon must be 7 characters';
  }

  if (validator.isEmpty(data.Password)) {
    errors.Password = 'Password is required';
  }

  if (!schema.validate(data.Password)) {
    errors.Password = 'Password must meet password requirements';
  }

  if (validator.isEmpty(data.Department)) {
    errors.Department = 'Department is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
