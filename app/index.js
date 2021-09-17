const express = require('express');
const morgan = require('morgan');
const routes = require('./routes');
const codes = require('./lib/statusCodes');
require('./database/connection')();

const app = express();
app.use(express.json());
app.use(morgan('dev'));

app.get('/ping', (_, res) => res.status(codes.SUCCESS).send('pong'));
app.use('/api', routes);

module.exports = app;
