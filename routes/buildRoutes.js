const { Router } = require('express')

const buildController = require('../controllers/buildController')

const router = Router()


router.post('/createbuild', buildController.createbuild)
router.post('/getshort', buildController.getshort)
router.post('/getlocation', buildController.getlocation)
router.get('/getall', buildController.getall)


module.exports = router