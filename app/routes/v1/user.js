const router = require('express').Router();
const UserController = require('@app/user/controller');
const { inputValidationMiddleware } = require('@common/middlewares');
const { userRegistrationSchema, userLoginSchema, userUpdationSchema } = require('@lib/validation');

router.post('/', inputValidationMiddleware(userRegistrationSchema), UserController.registerUser);
router.put('/', inputValidationMiddleware(userUpdationSchema), UserController.updateUserDetails);
router.get('/:id', UserController.getUser);
router.get('/login', UserController.loginViaJwtToken);
router.post('/login', inputValidationMiddleware(userLoginSchema), UserController.loginViaCredentials);

module.exports = router;
