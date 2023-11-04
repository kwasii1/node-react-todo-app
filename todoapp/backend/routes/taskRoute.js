var express = require('express');
const { verifyCSRFToken } = require('../auth/csrf_protection');
const { store, validate, index, view, destroy, update } = require('../controllers/taskController');

var router = express.Router()

router.route('/add').post(verifyCSRFToken,validate('addtask'),store)
router.route('/').get(index)
router.route('/view/:taskid').get(view)
router.route('/update/:taskid').post(verifyCSRFToken,validate('updateTask'),update)
router.route('/delete/:taskid').get(destroy)

module.exports = router