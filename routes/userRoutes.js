const { Router } = require('express')

const userController = require('../controllers/userController')

const router = Router()

router.post('/balance', userController.balance_post)
router.post('/updatebalance', userController.updatebalance_post)
router.post('/signup', userController.signup_post)
router.post('/login', userController.login_post)
router.post('/history', userController.history)


module.exports = router