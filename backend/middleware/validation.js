const {body} = require('express-validator')

const loginValidation=[
    body('user_name').not().isEmpty().withMessage('*Please enter user name')
    .not().matches(/[0-9]/)
    .withMessage("*Name should be string"),
 
    body('password').not().isEmpty().withMessage('*Please enter password')
    // .isLength({min:6}).withMessage('*Password length should be minimum 6')
]

const updateValidation=[
    body('mail').not().isEmpty().withMessage('*Please enter email')
    .isEmail().withMessage('*Invalid email format'),

    body('address').not().isEmpty().withMessage('*Please enter address'),
    
    body('category').not().isEmpty().withMessage('*Please enter category'),

    body('business_name').not().isEmpty().withMessage('*Please enter business_name'),
   
    // body('password').not().isEmpty().withMessage('*Please enter password')
    // .isLength({min:6}).withMessage('*Password length should be minimum 6')
]

const giveValidation=[
    body('give').not().isEmpty().withMessage('*Field cannot be blank')
    .custom(value => {
        // Check if the value contains only numeric characters
        if (/^\d+$/.test(value)) {
            throw new Error('Only numbers are not allowed');
        }
        // Indicates that the validation succeeded
        return true;
    })
    
]
const askValidation=[
    body('ask').not().isEmpty().withMessage('*Field cannot be blank') 
]

module.exports = {loginValidation, giveValidation, askValidation}

const { validationResult } = require('express-validator');


// ^ asserts the start of the string.
// \d is a shorthand character class that matches any digit (0-9).
// + quantifier means "one or more times", so \d+ matches one or more digits.
// $ asserts the end of the string.
