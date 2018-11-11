const validator = require('validator');
const isEmpty = require('./is-empty');
const schema = require('../config/password');

module.exports = function validateCreateUserInput(data) {
  let errors = {};
  let d = JSON.parse(data.NewUser); // need because 'data' is a string

  console.log('----------------------------------------------');
  console.log(d[0].Details.FirstName);
  console.log(d[0].Details.LastName);
  console.log(d[0].Details.Manager);
  console.log(d[0].Details.Logon);
  console.log(d[0].Details.Password);
  console.log(d[0].Details.Department);
  console.log(d[0].Details.isManager);
  console.log(d[0].Details.isActive);
  console.log('----------------------------------------------');
  errors.Ironic = 'To keep from writing to db.';

  /*
  // make data
  data.FirstName = isEmpty(data.NewUser[0].Details.FirstName)
    ? ''
    : data.NewUser[0].Details.FirstName;

  data.LastName = isEmpty(data.NewUser[0].Details.LastName)
    ? ''
    : data.NewUser[0].Details.LastName;

  data.Logon = isEmpty(data.NewUser[0].Details.Logon)
    ? ''
    : data.NewUser[0].Details.Logon;

  data.Password = isEmpty(data.NewUser[0].Details.Password)
    ? ''
    : data.NewUser[0].Details.Password;

  data.Manager = isEmpty(data.NewUser[0].Details.Manager)
    ? ''
    : data.NewUser[0].Details.Manager.toString(10); // make string

  data.Department = isEmpty(data.NewUser[0].Details.Department)
    ? ''
    : data.NewUser[0].Details.Department.toString(10); // make string

  // do the validation
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

  if (validator.isEmpty(data.Manager)) {
    errors.Manager = 'Manager is required';
  }

  if (validator.isEmpty(data.Department)) {
    errors.Department = 'Department is required';
  }
  */

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
