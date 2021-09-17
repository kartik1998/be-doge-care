require('dotenv').config();
require('module-alias/register');
require('./config');

const app = require('./app');

module.exports = {
  app,
};
