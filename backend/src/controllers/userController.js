// src/controllers/userController.js
const User = require('../models/User');
const { validationResult } = require('express-validator');

const userController = {
  // Get user profile
  async getProfile(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      res.json({
        success: true,
        data: { user: user.toJSON() }
      });

    } catch (error) {
      console.error('Get profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update user profile
  async updateProfile(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { firstName, lastName, preferences } = req.body;

      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(404).json({
          success: false,
          message: 'User not found'
        });
      }

      await user.update({
        firstName: firstName || user.firstName,
        lastName: lastName || user.lastName,
        preferences: preferences || user.preferences
      });

      res.json({
        success: true,
        message: 'Profile updated successfully',
        data: { user: user.toJSON() }
      });

    } catch (error) {
      console.error('Update profile error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Upload profile picture
  async uploadProfilePicture(req, res) {
    try {
      // This is a placeholder - implement file upload logic
      res.json({
        success: true,
        message: 'Profile picture upload feature coming soon'
      });

    } catch (error) {
      console.error('Upload profile picture error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  }
};

module.exports = userController;