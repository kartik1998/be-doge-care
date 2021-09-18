const User = require('./model');
const { computeSHA256Hash } = require('@lib/utils');

class UserService {
  static async registerUser(userName, name, password) {
    return User.create({ userName, name, password: computeSHA256Hash(password) });
  }
}

module.exports = UserService;
