const { validationResult,check } = require("express-validator");
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy

const validate = (method) => {
    switch (method) {
        case 'login': {
            return [
                check('email')
                .notEmpty().withMessage('Email Field is required')
                .isEmail().withMessage('Input must be a valid email address'),


                check('password')
                .notEmpty().withMessage('Password is required')
            ]
        }
        break;
    
        default:
            break;
    }
}

const login = async (req,res,next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.json({ errors: errors.formatWith(error => error.msg).mapped() });
        return;
    }
    else{
        passport.authenticate('local', (err,user,info) => {
            if(err){
                return next(err);
            }
            if(!user){
                return res.json({errors:{email:'Incorrect Email or Password'}})
            }

            // return res.status(200).json({ message: 'Logged In Successfully', user: user });

            req.login(user, (err) => {
                if (err) {
                    return next(err);
                }
                return res.status(200).json({ message: 'Logged In Successfully', user: user });
            });
        })(req,res,next);
    }
}

const logoutuser = (req,res,next) => {
    req.logout (function(err) {
        if(err){
            return next(err)
        }
    })
    return res.status(200).json({message:"Logged Out"})
}


module.exports = {
    validate,
    login,
    logoutuser
}