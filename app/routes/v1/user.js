const router = require('express').Router();
const UserController = require('@app/user/controller');
const { inputValidationMiddleware } = require('@common/middlewares');
const { userRegistrationSchema } = require('@lib/validation');

router.post('/', inputValidationMiddleware(userRegistrationSchema), UserController.registerUser);

module.exports = router;
