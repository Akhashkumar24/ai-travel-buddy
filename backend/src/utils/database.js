const sequelize = require('../config/database');
const User = require('../models/User');
const Trip = require('../models/Trip');
const Itinerary = require('../models/Itinerary');
const Activity = require('../models/Activity');
const ChatHistory = require('../models/ChatHistory');

const defineAssociations = () => {
  User.hasMany(Trip, { foreignKey: 'userId', as: 'trips' });
  User.hasMany(ChatHistory, { foreignKey: 'userId', as: 'chatHistory' });
  Trip.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  Trip.hasMany(Itinerary, { foreignKey: 'tripId', as: 'itineraries' });
  Trip.hasMany(ChatHistory, { foreignKey: 'tripId', as: 'chatHistory' });
  Itinerary.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
  Itinerary.hasMany(Activity, { foreignKey: 'itineraryId', as: 'activities' });
  Activity.belongsTo(Itinerary, { foreignKey: 'itineraryId', as: 'itinerary' });
  ChatHistory.belongsTo(User, { foreignKey: 'userId', as: 'user' });
  ChatHistory.belongsTo(Trip, { foreignKey: 'tripId', as: 'trip' });
};

const connectDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connection established successfully.');
    defineAssociations();
    
    // FORCE CREATE TABLES IN DEVELOPMENT
    console.log('🔄 Creating database tables...');
    await sequelize.sync({ force: true });
    console.log('✅ Database tables created successfully!');
    
    return sequelize;
  } catch (error) {
    console.error('❌ Database connection failed:', error);
    throw error;
  }
};

module.exports = { sequelize, connectDatabase, defineAssociations };
