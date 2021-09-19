const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  verificationDetails: {
    driversLicense: {
      type: String,
      required: true,
    },
    referenceEmail: {
      type: String,
      required: true,
    },
  },
  createdJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  sitterJobs: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Job',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

UserSchema.methods.toJSON = function () {
  const obj = this.toObject();
  delete obj.__v; // eslint-disable-line no-underscore-dangle
  return obj;
};

module.exports = mongoose.model('User', UserSchema);
