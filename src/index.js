const express = require('express');

const cors = require('cors');
require('dotenv').config();

const userRouter = require('./routers/user.routes.js');
const postRouter = require('./routers/post.routes.js');

const app = express();

// Configurar CORS como middleware global
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World');
});

app.use('/api/user', userRouter);
app.use('/api/post', postRouter);

app.listen(3000, () => {
  console.log('Server on port 3000');
});