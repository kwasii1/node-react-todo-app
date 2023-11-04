var express = require('express');
const { logoutuser } = require('../controllers/loginController');
var router = express.Router()

router.route('/').post(logoutuser)

module.exports = router