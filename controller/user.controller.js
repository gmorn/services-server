const fs = require('fs')
const db = require('../bd')
const path = require('path')

class UserControler {
    async userLogo (req, res) {
        const userLogoName = req.params.name 
        fs.readFile(`STORAGE/user_images/user_logo/${userLogoName}`, (err, data) => {
            if (err) console.log(err)
            res.end(data)
        });
    }
    async newUserLogo (req, res) {
        const { newLogo } = req.body
        // fs.readdir('test/', (err, files) => {
        //     if (err) throw err;
          
        //     for (const file of files) {
        //       fs.unlink(path.join('test/', file), err => {
        //         if (err) throw err;
        //       });
        //     }
        //   });
        // fs.readFile(`STORAGE/user_images/user_logo/${userLogoName}`, (err, data) => {
        //     if (err) console.log(err)
        //     res.end(data)
        // });
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
                firstName: newUser.rows[0].first_name,
                lastName: newUser.rows[0].last_name,
                email: newUser.rows[0].email,
                phoneNumber: newUser.rows[0].phone_number,
                role: newUser.rows[0].role,
                userLogo: newUser.rows[0].user_logo,
            }
            res.json(user)
        } else {
            res.status(400).send('Not Found')
        }
    }
    async owner (req, res) {
        const {id} = req.body
        await db.query(`UPDATE "user" 
        SET name = 'owner' WHERE id = $1`, 
        [ id ])
    }
    async menage (req, res) {
        const {id} = req.body
        await db.query(`UPDATE "user" 
        SET name = 'menage' WHERE id = $1`, 
        [ id ])
    }
    async employee (req, res) {
        const {id} = req.body
        await db.query(`UPDATE "user" 
        SET name = 'employee' WHERE id = $1`, 
        [ id ])
    }
    async admin (req, res) {
        const {id} = req.body
        await db.query(`UPDATE "user" 
        SET name = 'admin' WHERE id = $1`, 
        [ id ])
    }
    async user (req, res) {
        const {id} = req.body
        await db.query(`UPDATE "user" 
        SET name = 'user' WHERE id = $1`, 
        [ id ])
    }
}

module.exports = new UserControler()