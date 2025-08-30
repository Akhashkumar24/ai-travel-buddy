// src/components/dashboard/Dashboard.js
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  PlusIcon, 
  MapIcon, 
  ClockIcon, 
  CurrencyDollarIcon,
  WeatherIcon,
  ChatBubbleLeftRightIcon 
} from '@heroicons/react/24/outline';

import { apiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import TripCard from './TripCard';
import QuickActions from './QuickActions';
import WeatherWidget from '../tools/WeatherWidget';
import LoadingSpinner from '../common/LoadingSpinner';

const Dashboard = () => {
  const { user } = useAuth();
  const [selectedFilter, setSelectedFilter] = useState('all');

  // Fetch user trips
  const { data: tripsData, isLoading, error } = useQuery(
    ['trips', selectedFilter],
    () => apiService.getTrips({ 
      status: selectedFilter === 'all' ? undefined : selectedFilter,
      limit: 20 
    }),
    {
      refetchOnWindowFocus: false,
    }
  );

  const trips = tripsData?.data?.trips || [];

  // Get upcoming trips
  const upcomingTrips = trips.filter(trip => 
    new Date(trip.startDate) > new Date() && trip.status !== 'cancelled'
  ).slice(0, 3);

  // Get current trips
  const currentTrips = trips.filter(trip => {
    const now = new Date();
    return new Date(trip.startDate) <= now && new Date(trip.endDate) >= now;
  });

  // Filter options
  const filterOptions = [
    { value: 'all', label: 'All Trips', count: trips.length },
    { value: 'planning', label: 'Planning', count: trips.filter(t => t.status === 'planning').length },
    { value: 'confirmed', label: 'Confirmed', count: trips.filter(t => t.status === 'confirmed').length },
    { value: 'ongoing', label: 'Ongoing', count: trips.filter(t => t.status === 'ongoing').length },
    { value: 'completed', label: 'Completed', count: trips.filter(t => t.status === 'completed').length },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Something went wrong</h2>
          <p className="text-gray-600 mb-4">Unable to load your dashboard</p>
          <button 
            onClick={() => window.location.reload()} 
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <motion.div 
      className="min-h-screen bg-gray-50 py-8"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div className="mb-8" variants={itemVariants}>
          <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl p-6 text-white">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-3xl font-bold mb-2">
                  Welcome back, {user?.firstName}! ✈️
                </h1>
                <p className="text-blue-100 text-lg">
                  Ready for your next adventure?
                </p>
              </div>
              <div className="mt-4 md:mt-0">
                <Link
                  to="/plan-trip"
                  className="bg-white text-blue-600 hover:bg-gray-100 px-6 py-3 rounded-lg font-medium inline-flex items-center transition-colors"
                >
                  <PlusIcon className="w-5 h-5 mr-2" />
                  Plan New Trip
                </Link>
              </div>
            </div>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Current Trips */}
            {currentTrips.length > 0 && (
              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <ClockIcon className="w-6 h-6 mr-2 text-green-500" />
                  Current Trips
                </h2>
                <div className="space-y-4">
                  {currentTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} isCurrentTrip={true} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* Upcoming Trips */}
            {upcomingTrips.length > 0 && (
              <motion.section variants={itemVariants}>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                  <MapIcon className="w-6 h-6 mr-2 text-blue-500" />
                  Upcoming Trips
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {upcomingTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              </motion.section>
            )}

            {/* All Trips */}
            <motion.section variants={itemVariants}>
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-4 sm:mb-0">
                  All Trips
                </h2>
                
                {/* Filter Tabs */}
                <div className="flex space-x-1 bg-gray-100 rounded-lg p-1">
                  {filterOptions.map(option => (
                    <button
                      key={option.value}
                      onClick={() => setSelectedFilter(option.value)}
                      className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        selectedFilter === option.value
                          ? 'bg-white text-blue-600 shadow-sm'
                          : 'text-gray-500 hover:text-gray-700'
                      }`}
                    >
                      {option.label} ({option.count})
                    </button>
                  ))}
                </div>
              </div>

              {trips.length === 0 ? (
                <div className="text-center py-12 bg-white rounded-lg border border-gray-200">
                  <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-gray-900 mb-2">
                    No trips found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Start planning your first adventure!
                  </p>
                  <Link
                    to="/plan-trip"
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md inline-flex items-center"
                  >
                    <PlusIcon className="w-5 h-5 mr-2" />
                    Plan Your First Trip
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {trips.map(trip => (
                    <TripCard key={trip.id} trip={trip} />
                  ))}
                </div>
              )}
            </motion.section>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <motion.div variants={itemVariants}>
              <QuickActions />
            </motion.div>

            {/* Weather Widget */}
            {upcomingTrips.length > 0 && (
              <motion.div variants={itemVariants}>
                <div className="bg-white rounded-lg shadow-sm p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
                    <WeatherIcon className="w-5 h-5 mr-2 text-blue-500" />
                    Upcoming Weather
                  </h3>
                  <WeatherWidget trip={upcomingTrips[0]} />
                </div>
              </motion.div>
            )}

            {/* Trip Stats */}
            <motion.div variants={itemVariants}>
              <div className="bg-white rounded-lg shadow-sm p-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Trip Statistics
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Total Trips</span>
                    <span className="font-semibold text-gray-900">{trips.length}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Countries Visited</span>
                    <span className="font-semibold text-gray-900">
                      {new Set(trips.map(t => t.destination.country)).size}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Completed Trips</span>
                    <span className="font-semibold text-gray-900">
                      {trips.filter(t => t.status === 'completed').length}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default Dashboard;