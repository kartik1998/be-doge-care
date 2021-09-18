const router = require('express').Router();
const JobController = require('@app/job/controller');
const { inputValidationMiddleware } = require('@common/middlewares');
const {
  createJobSchema, selectSitterSchema, updateJobSchema, placeJobBidSchema,
} = require('@lib/validation');

router.post('/', inputValidationMiddleware(createJobSchema), JobController.createJob);
router.put('/', inputValidationMiddleware(updateJobSchema), JobController.updateJobState);
router.get('/', JobController.getJobs);
router.post('/selectSitter', inputValidationMiddleware(selectSitterSchema), JobController.selectSitter);
router.post('/placeBid', inputValidationMiddleware(placeJobBidSchema), JobController.placeJobBid);

module.exports = router;
