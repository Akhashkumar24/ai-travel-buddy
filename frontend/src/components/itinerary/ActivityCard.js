// src/components/itinerary/ActivityCard.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  StarIcon,
  InformationCircleIcon,
  CheckCircleIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const ActivityCard = ({ activity, currency, isFirst, isLast }) => {
  const [isCompleted, setIsCompleted] = useState(activity.isCompleted || false);
  const [showNotes, setShowNotes] = useState(false);

  const getCategoryColor = (category) => {
    const colors = {
      attraction: 'bg-blue-100 text-blue-800',
      restaurant: 'bg-green-100 text-green-800',
      transport: 'bg-yellow-100 text-yellow-800',
      shopping: 'bg-purple-100 text-purple-800',
      entertainment: 'bg-pink-100 text-pink-800',
      other: 'bg-gray-100 text-gray-800'
    };
    return colors[category] || colors.other;
  };

  const getCategoryIcon = (category) => {
    const icons = {
      attraction: StarIcon,
      restaurant: '🍽️',
      transport: '🚗',
      shopping: '🛍️',
      entertainment: '🎭',
      other: InformationCircleIcon
    };
    return icons[category] || icons.other;
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
      className="relative"
    >
      {/* Timeline Line */}
      {!isLast && (
        <div className="absolute left-6 top-16 w-0.5 h-full bg-gray-200 -z-10"></div>
      )}

      <div className="flex items-start space-x-4">
        {/* Time Indicator */}
        <div className="flex-shrink-0 bg-white border-2 border-gray-300 rounded-full p-2">
          <ClockIcon className="w-4 h-4 text-gray-600" />
        </div>

        {/* Activity Card */}
        <div className={`flex-1 bg-white rounded-lg shadow-sm border border-gray-200 p-6 ${
          isCompleted ? 'opacity-75' : ''
        }`}>
          <div className="flex justify-between items-start mb-4">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-2">
                {activity.startTime && (
                  <span className="text-sm font-medium text-gray-900 bg-gray-100 px-2 py-1 rounded">
                    {activity.startTime}
                  </span>
                )}
                {activity.duration && (
                  <span className="text-sm text-gray-600">
                    ({activity.duration})
                  </span>
                )}
                {activity.category && (
                  <span className={`text-xs px-2 py-1 rounded-full ${getCategoryColor(activity.category)}`}>
                    {activity.category}
                  </span>
                )}
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-1">
                {activity.title}
              </h4>
              
              {activity.description && (
                <p className="text-gray-600 text-sm mb-3">
                  {activity.description}
                </p>
              )}
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setIsCompleted(!isCompleted)}
                className={`p-1 rounded-full transition-colors ${
                  isCompleted 
                    ? 'text-green-600 hover:text-green-700'
                    : 'text-gray-400 hover:text-gray-600'
                }`}
                title={isCompleted ? 'Mark as incomplete' : 'Mark as completed'}
              >
                <CheckCircleIcon className="w-5 h-5" />
              </button>
              <button className="p-1 text-gray-400 hover:text-gray-600 rounded-full">
                <PencilIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Activity Details */}
          <div className="space-y-2">
            {activity.location && (
              <div className="flex items-center text-sm text-gray-600">
                <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">{activity.location.name}</span>
              </div>
            )}
            
            {activity.estimatedCost > 0 && (
              <div className="flex items-center text-sm text-gray-600">
                <CurrencyDollarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
                <span>{currency} {parseFloat(activity.estimatedCost).toFixed(0)}</span>
              </div>
            )}
          </div>

          {/* Notes */}
          {activity.notes && (
            <div className="mt-4">
              <button
                onClick={() => setShowNotes(!showNotes)}
                className="text-blue-600 hover:text-blue-700 text-sm font-medium"
              >
                {showNotes ? 'Hide' : 'Show'} Tips & Notes
              </button>
              
              {showNotes && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                  className="mt-2 bg-yellow-50 border border-yellow-200 rounded-lg p-3"
                >
                  <div className="flex items-start">
                    <InformationCircleIcon className="w-4 h-4 text-yellow-600 mr-2 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-yellow-800">{activity.notes}</p>
                  </div>
                </motion.div>
              )}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ActivityCard;