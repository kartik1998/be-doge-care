const { computeSHA256Hash, decodeJwtToken, throwError } = require('@lib/utils');
const codes = require('@lib/statusCodes');
const User = require('./model');

class UserService {
  static async registerUser(userName, name, password) {
    return User.create({ userName, name, password: computeSHA256Hash(password) });
  }

  static async loginViaJwtToken(token) {
    const data = decodeJwtToken(token);
    if (data instanceof Error) return throwError(codes.UNAUTHORISED, data.message);
    const { userName } = data.data;
    const user = await User.findOne({ userName }).select('-password').exec();
    if (!user) return throwError(codes.NOTFOUND, `${userName} not found`);
    return user;
  }

  static async loginViaCredentials(userName, password) {
    const user = await User.findOne({ userName });
    if (!user) return throwError(codes.NOTFOUND, `${userName} doesn't exist.`);
    if (computeSHA256Hash(password) !== user.password) return throwError(codes.UNAUTHORISED, `invalid password for ${userName}`);
    const response = user.toJSON();
    delete response.password;
    return response;
  }
}

module.exports = UserService;
