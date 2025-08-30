// src/routes/trips.js
const express = require('express');
const { body, param, query } = require('express-validator');
const tripController = require('../controllers/tripController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Validation rules
const createTripValidation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('destination').isObject().withMessage('Destination is required'),
  body('destination.name').notEmpty().withMessage('Destination name is required'),
  body('destination.coordinates').isObject().withMessage('Destination coordinates are required'),
  body('startDate').isISO8601().toDate().withMessage('Valid start date is required'),
  body('endDate').isISO8601().toDate().withMessage('Valid end date is required'),
  body('budget').optional().isObject(),
  body('preferences').optional().isObject()
];

const updateTripValidation = [
  param('id').isUUID().withMessage('Valid trip ID is required'),
  body('title').optional().trim().isLength({ min: 3 }),
  body('description').optional().trim(),
  body('status').optional().isIn(['planning', 'confirmed', 'ongoing', 'completed', 'cancelled'])
];

const tripIdValidation = [
  param('id').isUUID().withMessage('Valid trip ID is required')
];

// Routes
router.get('/', tripController.getTrips);
router.post('/', createTripValidation, tripController.createTrip);
router.get('/:id', tripIdValidation, tripController.getTrip);
router.put('/:id', updateTripValidation, tripController.updateTrip);
router.delete('/:id', tripIdValidation, tripController.deleteTrip);
router.post('/:id/generate-itinerary', tripIdValidation, tripController.generateItinerary);
router.post('/:id/regenerate-suggestions', tripIdValidation, tripController.regenerateSuggestions);

module.exports = router;