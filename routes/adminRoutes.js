const { Router } = require('express')

const userController = require('../controllers/adminController')

const router = Router()

router.post('/adminlogin', userController.adminlogin_post)
router.post('/adminsignup', userController.adminsignup_post)

module.exports = router