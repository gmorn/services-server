const db = require('../bd')
const fs = require('fs')
const path = require('path');

class ServiceControler {
    async createService (req, res) {
        const { id } = req.body
        try {
            // const check = await db.query(`SELECT * FROM "service" WHERE name = $1`, [name])
            // if (check.rows.length === 0) {
                const newService = await db.query(`INSERT INTO "service" ( organization_id )
                values ( $1 ) RETURNING *`, [ id ])
                res.json(newService.rows[0])
            // } else {
            //     res.json('имя услуги уже занято')
            // }
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
        const id = req.params.id
        const services = await db.query(`
            SELECT * FROM "service" 
            WHERE "organization_id" = $1`, [ id ])
        res.json(services.rows)
    }

    async newServiceHeader (req, res) {
        const id = req.params.id
        
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send('Файл не был отправлен.');
            }
            const uploadedFile = req.files[0];
            // уаление старого файла

            // функция для получения имени фйла из строки пути файла
            function getFileNameFromURL(url) {
                if (url === null) {
                    return null;
                }
            
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

            const oldService = await db.query(`SELECT * FROM "service" 
            WHERE "id" = $1`, [ id ])

            if (oldService.rows[0].page_logo !== null) {
                const fileName = getFileNameFromURL(oldService.rows[0].page_logo)
            
                const folderPath = 'STORAGE/service_images/header/';
                
                deleteFileByName(folderPath, fileName);
            }
            // добавлени нового файла 

            
            const fileLink = `http://localhost:8080/api/service/header/${uploadedFile.filename}`
            const newService = await db.query(`
                UPDATE "service" 
                SET page_logo = $1
                WHERE id = $2`, 
                [fileLink, id])
            res.status(200).json(newService.rows[0])
        } catch (error) {
            console.error(error);
            res.status(500).send('Произошла ошибка при загрузке файла.');
        }
    }

    async header ( req, res ) {
        const header = req.params.name 
        fs.readFile(`STORAGE/service_images/header/${header}`, (err, data) => {
            if (err) console.log(err)
            res.end(data)
        });
    }

    async newDescription ( req, res ) {
        const { description, id} = req.body;
        db.query(`UPDATE "service" 
            SET description = $1
            WHERE id = $2 RETURNING *`, 
            [ description, id ])
    }

    async newCartLogo ( req, res ) {
        const id = req.params.id
        
        try {
            if (!req.files || req.files.length === 0) {
                return res.status(400).send('Файл не был отправлен.');
            }
            const uploadedFile = req.files[0];
            // уаление старого файла

            // функция для получения имени фйла из строки пути файла
            function getFileNameFromURL(url) {
                if (url === null) {
                    return null;
                }
            
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

            const oldService = await db.query(`SELECT * FROM "service" 
            WHERE "id" = $1`, [ id ])

            if (oldService.rows[0].cart_logo !== null) {
                const fileName = getFileNameFromURL(oldService.rows[0].cart_logo)
            
                const folderPath = 'STORAGE/service_images/logo/';
                
                deleteFileByName(folderPath, fileName);
            }
            // добавлени нового файла 

            
            const fileLink = `http://localhost:8080/api/service/cart-logo/${uploadedFile.filename}`
            const newService = await db.query(`
                UPDATE "service" 
                SET cart_logo = $1
                WHERE id = $2`, 
                [fileLink, id])
            res.status(200).json(newService.rows[0])
        } catch (error) {
            console.error(error);
            res.status(500).send('Произошла ошибка при загрузке файла.');
        }
    }

    async cartLogo ( req, res ) {
        
    }
}

module.exports = new ServiceControler()