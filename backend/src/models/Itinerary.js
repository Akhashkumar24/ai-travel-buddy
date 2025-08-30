// Fixed src/models/Itinerary.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Itinerary = sequelize.define('Itinerary', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  tripId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Trips',
      key: 'id'
    }
  },
  day: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  theme: {
    type: DataTypes.STRING,
    defaultValue: 'Exploration'
  },
  notes: {
    type: DataTypes.TEXT
  },
  estimatedCost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['tripId', 'day']
    }
  ]
});

module.exports = Itinerary;
