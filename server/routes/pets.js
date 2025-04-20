const express = require('express');
const router = express.Router();
const Pet = require('../models/Pet');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Helper function to verify token
const verifyToken = async (token) => {
  try {
    if (!token) return null;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.userId).select('-password');
    return user;
  } catch (error) {
    return null;
  }
};

// @route   GET /api/pets
// @desc    Get all pets (not adopted)
// @access  Public
router.get('/', async (req, res) => {
  try {
    const pets = await Pet.find({ isAdopted: false })
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      data: pets
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   GET /api/pets/:id
// @desc    Get single pet
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }

    res.json({
      success: true,
      data: pet
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   POST /api/pets
// @desc    Create new pet
// @access  Private/Admin
router.post('/', async (req, res) => {
  try {
    // Verify token and get user
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No token, authorization denied'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin only.'
      });
    }

    const {
      name,
      age,
      breed,
      type,
      description,
      imageUrl,
      gender,
      vaccinated
    } = req.body;

    const pet = await Pet.create({
      name,
      age,
      breed,
      type,
      description,
      imageUrl,
      gender,
      vaccinated,
      addedBy: user._id
    });

    res.status(201).json({
      success: true,
      data: pet
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/pets/:id
// @desc    Update pet
// @access  Private/Admin
router.put('/:id', async (req, res) => {
  try {
    // Verify token and get user
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No token, authorization denied'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin only.'
      });
    }

    const pet = await Pet.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true, runValidators: true }
    );

    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }

    res.json({
      success: true,
      data: pet
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   DELETE /api/pets/:id
// @desc    Delete pet
// @access  Private/Admin
router.delete('/:id', async (req, res) => {
  try {
    // Verify token and get user
    const token = req.header('Authorization')?.replace('Bearer ', '');
    const user = await verifyToken(token);

    if (!user) {
      return res.status(401).json({
        success: false,
        error: 'No token, authorization denied'
      });
    }

    if (user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Access denied. Admin only.'
      });
    }

    const pet = await Pet.findByIdAndDelete(req.params.id);

    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }

    res.json({
      success: true,
      data: {}
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

module.exports = router; 