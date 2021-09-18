const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const { JWT_SECRET, JWT_EXPIRY } = require('nconf').get();

const computeSHA256Hash = (plainText) => crypto.createHmac('sha256', plainText).digest('hex');

const computeJwtToken = (data) => jwt.sign({ data }, JWT_SECRET, { expiresIn: JWT_EXPIRY });

const decodeJwtToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (err) {
    return err;
  }
};

const throwError = (code = 500, message = 'internal server error') => {
  const err = new Error(message);
  err.code = code;
  throw err;
};

module.exports = {
  computeSHA256Hash, computeJwtToken, decodeJwtToken, throwError,
};
