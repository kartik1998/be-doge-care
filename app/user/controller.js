const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');
const utils = require('@lib/utils');
const UserService = require('./service');

class UserController {
  static async registerUser(req, res) {
    const { userName, name, password } = req.body;
    try {
      const user = await UserService.registerUser(userName, name, password);
      const jwtToken = utils.computeJwtToken({ userName: user.userName });
      return out.success(res, codes.CREATED, { token: jwtToken });
    } catch (err) {
      if (err.code === 11000) return out.error(res, codes.INVALIDREQ, 'username already exists');
      console.log(err);
      return out.error(res, codes.INTERNALERR, err);
    }
  }
}

module.exports = UserController;
