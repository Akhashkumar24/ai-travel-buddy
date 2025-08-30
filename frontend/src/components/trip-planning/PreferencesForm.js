// src/components/trip-planning/PreferencesForm.js
import React from 'react';
import { motion } from 'framer-motion';
import { 
  UserGroupIcon, 
  ClockIcon, 
  HeartIcon,
  SparklesIcon 
} from '@heroicons/react/24/outline';

const travelStyles = [
  { id: 'budget', label: 'Budget Explorer', description: 'Hostels, street food, free activities' },
  { id: 'balanced', label: 'Balanced Traveler', description: 'Mix of comfort and adventure' },
  { id: 'luxury', label: 'Luxury Seeker', description: 'Premium experiences and comfort' }
];

const paceOptions = [
  { id: 'relaxed', label: 'Relaxed', description: 'Take it slow, enjoy the moment' },
  { id: 'moderate', label: 'Moderate', description: 'Balanced mix of activities and rest' },
  { id: 'packed', label: 'Action-Packed', description: 'See and do as much as possible' }
];

const interestOptions = [
  'Art & Culture', 'Food & Dining', 'Adventure Sports', 'Nature & Wildlife',
  'History & Museums', 'Nightlife', 'Shopping', 'Photography',
  'Architecture', 'Local Markets', 'Beaches', 'Mountains',
  'Religious Sites', 'Music & Festivals', 'Wellness & Spa', 'Technology'
];

const PreferencesForm = ({ preferences, onPreferencesChange }) => {
  const updatePreference = (key, value) => {
    onPreferencesChange({
      ...preferences,
      [key]: value
    });
  };

  const toggleInterest = (interest) => {
    const interests = preferences.interests || [];
    const newInterests = interests.includes(interest)
      ? interests.filter(i => i !== interest)
      : [...interests, interest];
    
    updatePreference('interests', newInterests);
  };

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Tell us about your preferences</h2>
        <p className="text-gray-600">This helps us personalize your travel experience</p>
      </div>

      {/* Travel Style */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <SparklesIcon className="w-4 h-4 inline mr-1" />
          Travel Style
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {travelStyles.map((style) => (
            <motion.button
              key={style.id}
              onClick={() => updatePreference('travelStyle', style.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                preferences.travelStyle === style.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-gray-900">{style.label}</div>
              <div className="text-sm text-gray-600 mt-1">{style.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Group Size */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <UserGroupIcon className="w-4 h-4 inline mr-1" />
          Group Size
        </label>
        <div className="flex items-center space-x-4">
          <input
            type="range"
            min="1"
            max="10"
            value={preferences.groupSize || 1}
            onChange={(e) => updatePreference('groupSize', parseInt(e.target.value))}
            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
          <div className="bg-blue-100 text-blue-800 px-3 py-1 rounded-lg font-semibold min-w-[60px] text-center">
            {preferences.groupSize || 1} {(preferences.groupSize || 1) === 1 ? 'person' : 'people'}
          </div>
        </div>
      </div>

      {/* Travel Pace */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <ClockIcon className="w-4 h-4 inline mr-1" />
          Travel Pace
        </label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paceOptions.map((pace) => (
            <motion.button
              key={pace.id}
              onClick={() => updatePreference('pace', pace.id)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                preferences.pace === pace.id
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-gray-900">{pace.label}</div>
              <div className="text-sm text-gray-600 mt-1">{pace.description}</div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Interests */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          <HeartIcon className="w-4 h-4 inline mr-1" />
          What interests you? (Select all that apply)
        </label>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {interestOptions.map((interest) => (
            <motion.button
              key={interest}
              onClick={() => toggleInterest(interest)}
              className={`p-3 rounded-lg border-2 transition-all text-sm ${
                (preferences.interests || []).includes(interest)
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300 text-gray-700'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {interest}
            </motion.button>
          ))}
        </div>
        {(preferences.interests || []).length > 0 && (
          <div className="mt-3 text-sm text-gray-600">
            Selected: {(preferences.interests || []).length} interest{(preferences.interests || []).length !== 1 ? 's' : ''}
          </div>
        )}
      </div>
    </div>
  );
};

export default PreferencesForm;