const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
}).strict();

module.exports = { userRegistrationSchema };
