const express = require('express');
const morgan = require('morgan');
const codes = require('./lib/statusCodes');

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/ping', (_, res) => res.status(codes.SUCCESS).send('pong'));
module.exports = app;
