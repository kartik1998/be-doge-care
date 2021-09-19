const {
  computeSHA256Hash, decodeJwtToken, throwError, computeJwtToken,
} = require('@lib/utils');
const codes = require('@lib/statusCodes');
const User = require('./model');

class UserService {
  static async registerUser(firstName, lastName, address, email, password, verificationDetails) {
    const user = await User.create({
      firstName,
      lastName,
      address,
      email,
      password: computeSHA256Hash(password),
      verificationDetails,
    });
    const resUser = user.toJSON();
    delete resUser.password;
    return resUser;
  }

  static async updateUserDetails(firstName, lastName, address, email, authToken, password) {
    if (!authToken) return throwError(codes.INVALIDREQ, 'auth token not found');
    const data = decodeJwtToken(authToken);
    if (data instanceof Error) return throwError(codes.UNAUTHORISED, data.message);
    const { email: userEmail } = data.data;
    if (!userEmail) return throwError(codes.NOTFOUND, 'email absent in decoded jwt');
    const user = await User.findOne({ email: userEmail });
    if (!user) return throwError(codes.NOTFOUND, 'user extracted from jwt not found');
    user.firstName = firstName || user.firstName;
    user.lastName = lastName || user.lastName;
    user.address = address || user.address;
    user.email = email || user.email;
    if (password) user.password = computeSHA256Hash(password);
    await user.save();
    const resUser = user.toJSON();
    delete resUser.password;
    return resUser;
  }

  static async loginViaJwtToken(token) {
    const data = decodeJwtToken(token);
    if (data instanceof Error) return throwError(codes.UNAUTHORISED, data.message);
    const { email } = data.data;
    if (!email) return throwError(codes.NOTFOUND, 'email absent in decoded jwt');
    const user = await User.findOne({ email }).select('-password').exec();
    if (!user) return throwError(codes.NOTFOUND, `${email} not found`);
    return { user };
  }

  static async loginViaCredentials(email, password) {
    const user = await User.findOne({ email });
    if (!user) return throwError(codes.NOTFOUND, `${email} doesn't exist.`);
    if (computeSHA256Hash(password) !== user.password) return throwError(codes.UNAUTHORISED, `invalid password for ${email}`);
    const response = user.toJSON();
    delete response.password;
    return { user: response, token: computeJwtToken({ email }) };
  }
}

module.exports = UserService;
