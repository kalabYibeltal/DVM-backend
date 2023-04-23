const { Router } = require('express')

const vmController = require('../controllers/vmController')

const router = Router()


router.post('/createmachine_post', vmController.createmachine_post)
router.post('/buyitem_post', vmController.buyitem_post)
router.post('/restockitem_post', vmController.restockitem_post)


module.exports = router