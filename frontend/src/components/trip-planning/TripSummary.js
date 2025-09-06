// src/components/trip-planning/TripSummary.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  UserGroupIcon,
  ClockIcon,
  HeartIcon,
  SparklesIcon,
  CheckCircleIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import { useCreateTrip } from '../../hooks/useTrips';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const TripSummary = ({ tripData, onTripCreate }) => {
  const navigate = useNavigate();
  const [tripTitle, setTripTitle] = useState('');
  const [tripDescription, setTripDescription] = useState('');
  const createTripMutation = useCreateTrip();

  const handleCreateTrip = async () => {
    if (!tripTitle.trim()) {
      toast.error('Please enter a trip title');
      return;
    }

    const tripPayload = {
      title: tripTitle,
      description: tripDescription,
      destination: tripData.destination,
      startDate: tripData.startDate,
      endDate: tripData.endDate,
      budget: tripData.budget,
      preferences: tripData.preferences
    };

    try {
      await createTripMutation.mutateAsync(tripPayload);
      toast.success('Trip created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create trip. Please try again.');
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getTripDuration = () => {
    if (!tripData.startDate || !tripData.endDate) return 0;
    const diffTime = Math.abs(new Date(tripData.endDate) - new Date(tripData.startDate));
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;
  };

  const getCurrencySymbol = (currency) => {
    const symbols = {
      'USD': '$',
      'EUR': '€',
      'GBP': '£',
      'JPY': '¥',
      'INR': '₹',
      'AUD': 'A$'
    };
    return symbols[currency] || currency;
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review Your Trip</h2>
        <p className="text-gray-600">Make sure everything looks perfect before we create your trip</p>
      </div>

      {/* Trip Title and Description */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Details</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              <PencilSquareIcon className="w-4 h-4 inline mr-1" />
              Trip Title *
            </label>
            <input
              type="text"
              value={tripTitle}
              onChange={(e) => setTripTitle(e.target.value)}
              placeholder={`My Trip to ${tripData.destination?.name || 'Amazing Place'}`}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Trip Description (Optional)
            </label>
            <textarea
              value={tripDescription}
              onChange={(e) => setTripDescription(e.target.value)}
              placeholder="Tell us about your upcoming adventure..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
          </div>
        </div>
      </div>

      {/* Trip Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Destination */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
              <MapPinIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-blue-900">Destination</h3>
          </div>
          <div>
            <p className="text-xl font-bold text-blue-900">{tripData.destination?.name}</p>
            <p className="text-blue-700 text-sm mt-1">{tripData.destination?.country}</p>
          </div>
        </motion.div>

        {/* Dates */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-green-50 border border-green-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
              <CalendarIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-green-900">Travel Dates</h3>
          </div>
          <div className="space-y-2">
            <div>
              <p className="text-sm text-green-700">Departure:</p>
              <p className="font-semibold text-green-900">{formatDate(tripData.startDate)}</p>
            </div>
            <div>
              <p className="text-sm text-green-700">Return:</p>
              <p className="font-semibold text-green-900">{formatDate(tripData.endDate)}</p>
            </div>
            <div className="bg-green-100 rounded-lg p-2 mt-3">
              <p className="text-sm text-green-800">
                <ClockIcon className="w-4 h-4 inline mr-1" />
                Duration: {getTripDuration()} days
              </p>
            </div>
          </div>
        </motion.div>

        {/* Budget */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-yellow-50 border border-yellow-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-yellow-600 rounded-lg flex items-center justify-center">
              <CurrencyDollarIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-yellow-900">Budget</h3>
          </div>
          <div>
            <p className="text-2xl font-bold text-yellow-900">
              {getCurrencySymbol(tripData.budget.currency)}{tripData.budget.total?.toLocaleString()}
            </p>
            <p className="text-yellow-700 text-sm mt-1">
              ~{getCurrencySymbol(tripData.budget.currency)}{Math.round(tripData.budget.total / getTripDuration())}/day
            </p>
          </div>
        </motion.div>

        {/* Preferences */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-purple-50 border border-purple-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
              <UserGroupIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-purple-900">Preferences</h3>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-purple-700">Travel Style:</span>
              <span className="font-medium text-purple-900 capitalize">{tripData.preferences.travelStyle}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-700">Group Size:</span>
              <span className="font-medium text-purple-900">{tripData.preferences.groupSize} people</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-purple-700">Pace:</span>
              <span className="font-medium text-purple-900 capitalize">{tripData.preferences.pace}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Interests */}
      {tripData.preferences.interests && tripData.preferences.interests.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-pink-50 border border-pink-200 rounded-2xl p-6"
        >
          <div className="flex items-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
              <HeartIcon className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-lg font-semibold text-pink-900">Your Interests</h3>
          </div>
          <div className="flex flex-wrap gap-2">
            {tripData.preferences.interests.map((interest, index) => (
              <span
                key={index}
                className="bg-pink-100 text-pink-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {interest}
              </span>
            ))}
          </div>
        </motion.div>
      )}

      {/* What's Next */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gray-50 border border-gray-200 rounded-2xl p-6"
      >
        <div className="flex items-center space-x-3 mb-4">
          <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
            <SparklesIcon className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900">What happens next?</h3>
        </div>
        <div className="space-y-3">
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">AI-Powered Itinerary</p>
              <p className="text-sm text-gray-600">We'll create a personalized day-by-day itinerary</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Smart Recommendations</p>
              <p className="text-sm text-gray-600">Get suggestions for activities, restaurants, and hidden gems</p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <CheckCircleIcon className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <p className="font-medium text-gray-900">Real-time Assistance</p>
              <p className="text-sm text-gray-600">Chat with your AI travel buddy anytime during your trip</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Create Trip Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-center"
      >
        <button
          onClick={handleCreateTrip}
          disabled={!tripTitle.trim() || createTripMutation.isLoading}
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white px-12 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed flex items-center space-x-3 mx-auto"
        >
          {createTripMutation.isLoading ? (
            <>
              <LoadingSpinner size="small" />
              <span>Creating Your Trip...</span>
            </>
          ) : (
            <>
              <SparklesIcon className="w-6 h-6" />
              <span>Create My Perfect Trip</span>
            </>
          )}
        </button>
        {!tripTitle.trim() && (
          <p className="text-red-500 text-sm mt-2">Please enter a trip title to continue</p>
        )}
      </motion.div>
    </div>
  );
};

export default TripSummary;