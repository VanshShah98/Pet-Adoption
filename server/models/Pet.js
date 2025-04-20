const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  name: { 
    type: String, 
    required: [true, 'Pet name is required'],
    trim: true
  },
  age: { 
    type: Number,
    required: [true, 'Pet age is required'],
    min: [0, 'Age cannot be negative']
  },
  breed: { 
    type: String, 
    required: [true, 'Breed is required'],
    trim: true
  },
  type: { 
    type: String, 
    required: [true, 'Pet type is required'],
    enum: ['Dog', 'Cat', 'Bird', 'Other'],
    trim: true
  },
  description: { 
    type: String,
    required: [true, 'Description is required'],
    trim: true
  },
  imageUrl: { 
    type: String,
    required: [true, 'Image URL is required']
  },
  gender: { 
    type: String, 
    required: [true, 'Gender is required'],
    enum: ['Male', 'Female']
  },
  vaccinated: { 
    type: Boolean, 
    default: false 
  },
  isAdopted: { 
    type: Boolean, 
    default: false 
  },
  addedBy: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

// Index for faster queries
petSchema.index({ type: 1, isAdopted: 1 });
petSchema.index({ breed: 1 });

const Pet = mongoose.model('Pet', petSchema);

module.exports = Pet; 