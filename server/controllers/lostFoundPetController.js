const LostFoundPet = require('../models/LostFoundPet');
const asyncHandler = require('../middleware/async');
const ErrorResponse = require('../utils/errorResponse');

// @desc    Get all lost and found pets
// @route   GET /api/v1/lost-found-pets
// @access  Public
exports.getAllLostFoundPets = asyncHandler(async (req, res, next) => {
  const pageSize = 10;
  const page = Number(req.query.page) || 1;
  const status = req.query.status;
  const type = req.query.type;

  let query = {};

  if (status) {
    query.status = status;
  }

  if (type) {
    query.type = type;
  }

  const total = await LostFoundPet.countDocuments(query);
  const pets = await LostFoundPet.find(query)
    .sort({ createdAt: -1 })
    .skip(pageSize * (page - 1))
    .limit(pageSize);

  res.status(200).json({
    success: true,
    count: pets.length,
    total,
    totalPages: Math.ceil(total / pageSize),
    currentPage: page,
    data: pets
  });
});

// @desc    Get single lost and found pet
// @route   GET /api/v1/lost-found-pets/:id
// @access  Public
exports.getLostFoundPetById = asyncHandler(async (req, res, next) => {
  const pet = await LostFoundPet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  res.status(200).json({
    success: true,
    data: pet
  });
});

// @desc    Create new lost and found pet
// @route   POST /api/v1/lost-found-pets
// @access  Private
exports.createLostFoundPet = asyncHandler(async (req, res, next) => {
  req.body.addedBy = req.user.id;

  const pet = await LostFoundPet.create(req.body);

  res.status(201).json({
    success: true,
    data: pet
  });
});

// @desc    Update lost and found pet
// @route   PUT /api/v1/lost-found-pets/:id
// @access  Private
exports.updateLostFoundPet = asyncHandler(async (req, res, next) => {
  let pet = await LostFoundPet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is pet owner or admin
  if (pet.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to update this pet`, 401));
  }

  pet = await LostFoundPet.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });

  res.status(200).json({
    success: true,
    data: pet
  });
});

// @desc    Resolve lost and found pet
// @route   PUT /api/v1/lost-found-pets/:id/resolve
// @access  Private
exports.resolveLostFoundPet = asyncHandler(async (req, res, next) => {
  let pet = await LostFoundPet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is pet owner or admin
  if (pet.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to resolve this pet`, 401));
  }

  pet.isResolved = true;
  pet.resolvedDate = Date.now();
  await pet.save();

  res.status(200).json({
    success: true,
    data: pet
  });
});

// @desc    Delete lost and found pet
// @route   DELETE /api/v1/lost-found-pets/:id
// @access  Private
exports.deleteLostFoundPet = asyncHandler(async (req, res, next) => {
  const pet = await LostFoundPet.findById(req.params.id);

  if (!pet) {
    return next(new ErrorResponse(`Pet not found with id of ${req.params.id}`, 404));
  }

  // Make sure user is pet owner or admin
  if (pet.addedBy.toString() !== req.user.id && req.user.role !== 'admin') {
    return next(new ErrorResponse(`User ${req.user.id} is not authorized to delete this pet`, 401));
  }

  await pet.remove();

  res.status(200).json({
    success: true,
    data: {}
  });
}); 