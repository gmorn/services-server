const db = require('../bd')
const fs = require('fs')
const path = require('path');


class OrganizationControler {
    async createOrg (req, res) {
        const {name, user_id} = req.body

        const user = await db.query(`SELECT * FROM "organization" WHERE name = $1`, [name])
        if (user.rows.length == 0) {
            const newOrg = await db.query(`INSERT INTO "organization" (name, owner_id)
            values ($1, $2) RETURNING *`, [name, user_id])
            res.json(newOrg.rows[0].id)
        } else { 
            res.status(400).send('Not Found') 
        }
    }
    async getOrg (req, res) {
        const org = await db.query(`SELECT * FROM "organization"`)
        res.json(org.rows)
    }
    async getOneOrg (req, res) {
        const id = req.params.id
        const org = await db.query(`SELECT * FROM "organization" WHERE id = $1`, [id])
        const resOrg = {
            id: org.rows[0].id,
            name: org.rows[0].name,
            header: org.rows[0].header,
            description: org.rows[0].description
        }
        res.json(resOrg)
    }
    async getOrgByUserId (req, res) {
        const id = req.params.id
        const org = await db.query(`SELECT * FROM "organization" WHERE owner_id = $1`, [id])
        if (org.rows.length !== 0) {
            res.json(org.rows[0].id)
        }
    }
    async deleteOrg (req, res) {
        const id = req.params.id
        const org = await db.query(`DELETE FROM "organization" WHERE id = $1`, [id])
        res.json(org.rows[0])
    }

    async newOrgHeader (req, res) {
        const id = req.params.id
        
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send('Файл не был отправлен.');
            }
            const uploadedFile = req.files[0];
            // уаление старого файла

            // функция для получения имени фйла из строки пути файла
            function getFileNameFromURL(url) {
                var parts = url.split('/');
                var fileNameWithExtension = parts[parts.length - 1];
                var fileName = fileNameWithExtension;
                
                return fileName;
            }
            // функция удаления
            function deleteFileByName(folderPath, fileName) {
                const filePath = path.join(folderPath, fileName);
            
                fs.access(filePath, fs.constants.F_OK, (err) => {
                    if (err) {
                        console.error('Файл не существует:', err);
                        return;
                    }
            
                    fs.unlink(filePath, (error) => {
                        if (error) {
                            console.error('Произошла ошибка при удалении файла:', error);
                            return;
                        }
            
                        console.log('Файл успешно удален');
                    });
                });
            }

            const oldOrg = await db.query(`SELECT * FROM "organization" 
            WHERE "id" = $1`, [ id ])

            if (oldOrg.rows[0].header !== null) {
                const fileName = getFileNameFromURL(oldOrg.rows[0].header)
            
                const folderPath = 'STORAGE/organization_images/header/';
                
                deleteFileByName(folderPath, fileName);
            }
            // добавлени нового файла 

            
            const fileLink = `http://localhost:8080/api/organization/header/${uploadedFile.filename}`
            const newOrg = await db.query(`UPDATE "organization" 
                SET header = $1
                WHERE id = $2`, 
                [ fileLink, id ])
            res.status(200).json(newOrg.rows[0])
        } catch (error) {
            console.error(error);
            res.status(500).send('Произошла ошибка при загрузке файла.');
        }
    }

    async header (req, res) {
        const header = req.params.name 
        fs.readFile(`STORAGE/organization_images/header/${header}`, (err, data) => {
            if (err) console.log(err)
            res.end(data)
        });
    }

    async newDescription (req, res) {
        const { description, id} = req.body;
        db.query(`UPDATE "organization" 
            SET description = $1
            WHERE id = $2 RETURNING *`, 
            [ description, id ])
    }
}

module.exports = new OrganizationControler()