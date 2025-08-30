// src/controllers/toolsController.js
const weatherService = require('../services/weatherService');
const currencyService = require('../services/currencyService');
const translationService = require('../services/translationService');
const mapsService = require('../services/mapsService');
const { validationResult } = require('express-validator');

const toolsController = {
  // Get weather information
  async getWeather(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { location, startDate, endDate } = req.query;

      const weather = await weatherService.getWeatherForecast(location, startDate, endDate);

      res.json({
        success: true,
        data: { weather }
      });

    } catch (error) {
      console.error('Get weather error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to get weather information'
      });
    }
  },

  // Convert currency
  async convertCurrency(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { from, to, amount } = req.query;

      const conversion = await currencyService.convertCurrency(from, to, parseFloat(amount));

      res.json({
        success: true,
        data: { conversion }
      });

    } catch (error) {
      console.error('Currency conversion error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to convert currency'
      });
    }
  },

  // Translate text
  async translateText(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { text, from, to } = req.body;

      const translation = await translationService.translateText(text, from, to);

      res.json({
        success: true,
        data: { translation }
      });

    } catch (error) {
      console.error('Translation error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to translate text'
      });
    }
  },

  // Search places
  async searchPlaces(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { query, location } = req.query;

      const places = await mapsService.searchPlaces(query, location);

      res.json({
        success: true,
        data: { places }
      });

    } catch (error) {
      console.error('Search places error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to search places'
      });
    }
  }
};

module.exports = toolsController;