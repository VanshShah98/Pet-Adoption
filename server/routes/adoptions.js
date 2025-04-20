const express = require('express');
const router = express.Router();
const AdoptionRequest = require('../models/AdoptionRequest');
const Pet = require('../models/Pet');

// @route   POST /api/adoptions/:petId
// @desc    Create adoption request
// @access  Private
router.post('/:petId', async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.petId);

    if (!pet) {
      return res.status(404).json({
        success: false,
        error: 'Pet not found'
      });
    }

    if (pet.isAdopted) {
      return res.status(400).json({
        success: false,
        error: 'Pet is already adopted'
      });
    }

    // Check if user already has a pending request for this pet
    const existingRequest = await AdoptionRequest.findOne({
      petId: req.params.petId,
      userId: req.user._id,
      status: 'pending'
    });

    if (existingRequest) {
      return res.status(400).json({
        success: false,
        error: 'You already have a pending request for this pet'
      });
    }

    const adoptionRequest = await AdoptionRequest.create({
      petId: req.params.petId,
      userId: req.user._id,
      notes: req.body.notes
    });

    res.status(201).json({
      success: true,
      data: adoptionRequest
    });
  } catch (error) {
    console.error('Adoption request error:', error);
    res.status(500).json({
      success: false,
      error: 'Server error',
      message: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

// @route   GET /api/adoptions
// @desc    Get all adoption requests (admin) or user's requests
// @access  Private
router.get('/', async (req, res) => {
  try {
    let query = {};
    
    // If user is not admin, only show their requests
    if (req.user.role !== 'admin') {
      query.userId = req.user._id;
    }

    const adoptionRequests = await AdoptionRequest.find(query)
      .populate('petId', 'name type breed imageUrl')
      .populate('userId', 'name email')
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      count: adoptionRequests.length,
      data: adoptionRequests
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      error: 'Server error'
    });
  }
});

// @route   PUT /api/adoptions/:id/status
// @desc    Update adoption request status
// @access  Private/Admin
router.put('/:id/status', async (req, res) => {
  try {
    const { status, adminNotes } = req.body;

    if (req.user.role !== 'admin') {
      return res.status(403).json({
        success: false,
        error: 'Not authorized to update adoption request'
      });
    }

    const adoptionRequest = await AdoptionRequest.findById(req.params.id);

    if (!adoptionRequest) {
      return res.status(404).json({
        success: false,
        error: 'Adoption request not found'
      });
    }

    adoptionRequest.status = status;
    adoptionRequest.adminNotes = adminNotes;
    await adoptionRequest.save();

    // If request is approved, mark pet as adopted
    if (status === 'approved') {
      await Pet.findByIdAndUpdate(adoptionRequest.petId, { isAdopted: true });
    }

    res.json({
      success: true,
      data: adoptionRequest
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