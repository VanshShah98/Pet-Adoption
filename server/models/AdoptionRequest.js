const mongoose = require('mongoose');

const adoptionRequestSchema = new mongoose.Schema({
  petId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pet',
    required: true
  },
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'], 
    default: 'pending'
  },
  notes: {
    type: String,
    trim: true
  },
  adminNotes: {
    type: String,
    trim: true
  }
}, {
  timestamps: true
});

// Index for faster queries
adoptionRequestSchema.index({ userId: 1, status: 1 });
adoptionRequestSchema.index({ petId: 1, status: 1 });

// Prevent duplicate adoption requests
adoptionRequestSchema.index({ petId: 1, userId: 1 }, { unique: true });

const AdoptionRequest = mongoose.model('AdoptionRequest', adoptionRequestSchema);

module.exports = AdoptionRequest; 