// src/components/itinerary/ItineraryView.js
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { motion } from 'framer-motion';
import { format, addDays } from 'date-fns';
import {
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  SparklesIcon,
  ChevronLeftIcon,
  ChevronRightIcon
} from '@heroicons/react/24/outline';

import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import DayPlanner from './DayPlanner';
import toast from 'react-hot-toast';

const ItineraryView = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [selectedDay, setSelectedDay] = useState(1);
  const [showItineraryGenerator, setShowItineraryGenerator] = useState(false);

  // Fetch trip data
  const { data: tripData, isLoading, error } = useQuery(
    ['trip', id],
    () => apiService.getTrip(id),
    {
      refetchOnWindowFocus: false,
    }
  );

  // Generate itinerary mutation
  const generateItineraryMutation = useMutation(
    () => apiService.generateItinerary(id),
    {
      onSuccess: () => {
        toast.success('Itinerary generated successfully!');
        queryClient.invalidateQueries(['trip', id]);
        setShowItineraryGenerator(false);
      },
      onError: (error) => {
        toast.error(error.response?.data?.message || 'Failed to generate itinerary');
      }
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error || !tripData?.data?.trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
          <p className="text-gray-600 mb-4">The trip you're looking for doesn't exist</p>
          <a href="/dashboard" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md">
            Back to Dashboard
          </a>
        </div>
      </div>
    );
  }

  const trip = tripData.data.trip;
  const itineraries = trip.itineraries || [];
  const tripDays = Math.ceil((new Date(trip.endDate) - new Date(trip.startDate)) / (1000 * 60 * 60 * 24)) + 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Trip Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{trip.title}</h1>
              <div className="flex flex-wrap items-center space-x-6 text-sm text-gray-600">
                <div className="flex items-center">
                  <MapPinIcon className="w-4 h-4 mr-1" />
                  {trip.destination.name}
                </div>
                <div className="flex items-center">
                  <CalendarIcon className="w-4 h-4 mr-1" />
                  {format(new Date(trip.startDate), 'MMM dd, yyyy')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}
                </div>
                <div className="flex items-center">
                  <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                  {trip.budget.currency} {trip.budget.total?.toLocaleString() || '0'}
                </div>
              </div>
            </div>
            
            <div className="mt-4 md:mt-0 flex space-x-3">
              {itineraries.length === 0 && (
                <button
                  onClick={() => generateItineraryMutation.mutate()}
                  disabled={generateItineraryMutation.isLoading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 flex items-center"
                >
                  {generateItineraryMutation.isLoading ? (
                    <LoadingSpinner size="small" className="mr-2" />
                  ) : (
                    <SparklesIcon className="w-4 h-4 mr-2" />
                  )}
                  Generate Itinerary
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {itineraries.length === 0 ? (
          /* No Itinerary State */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-12"
          >
            <div className="max-w-md mx-auto">
              <SparklesIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Ready to create your itinerary?
              </h3>
              <p className="text-gray-600 mb-6">
                Let our AI assistant create a personalized day-by-day itinerary for your trip to {trip.destination.name}.
              </p>
              <button
                onClick={() => generateItineraryMutation.mutate()}
                disabled={generateItineraryMutation.isLoading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors disabled:opacity-50 inline-flex items-center"
              >
                {generateItineraryMutation.isLoading ? (
                  <>
                    <LoadingSpinner size="small" className="mr-2" />
                    Generating...
                  </>
                ) : (
                  <>
                    <SparklesIcon className="w-5 h-5 mr-2" />
                    Generate My Itinerary
                  </>
                )}
              </button>
            </div>
          </motion.div>
        ) : (
          /* Itinerary Display */
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Day Navigation */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
                <h3 className="font-semibold text-gray-900 mb-4">Days</h3>
                <div className="space-y-2">
                  {Array.from({ length: tripDays }, (_, i) => i + 1).map((day) => {
                    const dayDate = addDays(new Date(trip.startDate), day - 1);
                    const dayItinerary = itineraries.find(it => it.day === day);
                    
                    return (
                      <button
                        key={day}
                        onClick={() => setSelectedDay(day)}
                        className={`w-full text-left p-3 rounded-lg transition-colors ${
                          selectedDay === day
                            ? 'bg-blue-50 border-2 border-blue-200'
                            : 'hover:bg-gray-50 border-2 border-transparent'
                        }`}
                      >
                        <div className="font-medium text-gray-900">Day {day}</div>
                        <div className="text-xs text-gray-600">
                          {format(dayDate, 'MMM dd, EEE')}
                        </div>
                        {dayItinerary && (
                          <div className="text-xs text-blue-600 mt-1">
                            {dayItinerary.activities?.length || 0} activities
                          </div>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Day Content */}
            <div className="lg:col-span-3">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center space-x-4">
                  <button
                    onClick={() => setSelectedDay(Math.max(1, selectedDay - 1))}
                    disabled={selectedDay === 1}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronLeftIcon className="w-4 h-4" />
                  </button>
                  
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Day {selectedDay}</h2>
                    <p className="text-gray-600">
                      {format(addDays(new Date(trip.startDate), selectedDay - 1), 'EEEE, MMMM dd, yyyy')}
                    </p>
                  </div>
                  
                  <button
                    onClick={() => setSelectedDay(Math.min(tripDays, selectedDay + 1))}
                    disabled={selectedDay === tripDays}
                    className="p-2 rounded-lg border border-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ChevronRightIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>

              <DayPlanner 
                trip={trip}
                day={selectedDay}
                itinerary={itineraries.find(it => it.day === selectedDay)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ItineraryView;