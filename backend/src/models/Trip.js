// src/models/Trip.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trip = sequelize.define('Trip', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  userId: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id'
    }
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 100]
    }
  },
  description: {
    type: DataTypes.TEXT
  },
  destination: {
    type: DataTypes.JSONB,
    allowNull: false,
    validate: {
      isValidDestination(value) {
        if (!value.name || !value.coordinates) {
          throw new Error('Destination must have name and coordinates');
        }
      }
    }
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
    validate: {
      isAfterStartDate(value) {
        if (value <= this.startDate) {
          throw new Error('End date must be after start date');
        }
      }
    }
  },
  budget: {
    type: DataTypes.JSONB,
    defaultValue: {
      total: 0,
      currency: 'USD',
      breakdown: {
        accommodation: 0,
        food: 0,
        transport: 0,
        activities: 0,
        other: 0
      }
    }
  },
  preferences: {
    type: DataTypes.JSONB,
    defaultValue: {
      travelStyle: 'balanced',
      interests: [],
      groupSize: 1,
      pace: 'moderate'
    }
  },
  status: {
    type: DataTypes.ENUM('planning', 'confirmed', 'ongoing', 'completed', 'cancelled'),
    defaultValue: 'planning'
  },
  isPublic: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  },
  aiSuggestions: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  weatherData: {
    type: DataTypes.JSONB,
    defaultValue: {}
  },
  coverImage: {
    type: DataTypes.STRING
  }
}, {
  timestamps: true,
  indexes: [
    {
      fields: ['userId']
    },
    {
      fields: ['startDate']
    },
    {
      fields: ['status']
    }
  ]
});

module.exports = Trip;