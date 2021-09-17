const statusCodes = require('./statusCodes');

exports.success = (res, statusCode = 200, response) => {
  const out = {
    statusCode,
    status: 'success',
    result: response,
  };
  res.status(statusCode).json(out);
};

exports.error = (res, statusCode, message) => {
  let code = !Object.values(statusCodes).includes(statusCode) ? undefined : statusCode;
  const msg = !code ? 'internal server error' : message;
  code = statusCode || statusCodes.INTERNALERR;

  const out = {
    status: 'failure',
    statusCode: `${code}`,
    error: msg,
  };
  res.status(code).json(out);
};
