const { Router } = require('express')

const userController = require('../controllers/userController')

const router = Router()

// router.get('/balance/:id', userController.balance_get)
router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)


module.exports = router