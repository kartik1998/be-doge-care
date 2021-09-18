const router = require('express').Router();
const JobController = require('@app/job/controller');
// const { inputValidationMiddleware } = require('@common/middlewares');
// const { userRegistrationSchema } = require('@lib/validation');

router.post('/', JobController.createJob);
router.put('/', JobController.updateJobState);
router.get('/', JobController.getJobs);
router.post('/selectSitter', JobController.selectSitter);
router.post('/placeBid', JobController.placeJobBid);

module.exports = router;
