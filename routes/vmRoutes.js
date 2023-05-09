const { Router } = require('express')

const vmController = require('../controllers/vmController')

const router = Router()


router.post('/createmachine_post', vmController.createmachine_post)
router.post('/buyitem_post', vmController.buyitem_post)
router.post('/restockitem_post', vmController.restockitem_post)
router.post('/restockitem_post', vmController.restockitem_post)
router.post('/machinelogin', vmController.machinelogin)
router.get('/getall', vmController.getall)
router.post('/getone', vmController.getone)
router.post('/edititem', vmController.edititem)

module.exports = router