var express = require('express');
const { verifyCSRFToken } = require('../auth/csrf_protection');
const { validate, login } = require('../controllers/loginController');
var router = express.Router();

router.route('/')
    .post(verifyCSRFToken,validate('login'),login)

module.exports = router