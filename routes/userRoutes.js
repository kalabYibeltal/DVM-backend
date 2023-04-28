const { Router } = require('express')

const userController = require('../controllers/userController')

const router = Router()

router.post('/balance', userController.balance_post)
router.post('/updatebalance', userController.updatebalance_post)
router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)


module.exports = router