const Validator = require("validator");
const isEmpty = require("./isEmpty");

module.exports = function validateBlock(data) {
  let errors = {};

  let { body } = data;
  console.log("BODY---------:", typeof body);

  body = !isEmpty(body) ? body : "";
  console.log("BODY AFTER---------:", typeof body);
  if (Validator.isEmpty(body)) {
    errors.body = "The body of the block cannot be empty";
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};
