const Router = require('express')
const router = new Router()
const serviceController = require('../controller/service.controller')

router.post('/service', serviceController.createService) //создание
router.get('/service/:id', serviceController.getServiceById) //получение конкретной по id
// router.get('/service', serviceController.getServiceByCategory) //получение по категории
// router.get('/service', serviceController.getServiceByOrganization) //получение по огранизации
router.put('/service', serviceController.updateService) //ищменение данных
router.delete('/service/:id', serviceController.deleteService) //удаление услуги


module.exports = router