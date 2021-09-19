const Joi = require('joi');

const userRegistrationSchema = Joi.object({
  firstName: Joi.string().min(2).required(),
  lastName: Joi.string().min(3).required(),
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }),
  address: Joi.string().min(3).required(),
  password: Joi.string().min(6).required(),
  verificationDetails: {
    driversLicense: Joi.string().required(),
    referenceEmail: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }),
  },
}).strict();

const userLoginSchema = Joi.object({
  email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net', 'co'] } }),
  password: Joi.string().min(6).required(),
});

const createJobSchema = Joi.object({
  userId: Joi.string().min(3).required(),
  petName: Joi.string().min(1).required(),
  petType: Joi.string().min(1).required(),
});

const updateJobSchema = Joi.object({
  state: Joi.string().valid('active', 'completed', 'cancelled').required(),
  jobId: Joi.string().required(),
  creatorId: Joi.string().required(),
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
  userRegistrationSchema,
  createJobSchema,
  updateJobSchema,
  selectSitterSchema,
  placeJobBidSchema,
  userLoginSchema,
};
