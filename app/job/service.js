const User = require('@app/user/model');
const { throwError } = require('@lib/utils');
const codes = require('@lib/statusCodes');
const Job = require('./model');

class JobService {
  static async getJobs(state) {
    if (!state) return Job.find({});
    return Job.find({ state });
  }

  static async createJob(userId, petName, petType, extraJobDetails = {}) {
    try {
      const user = await User.findOne({ _id: userId }); // eslint-disable-line no-underscore-dangle
      if (!user) return throwError(codes.NOTFOUND, `user with id: ${userId} not found`);
      const job = await Job.create({
        creatorId: userId,
        jobDetails: { petName, petType, extraDetails: extraJobDetails },
      });
      user.createdJobs.push(job._id); // eslint-disable-line no-underscore-dangle
      await user.save(); // add job in user's created jobs array
      return job;
    } catch (err) {
      return throwError(codes.NOTFOUND, `user with id: ${userId} not found or invalid userId`);
    }
  }
}

module.exports = JobService;
