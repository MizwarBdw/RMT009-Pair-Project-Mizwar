const express = require('express')
const Controller = require('../controllers/user_controller')
const router = express.Router()
const checkLogin = require('../middleware/checkLogin')
const isAdmin = require('../middleware/isAdmin')



router.get('/list', isAdmin, Controller.findAll)

router.get('/add', Controller.getAddUser)
router.post('/add', Controller.postAddUser)

// router.get('/:id/edit', Controller.getEditUser)
// router.post('/:id/edit', Controller.postEditUser)

router.get('/:id/delete', isAdmin, Controller.deleteUser)

module.exports = router