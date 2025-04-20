const mongoose = require('mongoose');

const reviewSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  },
  petId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Pet',
    required: true
  },
  rating: { 
    type: Number, 
    required: true,
    min: 1,
    max: 5
  },
  comment: {
    type: String,
    trim: true,
    maxlength: [500, 'Comment cannot be longer than 500 characters']
  }
}, {
  timestamps: true
});

// Index for faster queries
reviewSchema.index({ petId: 1, rating: -1 });

// Prevent duplicate reviews from the same user for the same pet
reviewSchema.index({ petId: 1, userId: 1 }, { unique: true });

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review; 