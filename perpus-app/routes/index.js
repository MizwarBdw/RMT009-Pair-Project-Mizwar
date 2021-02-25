const express = require('express')
const Controller = require('../controllers/user_controller')
const router = express.Router()
const userRouter = require('./user_router')
const bookRouter = require('./bookRouter')

router.get('/', Controller.home)

router.get('/login', Controller.getLogin)
router.post('/login', Controller.postLogin)

router.get('/logout', Controller.logout)


router.get('/failed', Controller.failed)

router.use('/users', userRouter)
router.use('/books', bookRouter)

module.exports = router