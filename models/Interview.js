const mongoose = require('mongoose');

const interviewSchema = new mongoose.Schema({
  candidateName: { type: String, required: true },
  email: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  mode: { type: String, required: true },
});

module.exports = mongoose.model('Interview', interviewSchema);
