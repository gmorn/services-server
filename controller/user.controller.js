const fs = require('fs')
const db = require('../bd')

class UserControler {
    async userLogo (req, res) {
        const userLogoName = req.params.name 
        fs.readFile(`STORAGE/user_images/${userLogoName}`, (err, data) => {
            if (err) console.log(err)
            res.end(data)
        });
    }
    async newUserLogo (req, res) {

    }
    async login (req, res) {
        const {email, password} = req.body
        const user = await db.query(`SELECT * FROM "user" WHERE email = $1`, [email])
        if (user.rows.length !== 0) {
            if (password === user.rows[0].password) {
                res.json(user.rows[0])
            } else {
                res.status(404).send('Not Found')
            }
        } else {
            res.status(400).send('Not Found')
        }
    }
    async registration (req, res) {
        const {firstName, lastName, phoneNumber, email, password} = req.body

        const check = await db.query(`SELECT * FROM "user" WHERE "email" = $1`, [email])

        if (check.rows.length === 0) {

            const newUser = await db.query(`INSERT INTO "user" 
            (first_name, last_name, phone_number, email, password, user_logo, role) 
            values ($1, $2, $3, $4, $5, 
                'http://localhost:8080/api/user/logo/default_user_logo.png', 'user') RETURNING *`, 
            [firstName, lastName, phoneNumber, email, password])
            const user = {
                id: newUser.rows[0].id,
                first_name: newUser.rows[0].first_name,
                last_name: newUser.rows[0].last_name,
                email: newUser.rows[0].email,
                phone_number: newUser.rows[0].phone_number,
                role: newUser.rows[0].role,
                user_logo: newUser.rows[0].user_logo,
            }
            res.json(user)
        } else {
            res.status(400).send('Not Found')
        }
    }
    async newRole (req, res) {
        const { id, role } = req.body
        const newUser = await db.query(`UPDATE "user" 
        SET role = $1 WHERE id = $2 RETURNING *`, 
        [ role, id ])
        const user = {
            id: newUser.rows[0].id,
            first_name: newUser.rows[0].first_name,
            last_name: newUser.rows[0].last_name,
            email: newUser.rows[0].email,
            phone_number: newUser.rows[0].phone_number,
            role: newUser.rows[0].role,
            user_logo: newUser.rows[0].user_logo,
        }
        res.json(user)
    }
}

module.exports = new UserControler()