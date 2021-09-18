const router = require('express').Router();
const JobController = require('@app/job/controller');
// const { inputValidationMiddleware } = require('@common/middlewares');
// const { userRegistrationSchema } = require('@lib/validation');

router.post('/', JobController.createJob);
router.get('/', JobController.getJobs);

module.exports = router;
