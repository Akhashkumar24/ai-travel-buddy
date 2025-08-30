// backend/src/utils/database.js
const sequelize = require('../config/database');
const User = require('../models/User');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');
const ChatHistory = require('../models/ChatHistory');

/**
 * Define all Sequelize model associations
 */
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

/**
 * Connect to the database and define associations
 */
const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');

    // Define model associations
    defineAssociations();

    // Disable automatic syncing in development to prevent enum conflicts
    if (process.env.NODE_ENV === 'development') {
      console.log('⚠️ Development mode: Sequelize will NOT auto-sync. Run SQL scripts manually.');
      // await sequelize.sync({ alter: true }); // Removed to prevent enum errors
    }

    return sequelize;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

module.exports = {
  sequelize,
  connectDatabase,
  defineAssociations
};
