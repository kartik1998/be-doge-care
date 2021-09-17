const express = require('express');
const morgan = require('morgan');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/ping', (_, res) => res.status(200).send('pong'));
module.exports = app;
