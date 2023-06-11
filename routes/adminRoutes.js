const { Router } = require('express')

const userController = require('../controllers/adminController')

const router = Router()

router.post('/adminlogin', userController.adminlogin_post)
router.post('/adminsignup', userController.adminsignup_post)
router.post('/verify', userController.verify)
router.get('/userdata', userController.userdata)
router.get('/machinedata', userController.machinedata)

module.exports = router