const Router = require('express')
const router = new Router()
const orgController = require('../controller/organization.controller')

router.post('/organization', orgController.createOrg)
router.get('/organization', orgController.getOrg)
router.get('/organization/:id', orgController.getOneOrg)
router.put('/organization', orgController.updateOrg)
router.delete('/organization/:id', orgController.deleteOrg)


module.exports = router