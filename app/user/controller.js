const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');
const utils = require('@lib/utils');
const UserService = require('./service');

class UserController {
  static async registerUser(req, res) {
    const { userName, name, password } = req.body;
    try {
      const user = await UserService.registerUser(userName, name, password);
      return out.success(res, codes.CREATED, { token: utils.computeJwtToken({ userName: user.userName }) });
    } catch (err) {
      if (err.code === 11000) return out.error(res, codes.INVALIDREQ, 'username already exists');
      console.log(err);
      return out.error(res, codes.INTERNALERR, err);
    }
  }

  static async loginViaJwtToken(req, res) {
    const { authorization: authtoken } = req.headers;
    if (!authtoken) return out.error(res, codes.INVALIDREQ, 'no authorization token provided');
    try {
      const user = await UserService.loginViaJwtToken(authtoken);
      return out.success(res, codes.SUCCESS, user);
    } catch (err) {
      return out.error(res, err.code || codes.INTERNALERR, err.message || 'internal server error');
    }
  }
}

module.exports = UserController;
