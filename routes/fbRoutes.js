const { Router } = require('express')

const fbController = require('../controllers/fbController')

const router = Router()


router.post('/createfb', fbController.createfb)
router.get('/getaverage', fbController.getaverage)
router.get('/getall', fbController.getall)


module.exports = router