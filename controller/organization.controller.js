const db = require('../bd')

class OrganizationControler {
    async createOrg (req, res) {
        const {name, user_id} = req.body
        try {
            const check = await db.query(`SELECT * FROM "organization" WHERE owner_id = $1`, [user_id])
            if (check.rows.length === 0) {
                const newOrg = await db.query(`INSERT INTO "organization" (name, owner_id)
                values ($1, $2) RETURNING *`, [name, user_id])
                res.json(newOrg.rows[0])
            } else {
                res.json('вы уже создали организацию')
            }
        } catch (error) {
            res.json('ошибка')
        }

        
    }
    async getOrg (req, res) {
        const org = await db.query(`SELECT * FROM "organization"`)
        res.json(org.rows)
    }
    async getOneOrg (req, res) {
        const id = req.params.id
        const org = await db.query(`SELECT * FROM "organization" WHERE id = $1`, [id])
        res.json(org.rows[0])
    }
    async updateOrg (req, res) {
        const { id, name } = req.body
        const org = await db.query(`UPDATE "organization" 
        SET name = $1 WHERE id = $2 RETURNING *`, 
        [ name, id ])
        res.json(org.rows[0])
    }
    async deleteOrg (req, res) {
        const id = req.params.id
        const org = await db.query(`DELETE FROM "organization" WHERE id = $1`, [id])
        res.json(org.rows[0])
    }
}

module.exports = new OrganizationControler()