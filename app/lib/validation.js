const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  userName: Joi.string().min(3).required(),
  name: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
}).strict();

const createJobSchema = Joi.object({
  userId: Joi.string().min(3).required(),
  petName: Joi.string().min(1).required(),
  petType: Joi.string().min(1).required(),
});

const updateJobSchema = Joi.object({
  state: Joi.string().valid('active', 'completed', 'cancelled').required(),
  jobId: Joi.string().required(),
});

const selectSitterSchema = Joi.object({
  sitterId: Joi.string().required(),
  jobId: Joi.string().required(),
});

const placeJobBidSchema = Joi.object({
  sitterId: Joi.string().required(),
  jobId: Joi.string().required(),
});

module.exports = {
  userRegistrationSchema, createJobSchema, updateJobSchema, selectSitterSchema, placeJobBidSchema,
};
