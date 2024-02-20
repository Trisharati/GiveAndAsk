const { body } = require("express-validator");

const loginValidation = [
  body("phone").not().isEmpty().withMessage("*Please enter phone number"),
  
  body("password").not().isEmpty().withMessage("*Please enter password"),
  // .isLength({min:6}).withMessage('*Password length should be minimum 6')
];

const updateValidation = [
  body("mail").isEmail().withMessage("*Invalid email format"),

  body("phone")
    .custom((value) => {
      console.log("val", value);
      if (/\D/.test(value)) {
        throw new Error("*Only numbers are allowed");
      }
      if (value.length < 10) {
        throw new Error("*Phone number should be 10 digits")
      }
      return true;
    }),
  body("business_name")
    .isLength({ min: 5 })
    .withMessage("*Business name should be miminum 5 characters"),

  body("category").isLength({ min: 5 }).withMessage("*Category should be miminum 5 characters"),
  body("address").isLength({ min: 5 }).withMessage("*Address should be miminum 5 characters")

  
  // body('password').not().isEmpty().withMessage('*Please enter password')
  // .isLength({min:6}).withMessage('*Password length should be minimum 6')
];

const giveValidation = [
  body("give")
    .not()
    .isEmpty()
    .withMessage("*Field cannot be blank")
    .custom((value) => {
      // Check if the value contains only numeric characters
      if (/\d+$/.test(value)) {
        throw new Error("Only numbers are not allowed");
      }
      if (value.length < 5) {
        throw new Error("*Giveable should be minimum 5 characters")
      }
      // Indicates that the validation succeeded
      return true;
    }),
];
const askValidation = [
  body("ask")
    .not()
    .isEmpty()
    .withMessage("*Field cannot be blank")
    .custom((value) => {
      // Check if the value contains only numeric characters
      if (/\d+$/.test(value)) {
        throw new Error("Only numbers are not allowed");
      }
      if (value.length < 5) {
        throw new Error("*Ask item should be minimum 5 characters")
      }
      // Indicates that the validation succeeded
      return true;
    }),
];

module.exports = {
  loginValidation,
  updateValidation,
  giveValidation,
  askValidation,
};

// ^ asserts the start of the string.
// \d is a shorthand character class that matches any digit (0-9).
// + quantifier means "one or more times", so \d+ matches one or more digits.
// $ asserts the end of the string.
