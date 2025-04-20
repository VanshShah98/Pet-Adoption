const mongoose = require('mongoose');

const lostFoundPetSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Pet name is required'],
    trim: true,
  },
  type: {
    type: String,
    required: [true, 'Pet type is required'],
    enum: ['dog', 'cat', 'bird', 'other'],
  },
  breed: {
    type: String,
    required: [true, 'Pet breed is required'],
    trim: true,
  },
  color: {
    type: String,
    required: [true, 'Pet color is required'],
    trim: true,
  },
  age: {
    type: Number,
    required: [true, 'Pet age is required'],
    min: [0, 'Age cannot be negative'],
  },
  gender: {
    type: String,
    required: [true, 'Pet gender is required'],
    enum: ['male', 'female', 'unknown'],
  },
  status: {
    type: String,
    required: [true, 'Status is required'],
    enum: ['lost', 'found'],
  },
  location: {
    street: {
      type: String,
      required: [true, 'Street address is required'],
      trim: true,
    },
    city: {
      type: String,
      required: [true, 'City is required'],
      trim: true,
    },
    state: {
      type: String,
      required: [true, 'State is required'],
      trim: true,
    },
    zipCode: {
      type: String,
      required: [true, 'ZIP code is required'],
      trim: true,
    },
  },
  dateLastSeen: {
    type: Date,
    required: [true, 'Date last seen is required'],
  },
  description: {
    type: String,
    required: [true, 'Description is required'],
    trim: true,
    minlength: [10, 'Description must be at least 10 characters long'],
  },
  imageUrl: {
    type: String,
    required: [true, 'Image URL is required'],
    trim: true,
  },
  contactInfo: {
    name: {
      type: String,
      required: [true, 'Contact name is required'],
      trim: true,
    },
    phone: {
      type: String,
      required: [true, 'Contact phone is required'],
      trim: true,
    },
    email: {
      type: String,
      required: [true, 'Contact email is required'],
      trim: true,
      lowercase: true,
      match: [/^\S+@\S+\.\S+$/, 'Please enter a valid email address'],
    },
  },
  isResolved: {
    type: Boolean,
    default: false,
  },
  resolvedDate: {
    type: Date,
  },
  addedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt timestamp before saving
lostFoundPetSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Update the updatedAt timestamp before updating
lostFoundPetSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: Date.now() });
  next();
});

// Add text indexes for search functionality
lostFoundPetSchema.index({
  name: 'text',
  breed: 'text',
  description: 'text',
  'location.city': 'text',
  'location.state': 'text'
});

const LostFoundPet = mongoose.model('LostFoundPet', lostFoundPetSchema);

module.exports = LostFoundPet; 