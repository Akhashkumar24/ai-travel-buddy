// src/routes/chat.js
const express = require('express');
const { body, param } = require('express-validator');
const chatController = require('../controllers/chatController');
const authMiddleware = require('../middleware/auth');

const router = express.Router();

// All routes require authentication
router.use(authMiddleware);

// Validation rules
const sendMessageValidation = [
  body('message').trim().isLength({ min: 1 }).withMessage('Message cannot be empty'),
  body('context').optional().isObject()
];

const tripIdValidation = [
  param('tripId').isUUID().withMessage('Valid trip ID is required')
];

// Routes
router.post('/message', sendMessageValidation, chatController.sendMessage);
router.get('/history/:tripId', tripIdValidation, chatController.getChatHistory);

module.exports = router;