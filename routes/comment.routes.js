const Router = require('express')
const router = new Router()
const commentController = require('../controller/comment.controller')

// коментарии для услуг
router.post('/comment/service', commentController.createCommentForService) // создание комментария к услуге
router.get('/comment/service', commentController.getCommentForService) // получение комментариев к услуге
router.get('/comment/service/:id', commentController.getCommentForServiceByUser) // получение комментариев пользователя по id
router.put('/comment/service', commentController.updateCommentForService) // изменение комментария к услуге
router.delete('/comment/service/:id', commentController.deleteCommentForService) // удаление комментария к услуге

//коментарии для организаций 
router.post('/comment/org', commentController.createCommentForOrg) // создание комментария к организации
router.get('/comment/org', commentController.getCommentForOrg) // получение комментариев к организации
router.get('/comment/org/:user_id', commentController.getCommentForOrgByUser) // получение комментариев пользователя по id
router.put('/comment/org', commentController.updateCommentForOrg) // изменение комментария к оранизации
router.delete('/comment/org/:id', commentController.deleteCommentForOrg) // удаление комментария к организации

module.exports = router