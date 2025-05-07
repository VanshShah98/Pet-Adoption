// server/models/Donation.js

const mongoose = require('mongoose');

const donationSchema = new mongoose.Schema({
  donorName: {
    type: String,
    required: true,
    trim: true,
  },
  donorEmail: {
    type: String,
    required: true,
    trim: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  paymentId: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    default: 'inr',
  },
  status: {
    type: String,
    enum: ['succeeded', 'failed', 'pending'],
    default: 'succeeded',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Donation', donationSchema);
