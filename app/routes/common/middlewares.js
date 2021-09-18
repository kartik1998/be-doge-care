const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');

const inputValidationMiddleware = (schema) => async (req, res, next) => {
  try {
    await schema.validateAsync(req.body);
    return next();
  } catch (err) {
    return out.error(res, codes.INVALIDREQINPUT, err.message);
  }
};

module.exports = { inputValidationMiddleware };
