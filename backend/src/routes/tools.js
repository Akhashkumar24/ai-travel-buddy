// src/routes/tools.js
const express = require('express');
const { body, query } = require('express-validator');
const toolsController = require('../controllers/toolsController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Validation rules
const weatherValidation = [
  query('location').notEmpty().withMessage('Location is required'),
  query('startDate').optional().isISO8601().withMessage('Valid start date required'),
  query('endDate').optional().isISO8601().withMessage('Valid end date required')
];

const currencyValidation = [
  query('from').isLength({ min: 3, max: 3 }).withMessage('Valid from currency code required'),
  query('to').isLength({ min: 3, max: 3 }).withMessage('Valid to currency code required'),
  query('amount').isNumeric().withMessage('Valid amount required')
];

const translateValidation = [
  body('text').notEmpty().withMessage('Text to translate is required'),
  body('from').isLength({ min: 2, max: 5 }).withMessage('Valid source language code required'),
  body('to').isLength({ min: 2, max: 5 }).withMessage('Valid target language code required')
];

const placesValidation = [
  query('query').notEmpty().withMessage('Search query is required'),
  query('location').optional().isString()
];

// Routes
router.get('/weather', weatherValidation, toolsController.getWeather);
router.get('/currency', currencyValidation, toolsController.convertCurrency);
router.post('/translate', translateValidation, toolsController.translateText);
router.get('/places', placesValidation, toolsController.searchPlaces);

module.exports = router;