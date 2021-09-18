const mongoose = require('mongoose');

const JobSchema = new mongoose.Schema({
  creatorId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User',
  },
  selectedSitterId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  state: {
    type: String,
    default: 'pending', // pending, sitter_selected, active, completed, cancelled
  },
  jobDetails: {
    petName: {
      type: String,
      required: true,
    },
    petType: {
      // dog, cat etc..
      type: String,
      required: true,
    },
    extraDetails: {
      type: Object,
    },
  },
  sitterBids: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  ],
  createdAt: {
    type: Date,
    default: new Date(),
  },
});

module.exports = mongoose.model('Job', JobSchema);
