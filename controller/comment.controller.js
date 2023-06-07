const db = require('../bd')

class CommentControler {
    // создание комментария
    async createCommentForService () {
        const {content, service_id, user_id} = req.body
        const newComment = await db.query(`INSERT INTO "comment_service" 
            (service_id, user_id, user_id)
            values ($1, $2, $3) RETURNING *`, [service_id, user_id, content])
            res.json(newComment.rows[0])
    }
    async createCommentForOrg () {
        const {content, organization_id, user_id} = req.body
        const newComment = await db.query(`INSERT INTO "comment_organization" 
            (organization_id, user_id, user_id)
            values ($1, $2, $3) RETURNING *`, [organization_id, user_id, content])
            res.json(newComment.rows[0])
    }

    // удаление комментария
    async deleteCommentForService () {
        const id = req.params.id
        await db.query(`DELETE FROM "comment_service" WHERE id = $1`, [id])
        res.json(true)
    }
    async deleteCommentForOrg () {
        const id = req.params.id
        await db.query(`DELETE FROM "comment_organization" WHERE id = $1`, [id])
        res.json(true)
    }

    // изменение комментария
    async updateCommentForService () {
        const { id, content } = req.body
        const comment = await db.query(`UPDATE "comment_service" 
        SET content = $1 WHERE id = $2 RETURNING *`, 
        [ content, id ])
        res.json(org.rows[0])
    }
    async updateCommentForOrg () {
        const { id, content } = req.body
        const comment = await db.query(`UPDATE "comment_organization" 
        SET content = $1 WHERE id = $2 RETURNING *`, 
        [ content, id ])
        res.json(comment.rows[0])
    }

    // получение комментариев к 
    async getCommentForService () {
        const { id } = req.body
        const comment = await db.query(`SELECT * FROM "comment_service" WHERE service_id = $1`, [id])
        res.json(comment.rows)
    }
    async getCommentForOrg () {
        const { id } = req.body
        const comment = await db.query(`SELECT * FROM "comment_organization" WHERE organization_id = $1`, [id])
        res.json(comment.rows)
    }

    // получение комментариев пользователя
    async getCommentForServiceByUser () {
        const { id } = req.body
        const comment = await db.query(`SELECT * FROM "comment_service" WHERE user_id = $1`, [id])
        res.json(comment.rows)
    }
    async getCommentForOrgByUser () {
        const { id } = req.body
        const comment = await db.query(`SELECT * FROM "comment_organization" WHERE user_id = $1`, [id])
        res.json(comment.rows)
    }
}

module.exports = new CommentControler()