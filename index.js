require('dotenv').config();
require('module-alias/register');
require('./config');
const { SOLANA_KEY_GEN_URL } = require('nconf').get();

const app = require('./app');

console.log(`solana key generation url: ${SOLANA_KEY_GEN_URL}`);

module.exports = {
  app,
};
