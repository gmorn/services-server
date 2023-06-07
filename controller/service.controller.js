const db = require('../bd')

class ServiceControler {
    async createService (req, res) {
        const {name, organization_id} = req.body
        try {
            const check = await db.query(`SELECT * FROM "service" WHERE name = $1`, [name])
            if (check.rows.length === 0) {
                const newService = await db.query(`INSERT INTO "service" (name, organization_id)
                values ($1, $2) RETURNING *`, [name, organization_id])
                res.json(newService.rows[0])
            } else {
                res.json('имя услуги уже занято')
            }
        } catch (error) {
            res.json('ошибка')
        }
    }
    async deleteService (req, res) {
        const id = req.params.id
        const service = await db.query(`DELETE FROM "service" WHERE id = $1`, [id])
        res.json(service.rows[0])
    }
    async updateService (req, res) {
        const { id, name } = req.body
        const service = await db.query(`UPDATE "service" 
        SET name = $1 WHERE id = $2 RETURNING *`, 
        [ name, id ])
        res.json(service.rows[0])
    }
    async getServiceByCategory (req, res) {
        const { categoryId} = req.body
        const service = await db.query(`SELECT * FROM "service" WHERE category_id = $1`, [categoryId])
        res.json(service.rows[0])
    }
    async getServiceById (req, res) {
        const id = req.params.id
        const service = await db.query(`SELECT * FROM "service" WHERE id = $1`, [id])
        res.json(service.rows[0])
    }
    async getServiceByOrganization (req, res) {
        const {organizationId} = req.body
        const service = await db.query(`SELECT * FROM "service" WHERE organization_id = $1`, [organizationId])
        res.json(service.rows[0])
    }
}

module.exports = new ServiceControler()