const validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = function validateUpdateUserInput(data) {
  let errors = {};

  // make data all strings
  data.ID = isEmpty(data.Details.ID) ? '' : data.Details.ID.toString(10); // make string

  data.FirstName = isEmpty(data.Details.FirstName)
    ? ''
    : data.Details.FirstName;

  data.LastName = isEmpty(data.Details.LastName) ? '' : data.Details.LastName;

  data.Manager = isEmpty(data.Details.Manager)
    ? ''
    : data.Details.Manager.toString(10); // make string

  data.Department = isEmpty(data.Details.Department)
    ? ''
    : data.Details.Department.toString(10); // make string

  // do the validation
  if (validator.isEmpty(data.ID)) {
    errors.ID = 'ID is required';
  }

  if (validator.isEmpty(data.FirstName)) {
    errors.FirstName = 'First name is required';
  }

  if (!validator.isLength(data.FirstName, { min: 2, max: 30 })) {
    errors.FirstName = 'First name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.LastName)) {
    errors.LastName = 'Last name is required';
  }

  if (!validator.isLength(data.LastName, { min: 2, max: 30 })) {
    errors.LastName = 'Last name must be between 2 and 30 characters';
  }

  if (validator.isEmpty(data.Manager)) {
    errors.Manager = 'Manager is required';
  }

  if (validator.isEmpty(data.Department)) {
    errors.Department = 'Department is required';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};

// const validator = require('validator');
// const isEmpty = require('./is-empty');

// module.exports = function validateUpdateUserInput(data) {
//   let errors = {};

//   // make data all strings
//   data.ID = isEmpty(data.UpdatedUser[0].Details.ID)
//     ? ''
//     : data.UpdatedUser[0].Details.ID.toString(10); // make string

//   data.FirstName = isEmpty(data.UpdatedUser[0].Details.FirstName)
//     ? ''
//     : data.UpdatedUser[0].Details.FirstName;

//   data.LastName = isEmpty(data.UpdatedUser[0].Details.LastName)
//     ? ''
//     : data.UpdatedUser[0].Details.LastName;

//   data.Manager = isEmpty(data.UpdatedUser[0].Details.Manager)
//     ? ''
//     : data.UpdatedUser[0].Details.Manager.toString(10); // make string

//   data.Department = isEmpty(data.UpdatedUser[0].Details.Department)
//     ? ''
//     : data.UpdatedUser[0].Details.Department.toString(10); // make string

//   // do the validation
//   if (validator.isEmpty(data.ID)) {
//     errors.ID = 'ID is required';
//   }

//   if (validator.isEmpty(data.FirstName)) {
//     errors.FirstName = 'First name is required';
//   }

//   if (!validator.isLength(data.FirstName, { min: 2, max: 30 })) {
//     errors.FirstName = 'First name must be between 2 and 30 characters';
//   }

//   if (validator.isEmpty(data.LastName)) {
//     errors.LastName = 'Last name is required';
//   }

//   if (!validator.isLength(data.LastName, { min: 2, max: 30 })) {
//     errors.LastName = 'Last name must be between 2 and 30 characters';
//   }

//   if (validator.isEmpty(data.Manager)) {
//     errors.Manager = 'Manager is required';
//   }

//   if (validator.isEmpty(data.Department)) {
//     errors.Department = 'Department is required';
//   }

//   return {
//     errors,
//     isValid: isEmpty(errors)
//   };
// };