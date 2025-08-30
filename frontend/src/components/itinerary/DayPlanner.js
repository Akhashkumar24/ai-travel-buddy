// frontend/src/components/itinerary/DayPlanner.js - Fixed version
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import {
  ClockIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  StarIcon,
  InformationCircleIcon
} from '@heroicons/react/24/outline';
import ActivityCard from './ActivityCard';

const DayPlanner = ({ trip, day, itinerary }) => {
  if (!itinerary || !itinerary.activities || itinerary.activities.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-8 text-center"
      >
        <ClockIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-gray-900 mb-2">
          No activities planned for Day {day}
        </h3>
        <p className="text-gray-600 mb-6">
          This day doesn't have any activities yet. The itinerary might still be generating.
        </p>
        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
          Add Activities
        </button>
      </motion.div>
    );
  }

  const totalEstimatedCost = itinerary.activities.reduce(
    (sum, activity) => sum + (parseFloat(activity.estimatedCost) || 0), 
    0
  );

  return (
    <div className="space-y-6">
      {/* Day Overview */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-lg shadow-sm p-6"
      >
        <div className="flex justify-between items-start mb-4">
          <div>
            {itinerary.theme && (
              <h3 className="text-lg font-semibold text-gray-900 mb-1">
                {itinerary.theme}
              </h3>
            )}
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <div className="flex items-center">
                <ClockIcon className="w-4 h-4 mr-1" />
                {itinerary.activities.length} activities
              </div>
              <div className="flex items-center">
                <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                {trip.budget.currency} {totalEstimatedCost.toFixed(0)}
              </div>
            </div>
          </div>
          
          <button className="text-blue-600 hover:text-blue-700 text-sm">
            Edit Day
          </button>
        </div>

        {itinerary.notes && (
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <div className="flex items-start">
              <InformationCircleIcon className="w-5 h-5 text-blue-400 mr-2 mt-0.5" />
              <p className="text-sm text-blue-800">{itinerary.notes}</p>
            </div>
          </div>
        )}
      </motion.div>

      {/* Activities Timeline */}
      <div className="space-y-4">
        {itinerary.activities
          .sort((a, b) => (a.startTime || '00:00').localeCompare(b.startTime || '00:00'))
          .map((activity, index) => (
            <ActivityCard 
              key={activity.id || index} 
              activity={activity} 
              currency={trip.budget.currency}
              isFirst={index === 0}
              isLast={index === itinerary.activities.length - 1}
            />
          ))}
      </div>

      {/* Day Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-gray-50 rounded-lg p-6"
      >
        <h4 className="font-semibold text-gray-900 mb-3">Day {day} Summary</h4>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-2xl font-bold text-blue-600">{itinerary.activities.length}</div>
            <div className="text-sm text-gray-600">Activities</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-green-600">
              {trip.budget.currency} {totalEstimatedCost.toFixed(0)}
            </div>
            <div className="text-sm text-gray-600">Estimated Cost</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-purple-600">
              {itinerary.activities.filter(a => a.category === 'attraction').length}
            </div>
            <div className="text-sm text-gray-600">Attractions</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-orange-600">
              {itinerary.activities.filter(a => a.category === 'restaurant').length}
            </div>
            <div className="text-sm text-gray-600">Dining</div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default DayPlanner;