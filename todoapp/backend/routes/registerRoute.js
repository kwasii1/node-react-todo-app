var express = require('express')
const { indexpage, validation } = require('../controllers/registerController')
const { verifyCSRFToken } = require('../auth/csrf_protection')
var router = express.Router()

router.route('/csrfToken')
    .get(indexpage)
router.route('/register')
    .post(verifyCSRFToken,validation('register'))

module.exports = router