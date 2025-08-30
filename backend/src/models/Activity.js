// src/models/Activity.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  itineraryId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Itineraries',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT
  },
  location: {
    type: DataTypes.JSONB,
    validate: {
      isValidLocation(value) {
        if (value && (!value.name || !value.coordinates)) {
          throw new Error('Location must have name and coordinates');
        }
      }
    }
  },
  startTime: {
    type: DataTypes.TIME
  },
  duration: {
    type: DataTypes.STRING // e.g., "2 hours", "30 minutes"
  },
  estimatedCost: {
    type: DataTypes.DECIMAL(10, 2),
    defaultValue: 0
  },
  category: {
    type: DataTypes.STRING // e.g., "attraction", "restaurant", "transport"
  },
  notes: {
    type: DataTypes.TEXT
  },
  isCompleted: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['itineraryId']
    }
  ]
});

module.exports = Activity;