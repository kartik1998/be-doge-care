const User = require('@app/user/model');
const { throwError } = require('@lib/utils');
const codes = require('@lib/statusCodes');
const Job = require('./model');

class JobService {
  static async createJob(userId, petName, petType, extraJobDetails = {}) {
    try {
      const user = await User.findOne({ _id: userId });
      if (!user) return throwError(codes.NOTFOUND, `user with id: ${userId} not found`);
      return Job.create({
        creatorId: userId,
        jobDetails: { petName, petType, extraDetails: extraJobDetails },
      });
    } catch (err) {
      return throwError(codes.NOTFOUND, `user with id: ${userId} not found or invalid userId`);
    }
  }
}

module.exports = JobService;
