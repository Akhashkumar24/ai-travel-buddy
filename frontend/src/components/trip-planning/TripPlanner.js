// src/components/trip-planning/TripPlanner.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation } from 'react-query';
import toast from 'react-hot-toast';

import { apiService } from '../../services/api';
import DestinationSelector from './DestinationSelector';
import DatePicker from './DatePicker';
import BudgetSelector from './BudgetSelector';
import PreferencesForm from './PreferencesForm';
import LoadingSpinner from '../common/LoadingSpinner';

import {
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  Cog6ToothIcon,
  CheckIcon,
  ArrowLeftIcon,
  ArrowRightIcon
} from '@heroicons/react/24/outline';

const steps = [
  { id: 1, name: 'Destination', icon: MapPinIcon },
  { id: 2, name: 'Dates', icon: CalendarIcon },
  { id: 3, name: 'Budget', icon: CurrencyDollarIcon },
  { id: 4, name: 'Preferences', icon: Cog6ToothIcon },
  { id: 5, name: 'Review', icon: CheckIcon }
];

const TripPlanner = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [tripData, setTripData] = useState({
    title: '',
    description: '',
    destination: null,
    startDate: null,
    endDate: null,
    budget: {
      total: 0,
      currency: 'USD',
      breakdown: {
        accommodation: 0,
        food: 0,
        transport: 0,
        activities: 0,
        other: 0
      }
    },
    preferences: {
      travelStyle: 'balanced',
      interests: [],
      groupSize: 1,
      pace: 'moderate'
    }
  });

  const createTripMutation = useMutation(apiService.createTrip, {
    onSuccess: (data) => {
      toast.success('Trip created successfully!');
      navigate(`/trip/${data.data.trip.id}`);
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || 'Failed to create trip');
    }
  });

  const updateTripData = (field, value) => {
    setTripData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const nextStep = () => {
    if (currentStep < steps.length) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return tripData.destination !== null;
      case 2:
        return tripData.startDate && tripData.endDate;
      case 3:
        return tripData.budget.total >= 0;
      case 4:
        return tripData.preferences.interests.length > 0;
      case 5:
        return tripData.title.trim().length > 0;
      default:
        return false;
    }
  };

  const handleSubmit = () => {
    if (!tripData.title.trim()) {
      updateTripData('title', `Trip to ${tripData.destination.name}`);
    }
    createTripMutation.mutate(tripData);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <DestinationSelector
            selected={tripData.destination}
            onSelect={(destination) => updateTripData('destination', destination)}
          />
        );
      case 2:
        return (
          <DatePicker
            startDate={tripData.startDate}
            endDate={tripData.endDate}
            onDateChange={(dates) => {
              updateTripData('startDate', dates.startDate);
              updateTripData('endDate', dates.endDate);
            }}
          />
        );
      case 3:
        return (
          <BudgetSelector
            budget={tripData.budget}
            onBudgetChange={(budget) => updateTripData('budget', budget)}
          />
        );
      case 4:
        return (
          <PreferencesForm
            preferences={tripData.preferences}
            onPreferencesChange={(preferences) => updateTripData('preferences', preferences)}
          />
        );
      case 5:
        return (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Trip Title
              </label>
              <input
                type="text"
                value={tripData.title}
                onChange={(e) => updateTripData('title', e.target.value)}
                placeholder={`Trip to ${tripData.destination?.name || 'Destination'}`}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description (Optional)
              </label>
              <textarea
                value={tripData.description}
                onChange={(e) => updateTripData('description', e.target.value)}
                placeholder="Tell us about your trip..."
                rows={4}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>

            {/* Trip Summary */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Trip Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-gray-600">Destination:</span>
                  <span className="font-medium">{tripData.destination?.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Dates:</span>
                  <span className="font-medium">
                    {tripData.startDate?.toLocaleDateString()} - {tripData.endDate?.toLocaleDateString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Duration:</span>
                  <span className="font-medium">
                    {Math.ceil((tripData.endDate - tripData.startDate) / (1000 * 60 * 60 * 24)) + 1} days
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Budget:</span>
                  <span className="font-medium">
                    {tripData.budget.currency} {tripData.budget.total.toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Travel Style:</span>
                  <span className="font-medium capitalize">{tripData.preferences.travelStyle}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Group Size:</span>
                  <span className="font-medium">{tripData.preferences.groupSize} people</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Interests:</span>
                  <span className="font-medium">{tripData.preferences.interests.join(', ')}</span>
                </div>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  if (createTripMutation.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Creating your trip...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Plan Your Trip</h1>
          <p className="text-gray-600">Let's create your perfect travel experience</p>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <nav aria-label="Progress">
            <ol className="flex items-center justify-between">
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative">
                  {stepIdx !== steps.length - 1 ? (
                    <div className="absolute top-4 left-4 -ml-px h-0.5 w-full bg-gray-300" aria-hidden="true">
                      <div
                        className="h-0.5 bg-blue-600 transition-all duration-500"
                        style={{ width: currentStep > step.id ? '100%' : '0%' }}
                      />
                    </div>
                  ) : null}
                  
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center transition-all duration-200 ${
                        currentStep > step.id
                          ? 'bg-blue-600 text-white'
                          : currentStep === step.id
                          ? 'bg-blue-600 text-white ring-4 ring-blue-200'
                          : 'bg-gray-300 text-gray-600'
                      }`}
                    >
                      {currentStep > step.id ? (
                        <CheckIcon className="w-4 h-4" />
                      ) : (
                        <step.icon className="w-4 h-4" />
                      )}
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      currentStep >= step.id ? 'text-gray-900' : 'text-gray-500'
                    }`}>
                      {step.name}
                    </span>
                  </div>
                </li>
              ))}
            </ol>
          </nav>
        </div>

        {/* Step Content */}
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStepContent()}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navigation */}
        <div className="flex justify-between">
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`inline-flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
              currentStep === 1
                ? 'text-gray-400 cursor-not-allowed'
                : 'text-gray-700 bg-white hover:bg-gray-50'
            }`}
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              disabled={!canProceed()}
              className={`inline-flex items-center px-4 py-2 border border-transparent rounded-md text-sm font-medium ${
                canProceed()
                  ? 'text-white bg-blue-600 hover:bg-blue-700'
                  : 'text-gray-400 bg-gray-200 cursor-not-allowed'
              }`}
            >
              Next
              <ArrowRightIcon className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={!canProceed() || createTripMutation.isLoading}
              className={`inline-flex items-center px-6 py-2 border border-transparent rounded-md text-sm font-medium ${
                canProceed() && !createTripMutation.isLoading
                  ? 'text-white bg-green-600 hover:bg-green-700'
                  : 'text-gray-400 bg-gray-200 cursor-not-allowed'
              }`}
            >
              {createTripMutation.isLoading ? (
                <>
                  <LoadingSpinner size="small" className="mr-2" />
                  Creating...
                </>
              ) : (
                <>
                  <CheckIcon className="w-4 h-4 mr-2" />
                  Create Trip
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;