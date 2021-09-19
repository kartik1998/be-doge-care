const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');
const utils = require('@lib/utils');
const UserService = require('./service');

class UserController {
  static async registerUser(req, res) {
    const { firstName, lastName, address, email, password, verificationDetails } = req.body;
    try {
      const user = await UserService.registerUser(firstName, lastName, address, email, password, verificationDetails);
      return out.success(res, codes.CREATED, { user, token: utils.computeJwtToken({ email: user.email }) });
    } catch (err) {
      if (err.code === 11000) return out.error(res, codes.INVALIDREQ, 'email already exists');
      console.log(err);
      return out.error(res, codes.INTERNALERR, err);
    }
  }

  static async getUser(req, res) {
    const { id: userId } = req.params;
    try {
      const user = await UserService.getUser(userId);
      return out.success(res, codes.SUCCESS, user);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async updateUserDetails(req, res) {
    const { firstName, lastName, address, email, password } = req.body;
    const { authorization: authToken } = req.headers;
    try {
      const user = await UserService.updateUserDetails(firstName, lastName, address, email, authToken, password);
      return out.success(res, codes.SUCCESS, { user, token: utils.computeJwtToken({ email: email || user.email }) });
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async loginViaJwtToken(req, res) {
    const { authorization: authToken } = req.headers;
    if (!authToken) return out.error(res, codes.INVALIDREQ, 'no authorization token provided');
    try {
      const user = await UserService.loginViaJwtToken(authToken);
      return out.success(res, codes.SUCCESS, user);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async loginViaCredentials(req, res) {
    const { email, password } = req.body;
    try {
      const user = await UserService.loginViaCredentials(email, password);
      return out.success(res, codes.SUCCESS, user);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }
}

module.exports = UserController;
