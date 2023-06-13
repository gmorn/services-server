const Router = require('express')
const router = new Router()
const serviceController = require('../controller/service.controller')
const multer = require('multer')
const randomstring = require("randomstring");

const header = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'STORAGE/service_images/header/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        const extension = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        const fileName = `${randomstring.generate(10)}.${extension}`
        callback(null, fileName)
    }
})

const uploadHeader = multer({ storage:header });

const cartLogo = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'STORAGE/service_images/logo/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        const extension = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        const fileName = `${randomstring.generate(10)}.${extension}`
        callback(null, fileName)
    }
})

const uploadCartLogo = multer({ storage:header });

router.post('/service', serviceController.createService) //создание
router.get('/service/:id', serviceController.getServiceById) //получение конкретной по id
// router.get('/service', serviceController.getServiceByCategory) //получение по категории
/router.get('/service/org/:id', serviceController.getServiceByOrganization) //получение по огранизации
router.put('/service', serviceController.updateService) //ищменение данных
router.delete('/service/:id', serviceController.deleteService) //удаление услуги
router.put('/service/new-header/:id', uploadHeader.any(), serviceController.newServiceHeader)
router.get('/service/header/:name', serviceController.header)
router.post('/service/description', serviceController.newDescription)
router.put('/service/new-cart-logo/:id', uploadCartLogo.any(), serviceController.newCartLogo)
router.get('/service/cart-logo/:name', serviceController.header)


module.exports = router