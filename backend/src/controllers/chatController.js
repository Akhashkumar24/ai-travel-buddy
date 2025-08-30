// src/controllers/chatController.js
const ChatHistory = require('../models/ChatHistory');
const geminiService = require('../services/geminiService');
const { validationResult } = require('express-validator');

const chatController = {
  // Send message to AI and get response
  async sendMessage(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { message, context } = req.body;
      const userId = req.userId;

      // Get AI response
      const aiResponse = await geminiService.chatWithAI(message, {
        ...context,
        userId,
        userPreferences: req.user.preferences
      });

      // Save chat history
      await ChatHistory.create({
        userId,
        tripId: context?.currentTrip?.id || null,
        message,
        response: aiResponse.message,
        context: context || {}
      });

      res.json({
        success: true,
        data: aiResponse
      });

    } catch (error) {
      console.error('Send message error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to process message'
      });
    }
  },

  // Get chat history for a trip
  async getChatHistory(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { tripId } = req.params;
      const { page = 1, limit = 50 } = req.query;
      const offset = (page - 1) * limit;

      const chatHistory = await ChatHistory.findAndCountAll({
        where: {
          userId: req.userId,
          tripId
        },
        order: [['createdAt', 'ASC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: {
          messages: chatHistory.rows,
          totalCount: chatHistory.count,
          totalPages: Math.ceil(chatHistory.count / limit),
          currentPage: parseInt(page)
        }
      });

    } catch (error) {
      console.error('Get chat history error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to retrieve chat history'
      });
    }
  }
};

module.exports = chatController;