const express = require('express');
const { connectTOMongoDB } = require('./connection');
const urlRoute = require('./routes/url');

const app = express();

const PORT = 6003;

connectTOMongoDB("mongodb://localhost:27017/shortUrl")
  .then(() => console.log('MongoDB Connected'));

app.use(express.json());
app.use('/url', urlRoute);

app.listen(PORT, () => console.log(`Server started at PORT: ${PORT}`))
