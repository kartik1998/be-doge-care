const UserService = require('./service');
const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');

class UserController {
  static async registerUser(req, res) {
    const { userName, name, password } = req.body;
    try {
      const response = await UserService.registerUser(userName, name, password);
      return out.success(res, codes.SUCCESS, response);
    } catch (err) {
      if (err.code === 11000) {
        return out.error(res, codes.INVALIDREQ, `username already exists`);
      }
      return out.error(res, codes.INTERNALERR, err);
    }
  }
}

module.exports = UserController;
