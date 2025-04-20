const express = require('express');
const router = express.Router();
const { protect, authorize } = require('../middleware/auth');
const {
  getAllLostFoundPets,
  getLostFoundPetById,
  createLostFoundPet,
  updateLostFoundPet,
  resolveLostFoundPet,
  deleteLostFoundPet
} = require('../controllers/lostFoundPetController');

// Public routes
router.get('/', getAllLostFoundPets);
router.get('/:id', getLostFoundPetById);

// Protected routes
router.use(protect);

router.post('/', createLostFoundPet);
router.put('/:id', updateLostFoundPet);
router.put('/:id/resolve', resolveLostFoundPet);
router.delete('/:id', deleteLostFoundPet);

module.exports = router; 