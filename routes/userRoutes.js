const { Router } = require('express')

const authController = require('../controllers/userController')

const router = Router()

router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)


module.exports = router