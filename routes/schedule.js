const express = require('express');
const router = express.Router();
const Interview = require('../models/Interview');
const sendEmail = require('../utils/sendEmail');

router.post('/', async (req, res) => {
const { candidateName, email, interviewer, date, time, mode } = req.body;

  try {
const newInterview = new Interview({ candidateName, email, interviewer, date, time, mode });
    await newInterview.save();

    // ✉️ Send confirmation email
    await sendEmail({
      to: email,
      subject: 'Interview Scheduled - Capzora.AI',
      text: `Hi ${candidateName},\n\nYour interview has been scheduled on ${date} at ${time} via ${mode}.\n\nBest,\nCapzora.AI Team`
    });

    res.status(201).json({ message: 'Interview scheduled and confirmation email sent!' });
  } catch (error) {
    console.error('❌ Error:', error);
    res.status(500).json({ message: 'Server error while scheduling interview.' });
  }
});

// ✅ Add this line
module.exports = router;
