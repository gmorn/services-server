const express = require('express')
const userRouter = require('./routes/user.routes')
const orgRouter = require('./routes/organization.routes')
const serviceRouter = require('./routes/service.routes')
const commentRouter = require('./routes/comment.routes')
const cors = require('cors');
const fs = require('fs');
const multer = require('multer')
const bodyParser = require('body-parser');

const PORT = process.env.PORT || 8080

const app = express()


app.use(cors({
  origin: 'http://localhost:3000'
}));

app.use(bodyParser.json());

// получение пользователя по дефолту
app.get('/user_logo', (req, res) => {
  fs.readFile('STORAGE/user_images/default_logo/default_user_logo.png', (err, data) => {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'image/png'});
    res.end(data);
  });
});

app.use(express.json())
app.use('/api', userRouter)
app.use('/api', orgRouter)
app.use('/api', serviceRouter)
app.use('/api', commentRouter)


app.listen(PORT, () => console.log('server start'))
