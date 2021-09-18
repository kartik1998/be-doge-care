const router = require('express').Router();
const UserController = require('@app/user/controller');

router.post('/', UserController.registerUser);

module.exports = router;
