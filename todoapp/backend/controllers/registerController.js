const { check, validationResult } = require("express-validator")
const User = require("../models/user")



const indexpage = (req,res) => {
    res.json({csrfToken:res.locals.csrfToken})
}

const validation = (method) => {
    switch (method) {
        case 'register': {
            return [
                check('fname').notEmpty().withMessage("Field cannot be blank")
                .isAlphanumeric(),


                check('lname').notEmpty().withMessage("Field cannot be blank")
                .isAlphanumeric(),


                check('email').notEmpty().withMessage("Field cannot be blank")
                .custom(async value=> {
                    const email = await User.findByEmail(value)
                    if(email){
                        throw new Error("Email already used")
                    }
                }),

                check('password')
                .notEmpty().withMessage("Password Can't be empty")
                .isLength({min: 8}).withMessage("Password should be more than 8 charaters")
                .escape()
                .trim(),
                check('confirm_password').custom((value,{req}) => {
                    if(value !== req.body.password){
                        throw new Error("Passwords do not match")
                    }
                    return true;
                })
            ]
        }
            
            break;
    
        default:
            break;
    }
}

module.exports = {
    indexpage,
    validation
}