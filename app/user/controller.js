const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');
const UserService = require('./service');

class UserController {
  static async registerUser(req, res) {
    const { userName, name, password } = req.body;
    try {
      await UserService.registerUser(userName, name, password);
      return out.success(res, codes.SUCCESS, `user with username: '${userName}' successfully registered`);
    } catch (err) {
      if (err.code === 11000) return out.error(res, codes.INVALIDREQ, 'username already exists');
      console.log(err);
      return out.error(res, codes.INTERNALERR, err);
    }
  }
}

module.exports = UserController;
