const out = require('@lib/apiout');
const codes = require('@lib/statusCodes');
const JobService = require('./service');

class JobController {
  static async getJobs(req, res) {
    const { state } = req.query;
    try {
      const jobs = await JobService.getJobs(state);
      return out.success(res, codes.SUCCESS, jobs);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async createJob(req, res) {
    const {
      userId, petName, petType, extraJobDetails,
    } = req.body;
    try {
      const job = await JobService.createJob(userId, petName, petType, extraJobDetails);
      return out.success(res, codes.SUCCESS, job);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }
}

module.exports = JobController;
