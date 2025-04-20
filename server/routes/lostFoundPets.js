const express = require('express');
const router = express.Router();
const LostFoundPet = require('../models/LostFoundPet');
const auth = require('../middleware/auth');

// Get all lost and found pets with optional filters
router.get('/', async (req, res) => {
  try {
    const {
      status,
      type,
      breed,
      city,
      state,
      isResolved,
      page = 1,
      limit = 10
    } = req.query;

    const query = {};

    if (status) query.status = status;
    if (type) query.type = type;
    if (breed) query.breed = breed;
    if (city) query['location.city'] = city;
    if (state) query['location.state'] = state;
    if (isResolved !== undefined) query.isResolved = isResolved === 'true';

    const skip = (page - 1) * limit;

    const pets = await LostFoundPet.find(query)
      .sort({ dateLastSeen: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .populate('addedBy', 'name email');

    const total = await LostFoundPet.countDocuments(query);

    res.json({
      pets,
      total,
      pages: Math.ceil(total / limit),
      currentPage: parseInt(page)
    });
  } catch (error) {
    console.error('Error fetching lost and found pets:', error);
    res.status(500).json({ message: 'Error fetching lost and found pets' });
  }
});

// Get a single lost and found pet by ID
router.get('/:id', async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id)
      .populate('addedBy', 'name email');

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    res.json(pet);
  } catch (error) {
    console.error('Error fetching lost and found pet:', error);
    res.status(500).json({ message: 'Error fetching lost and found pet' });
  }
});

// Create a new lost and found pet entry
router.post('/', auth, async (req, res) => {
  try {
    const pet = new LostFoundPet({
      ...req.body,
      addedBy: req.user._id
    });

    await pet.save();
    res.status(201).json(pet);
  } catch (error) {
    console.error('Error creating lost and found pet:', error);
    res.status(500).json({ message: 'Error creating lost and found pet' });
  }
});

// Update a lost and found pet entry
router.put('/:id', auth, async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Only allow the user who added the pet or an admin to update it
    if (pet.addedBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to update this pet' });
    }

    const updatedPet = await LostFoundPet.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(updatedPet);
  } catch (error) {
    console.error('Error updating lost and found pet:', error);
    res.status(500).json({ message: 'Error updating lost and found pet' });
  }
});

// Mark a lost and found pet as resolved
router.patch('/:id/resolve', auth, async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Only allow the user who added the pet or an admin to resolve it
    if (pet.addedBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to resolve this pet' });
    }

    pet.isResolved = true;
    pet.resolvedDate = new Date();
    await pet.save();

    res.json(pet);
  } catch (error) {
    console.error('Error resolving lost and found pet:', error);
    res.status(500).json({ message: 'Error resolving lost and found pet' });
  }
});

// Delete a lost and found pet entry
router.delete('/:id', auth, async (req, res) => {
  try {
    const pet = await LostFoundPet.findById(req.params.id);

    if (!pet) {
      return res.status(404).json({ message: 'Pet not found' });
    }

    // Only allow the user who added the pet or an admin to delete it
    if (pet.addedBy.toString() !== req.user._id.toString() && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this pet' });
    }

    await pet.remove();
    res.json({ message: 'Pet removed successfully' });
  } catch (error) {
    console.error('Error deleting lost and found pet:', error);
    res.status(500).json({ message: 'Error deleting lost and found pet' });
  }
});

module.exports = router; 