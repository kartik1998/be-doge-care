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

  static async selectSitter(jobId, sitterId) {
    try {
      const data = await Promise.all([Job.findOne({ _id: jobId }), User.findOne({ _id: sitterId })]);
      const job = data[0];
      const sitter = data[1];
      if (!job || !sitter) return throwError(codes.NOTFOUND, 'invalid job or sitter id');
      if (!job.sitterBids.includes(sitterId)) return throwError(codes.NOTALLOWED, `${sitterId} has not placed a bid to be the sitter for the job`);
      job.state = 'sitter_selected';
      job.selectedSitterId = sitter._id; // eslint-disable-line no-underscore-dangle
      await job.save();
      return job;
    } catch (err) {
      return throwError(codes.NOTFOUND, err.message);
    }
  }
}

module.exports = JobService;
