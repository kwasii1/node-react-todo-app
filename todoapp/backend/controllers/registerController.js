const { check, validationResult } = require("express-validator")
const User = require("../models/user");
const bcrypt = require('bcrypt');
const crypto = require('crypto');



const indexpage = (req,res) => {
    return res.json({csrfToken:req.session.csrfToken})
}

const validation = (method) => {
    console.log("REACHED FORM VALIDATION");
    switch (method) {
        case 'register': {
            return [
                check('fname').notEmpty().withMessage("Field cannot be blank"),


                check('lname').notEmpty().withMessage("Field cannot be blank"),


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


const store = async (req,res) => {
    console.log("REACHED STORING USER");
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        res.json({ errors: errors.formatWith(error => error.msg).mapped() });
        return;
    }
    const uuid = crypto.randomUUID();
    const fname = req.body.fname;
    const lname = req.body.lname;
    const email = req.body.email;
    const password = req.body.password;
    bcrypt.hash(password, 10).then(async hash => {
        var hashed_password = hash;
        try {
            const user = await User.create({user_id:uuid,email:email,firstname:fname,lastname:lname,password:hashed_password});
            return res.status(200).json({ message: 'User created successfully', user: user });
        } catch (error) {
            res.status(500).json({ error: 'Internal server error' + error });
            return;
        }
    })

}

module.exports = {
    indexpage,
    validation,
    store
}