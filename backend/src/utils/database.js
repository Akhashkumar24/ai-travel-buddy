// src/utils/database.js
const sequelize = require('../config/database');
const User = require('../models/User');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');
const ChatHistory = require('../models/ChatHistory');

// Define associations
const defineAssociations = () => {
  // User associations
  User.hasMany(Trip, { foreignKey: 'userId', as: 'trips' });
  User.hasMany(ChatHistory, { foreignKey: 'userId', as: 'chatHistory' });

  // Trip associations
  Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Trip.hasMany(Itinerary, { foreignKey: 'tripId', as: 'itineraries' });
  Trip.hasMany(ChatHistory, { foreignKey: 'tripId', as: 'chatHistory' });

  // Itinerary associations
  Itinerary.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
  Itinerary.hasMany(Activity, { foreignKey: 'itineraryId', as: 'activities' });

  // Activity associations
  Activity.belongsTo(Itinerary, { foreignKey: 'itineraryId', as: 'itinerary' });

  // ChatHistory associations
  ChatHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  ChatHistory.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
};

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    defineAssociations();
    
    if (process.env.NODE_ENV === 'development') {
      await sequelize.sync({ alter: true });
    }
    
    return sequelize;
  } catch (error) {
    console.error('Database connection failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDatabase,
  defineAssociations
};