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

  // sitter places a bid / let's the job creator know that he/she is available to do the job
  static async placeJobBid(req, res) {
    const { sitterId, jobId } = req.body;
    try {
      const job = await JobService.placeJobBid(sitterId, jobId);
      return out.success(res, codes.SUCCESS, job);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async updateJobState(req, res) {
    const { state, jobId, creatorId } = req.body;
    try {
      const job = await JobService.updateJobState(state, jobId, creatorId);
      return out.success(res, codes.SUCCESS, job);
    } catch (err) {
      return out.error(res, err.code, err.message);
    }
  }

  static async selectSitter(req, res) {
    const { jobId, sitterId } = req.body;
    try {
      const job = await JobService.selectSitter(jobId, sitterId);
      return out.success(res, codes.SUCCESS, job);
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
