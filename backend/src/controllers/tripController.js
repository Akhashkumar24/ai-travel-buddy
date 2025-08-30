// src/controllers/tripController.js
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');
const geminiService = require('../services/geminiService');
const weatherService = require('../services/weatherService');
const { validationResult } = require('express-validator');

const tripController = {
  // Create new trip
  async createTrip(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const tripData = {
        ...req.body,
        userId: req.userId
      };

      // Create trip
      const trip = await Trip.create(tripData);

      // Get weather data for destination
      try {
        const weatherData = await weatherService.getWeatherForecast(
          trip.destination.coordinates,
          trip.startDate,
          trip.endDate
        );
        await trip.update({ weatherData });
      } catch (weatherError) {
        console.error('Weather data error:', weatherError);
      }

      // Generate AI suggestions
      try {
        const aiSuggestions = await geminiService.getSuggestionsForDestination(
          trip.destination,
          trip.preferences
        );
        await trip.update({ aiSuggestions });
      } catch (aiError) {
        console.error('AI suggestions error:', aiError);
      }

      res.status(201).json({
        success: true,
        message: 'Trip created successfully',
        data: { trip }
      });

    } catch (error) {
      console.error('Create trip error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get all trips for user
  async getTrips(req, res) {
    try {
      const { status, page = 1, limit = 10 } = req.query;
      const offset = (page - 1) * limit;

      const whereClause = { userId: req.userId };
      if (status) {
        whereClause.status = status;
      }

      const trips = await Trip.findAndCountAll({
        where: whereClause,
        include: [
          {
            model: Itinerary,
            as: 'itineraries',
            include: [{ model: Activity, as: 'activities' }]
          }
        ],
        order: [['createdAt', 'DESC']],
        limit: parseInt(limit),
        offset: parseInt(offset)
      });

      res.json({
        success: true,
        data: {
          trips: trips.rows,
          totalCount: trips.count,
          totalPages: Math.ceil(trips.count / limit),
          currentPage: parseInt(page)
        }
      });

    } catch (error) {
      console.error('Get trips error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Get single trip
  async getTrip(req, res) {
    try {
      const { id } = req.params;

      const trip = await Trip.findOne({
        where: { id, userId: req.userId },
        include: [
          {
            model: Itinerary,
            as: 'itineraries',
            include: [{ model: Activity, as: 'activities' }]
          }
        ]
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      res.json({
        success: true,
        data: { trip }
      });

    } catch (error) {
      console.error('Get trip error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Update trip
  async updateTrip(req, res) {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          success: false,
          message: 'Validation errors',
          errors: errors.array()
        });
      }

      const { id } = req.params;
      const updateData = req.body;

      const trip = await Trip.findOne({
        where: { id, userId: req.userId }
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      await trip.update(updateData);

      res.json({
        success: true,
        message: 'Trip updated successfully',
        data: { trip }
      });

    } catch (error) {
      console.error('Update trip error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Delete trip
  async deleteTrip(req, res) {
    try {
      const { id } = req.params;

      const trip = await Trip.findOne({
        where: { id, userId: req.userId }
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      await trip.destroy();

      res.json({
        success: true,
        message: 'Trip deleted successfully'
      });

    } catch (error) {
      console.error('Delete trip error:', error);
      res.status(500).json({
        success: false,
        message: 'Internal server error'
      });
    }
  },

  // Generate itinerary using AI
  async generateItinerary(req, res) {
    try {
      const { id } = req.params;

      const trip = await Trip.findOne({
        where: { id, userId: req.userId }
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      // Generate itinerary using Gemini AI
      const aiItinerary = await geminiService.generateTripItinerary(trip);

      // Save itinerary to database
      for (const dayPlan of aiItinerary.days) {
        const itinerary = await Itinerary.create({
          tripId: trip.id,
          day: dayPlan.day,
          date: dayPlan.date,
          theme: dayPlan.theme,
          notes: dayPlan.notes || '',
          estimatedCost: dayPlan.estimatedCost || 0
        });

        // Save activities
        for (const activity of dayPlan.activities) {
          await Activity.create({
            itineraryId: itinerary.id,
            title: activity.title,
            description: activity.description,
            location: activity.location,
            startTime: activity.time,
            duration: activity.duration,
            estimatedCost: parseFloat(activity.cost) || 0,
            category: activity.category,
            notes: activity.tips || ''
          });
        }
      }

      // Update trip with AI overview
      await trip.update({
        aiSuggestions: {
          ...trip.aiSuggestions,
          generatedItinerary: aiItinerary.overview,
          packingList: aiItinerary.packingList,
          importantNotes: aiItinerary.importantNotes
        }
      });

      // Fetch updated trip with itineraries
      const updatedTrip = await Trip.findOne({
        where: { id },
        include: [
          {
            model: Itinerary,
            as: 'itineraries',
            include: [{ model: Activity, as: 'activities' }]
          }
        ]
      });

      res.json({
        success: true,
        message: 'Itinerary generated successfully',
        data: { trip: updatedTrip, aiItinerary }
      });

    } catch (error) {
      console.error('Generate itinerary error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to generate itinerary'
      });
    }
  },

  // Regenerate specific suggestions
  async regenerateSuggestions(req, res) {
    try {
      const { id } = req.params;

      const trip = await Trip.findOne({
        where: { id, userId: req.userId }
      });

      if (!trip) {
        return res.status(404).json({
          success: false,
          message: 'Trip not found'
        });
      }

      const aiSuggestions = await geminiService.getSuggestionsForDestination(
        trip.destination,
        trip.preferences
      );

      await trip.update({ aiSuggestions });

      res.json({
        success: true,
        message: 'Suggestions regenerated successfully',
        data: { suggestions: aiSuggestions }
      });

    } catch (error) {
      console.error('Regenerate suggestions error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to regenerate suggestions'
      });
    }
  }
};

module.exports = tripController;