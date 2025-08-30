// src/components/dashboard/TripCard.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { format, differenceInDays } from 'date-fns';
import {
  CalendarIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  ClockIcon,
  EyeIcon,
  PencilIcon
} from '@heroicons/react/24/outline';

const TripCard = ({ trip, isCurrentTrip = false }) => {
  const formatDate = (date) => format(new Date(date), 'MMM dd, yyyy');
  const tripDuration = differenceInDays(new Date(trip.endDate), new Date(trip.startDate)) + 1;
  
  const getStatusColor = (status) => {
    const colors = {
      planning: 'bg-yellow-100 text-yellow-800',
      confirmed: 'bg-blue-100 text-blue-800',
      ongoing: 'bg-green-100 text-green-800',
      completed: 'bg-gray-100 text-gray-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return colors[status] || colors.planning;
  };

  const getStatusIcon = (status) => {
    if (status === 'ongoing') {
      return <ClockIcon className="w-4 h-4" />;
    }
    return null;
  };

  return (
    <motion.div
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
      className={`bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow ${
        isCurrentTrip ? 'ring-2 ring-green-500' : ''
      }`}
    >
      {/* Trip Image */}
      <div className="relative h-48 bg-gradient-to-r from-blue-500 to-purple-600">
        {trip.coverImage ? (
          <img 
            src={trip.coverImage} 
            alt={trip.destination.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <div className="text-center text-white">
              <MapPinIcon className="w-12 h-12 mx-auto mb-2 opacity-80" />
              <h3 className="text-xl font-semibold">{trip.destination.name}</h3>
            </div>
          </div>
        )}
        
        {/* Status Badge */}
        <div className="absolute top-3 right-3">
          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getStatusColor(trip.status)}`}>
            {getStatusIcon(trip.status)}
            <span className="ml-1 capitalize">{trip.status}</span>
          </span>
        </div>

        {isCurrentTrip && (
          <div className="absolute top-3 left-3">
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
              <ClockIcon className="w-3 h-3 mr-1" />
              Current Trip
            </span>
          </div>
        )}
      </div>

      {/* Trip Details */}
      <div className="p-6">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-lg font-semibold text-gray-900 truncate pr-2">
            {trip.title}
          </h3>
          <div className="flex space-x-2">
            <Link
              to={`/trip/${trip.id}`}
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="View Trip"
            >
              <EyeIcon className="w-4 h-4" />
            </Link>
            <button
              className="p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors"
              title="Edit Trip"
            >
              <PencilIcon className="w-4 h-4" />
            </button>
          </div>
        </div>

        {trip.description && (
          <p className="text-gray-600 text-sm mb-4 line-clamp-2">
            {trip.description}
          </p>
        )}

        {/* Trip Info */}
        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <MapPinIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span className="truncate">{trip.destination.name}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <CalendarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {formatDate(trip.startDate)} - {formatDate(trip.endDate)} ({tripDuration} days)
            </span>
          </div>
          
          <div className="flex items-center text-sm text-gray-600">
            <CurrencyDollarIcon className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>
              {trip.budget.total > 0 
                ? `${trip.budget.currency} ${trip.budget.total.toLocaleString()}`
                : 'Budget not set'
              }
            </span>
          </div>
        </div>

        {/* Progress or Action */}
        {trip.status === 'planning' && (
          <div className="space-y-3">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Planning Progress</span>
              <span>60%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div className="bg-blue-600 h-2 rounded-full" style={{ width: '60%' }}></div>
            </div>
          </div>
        )}

        {trip.status === 'confirmed' && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              {differenceInDays(new Date(trip.startDate), new Date())} days to go
            </span>
            <Link
              to={`/trip/${trip.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Itinerary →
            </Link>
          </div>
        )}

        {trip.status === 'ongoing' && (
          <Link
            to={`/trip/${trip.id}`}
            className="block w-full bg-green-600 hover:bg-green-700 text-white text-center py-2 px-4 rounded-md text-sm font-medium transition-colors"
          >
            Continue Trip
          </Link>
        )}

        {trip.status === 'completed' && (
          <div className="flex justify-between items-center">
            <span className="text-sm text-gray-600">
              Completed {format(new Date(trip.endDate), 'MMM yyyy')}
            </span>
            <Link
              to={`/trip/${trip.id}`}
              className="text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              View Memories →
            </Link>
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default TripCard;