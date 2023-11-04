var express = require('express')
const { indexpage, validation, store } = require('../controllers/registerController')
const { verifyCSRFToken } = require('../auth/csrf_protection')
const { protectRoute } = require('../auth/protect')
var router = express.Router()

router.route('/csrfToken')
    .get(indexpage)
router.route('/register')
    .post(verifyCSRFToken,validation('register'),store)
router.route('/auth')
    .get(protectRoute)

module.exports = router