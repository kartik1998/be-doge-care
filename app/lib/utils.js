const crypto = require('crypto');

const computeSHA256Hash = (plainText) => crypto.createHmac('sha256', plainText).digest('hex');

module.exports = { computeSHA256Hash };
