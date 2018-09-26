const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateBlock(data) {
  let errors = {};

  if (Validator.isEmpty(data)) {
    errors.body = "The body of the block cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
