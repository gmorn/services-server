const Router = require('express')
const router = new Router()
const userController = require('../controller/user.controller')
const multer = require('multer')
const randomstring = require("randomstring");


const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, 'test/')
    },
    filename: (req, file, callback) => {
        const name = file.originalname
        const extension = name.match(/\.([0-9a-z]+)(?:[\?#]|$)/i)[1];
        const fileName = `${randomstring.generate(10)}.${extension}`
        callback(null, fileName)
    }
})

const upload = multer({ storage:storage });

router.put('/user/role', userController.newRole)

router.post('/user/login', userController.login)
router.post('/user/registration', userController.registration)
router.get('/user/logo/:name', userController.userLogo)
router.post('/user/logo', upload.any(), userController.newUserLogo)

module.exports = router 