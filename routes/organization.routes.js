const Router = require('express')
const router = new Router()
const orgController = require('../controller/organization.controller')
const multer = require('multer')
const randomstring = require("randomstring");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'STORAGE/organization_images/header/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        const extension = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        const fileName = `${randomstring.generate(10)}.${extension}`
        callback(null, fileName)
    }
})

const upload = multer({ storage:storage });

router.post('/organization', orgController.createOrg)
router.get('/organization', orgController.getOrg)
router.get('/organization/:id', orgController.getOneOrg)
router.get('/organization/user/:id', orgController.getOrgByUserId)
router.delete('/organization/:id', orgController.deleteOrg)
router.put('/organization/new-header/:id', upload.any(), orgController.newOrgHeader)
router.get('/organization/header/:name', orgController.header)
router.post('/organization/description', orgController.newDescription)

module.exports = router