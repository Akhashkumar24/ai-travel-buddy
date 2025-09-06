// src/components/pages/ExploreDestinations.js - Fixed JSX closing tag error
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  MagnifyingGlassIcon,
  MapPinIcon,
  StarIcon,
  CurrencyDollarIcon,
  SunIcon,
  CameraIcon,
  HeartIcon
} from '@heroicons/react/24/outline';

const ExploreDestinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');
  const [selectedBudget, setSelectedBudget] = useState('all');
  const [favorites, setFavorites] = useState(new Set());

  const destinations = [
    {
      id: 1,
      name: 'Paris, France',
      continent: 'Europe',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&q=80',
      description: 'City of Light and Romance',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
      bestTime: 'April-June, September-October',
      averageCost: '$150-250/day',
      budget: 'expensive',
      rating: 4.8,
      popularFor: ['Romance', 'Art', 'Culture', 'Food'],
      weather: '15-25°C'
    },
    {
      id: 2,
      name: 'Tokyo, Japan',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
      description: 'Modern Metropolis Meets Tradition',
      highlights: ['Shibuya Crossing', 'Mount Fuji', 'Cherry Blossoms'],
      bestTime: 'March-May, September-November',
      averageCost: '$100-200/day',
      budget: 'moderate',
      rating: 4.9,
      popularFor: ['Technology', 'Food', 'Culture', 'Shopping'],
      weather: '10-22°C'
    },
    {
      id: 3,
      name: 'New York, USA',
      continent: 'North America',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80',
      description: 'The City That Never Sleeps',
      highlights: ['Times Square', 'Central Park', 'Statue of Liberty'],
      bestTime: 'April-June, September-November',
      averageCost: '$200-350/day',
      budget: 'expensive',
      rating: 4.7,
      popularFor: ['Business', 'Entertainment', 'Art', 'Food'],
      weather: '5-28°C'
    },
    {
      id: 4,
      name: 'Bali, Indonesia',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=400&q=80',
      description: 'Tropical Paradise',
      highlights: ['Rice Terraces', 'Temples', 'Beaches'],
      bestTime: 'April-October',
      averageCost: '$30-80/day',
      budget: 'budget',
      rating: 4.6,
      popularFor: ['Relaxation', 'Nature', 'Spirituality', 'Adventure'],
      weather: '24-31°C'
    },
    {
      id: 5,
      name: 'Rome, Italy',
      continent: 'Europe',
      image: 'https://images.unsplash.com/photo-1552832230-c0197dd311b5?w=400&q=80',
      description: 'Eternal City of History',
      highlights: ['Colosseum', 'Vatican', 'Trevi Fountain'],
      bestTime: 'April-June, September-October',
      averageCost: '$100-200/day',
      budget: 'moderate',
      rating: 4.7,
      popularFor: ['History', 'Art', 'Food', 'Architecture'],
      weather: '8-28°C'
    },
    {
      id: 6,
      name: 'Cape Town, South Africa',
      continent: 'Africa',
      image: 'https://images.unsplash.com/photo-1580060839134-75a5edca2e99?w=400&q=80',
      description: 'Mother City with Stunning Views',
      highlights: ['Table Mountain', 'Wine Lands', 'Penguins'],
      bestTime: 'November-March',
      averageCost: '$50-120/day',
      budget: 'budget',
      rating: 4.5,
      popularFor: ['Nature', 'Wine', 'Adventure', 'Wildlife'],
      weather: '15-26°C'
    }
  ];

  const continents = ['all', 'Europe', 'Asia', 'North America', 'South America', 'Africa', 'Oceania'];
  const budgetRanges = [
    { value: 'all', label: 'All Budgets' },
    { value: 'budget', label: 'Budget ($30-80/day)' },
    { value: 'moderate', label: 'Moderate ($80-200/day)' },
    { value: 'expensive', label: 'Luxury ($200+/day)' }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dest.popularFor.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
    const matchesBudget = selectedBudget === 'all' || dest.budget === selectedBudget;
    return matchesSearch && matchesContinent && matchesBudget;
  });

  const toggleFavorite = (destId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(destId)) {
      newFavorites.delete(destId);
    } else {
      newFavorites.add(destId);
    }
    setFavorites(newFavorites);
  };

  const getBudgetColor = (budget) => {
    switch (budget) {
      case 'budget': return 'text-green-600';
      case 'moderate': return 'text-yellow-600';
      case 'expensive': return 'text-red-600';
      default: return 'text-gray-600';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <MapPinIcon className="w-4 h-4" />
            <span>Discover Amazing Places</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Explore Amazing
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Destinations
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover breathtaking places around the world and start planning your next adventure.
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-8 bg-white rounded-2xl shadow-lg border border-gray-100 p-6"
        >
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="relative flex-1">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search destinations, activities, or interests..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
            
            {/* Continent Filter */}
            <select
              value={selectedContinent}
              onChange={(e) => setSelectedContinent(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {continents.map(continent => (
                <option key={continent} value={continent}>
                  {continent === 'all' ? 'All Continents' : continent}
                </option>
              ))}
            </select>

            {/* Budget Filter */}
            <select
              value={selectedBudget}
              onChange={(e) => setSelectedBudget(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {budgetRanges.map(budget => (
                <option key={budget.value} value={budget.value}>
                  {budget.label}
                </option>
              ))}
            </select>
          </div>

          {/* Active Filters */}
          {(searchTerm || selectedContinent !== 'all' || selectedBudget !== 'all') && (
            <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t border-gray-200">
              <span className="text-sm text-gray-600">Active filters:</span>
              {searchTerm && (
                <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded text-xs">
                  Search: "{searchTerm}"
                </span>
              )}
              {selectedContinent !== 'all' && (
                <span className="bg-green-100 text-green-800 px-2 py-1 rounded text-xs">
                  {selectedContinent}
                </span>
              )}
              {selectedBudget !== 'all' && (
                <span className="bg-purple-100 text-purple-800 px-2 py-1 rounded text-xs">
                  {budgetRanges.find(b => b.value === selectedBudget)?.label}
                </span>
              )}
            </div>
          )}
        </motion.div>

        {/* Results Count */}
        <div className="mb-6 text-gray-600">
          Found {filteredDestinations.length} destination{filteredDestinations.length !== 1 ? 's' : ''}
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <motion.div
              key={destination.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {destination.continent}
                </div>
                <button
                  onClick={() => toggleFavorite(destination.id)}
                  className={`absolute top-4 right-4 p-2 rounded-full backdrop-blur-sm transition-colors ${
                    favorites.has(destination.id) 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/90 text-gray-600 hover:text-red-500'
                  }`}
                >
                  <HeartIcon className="w-4 h-4" />
                </button>
                <div className="absolute bottom-4 left-4 flex items-center space-x-1 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full">
                  <StarIcon className="w-4 h-4 text-yellow-500" />
                  <span className="text-sm font-medium">{destination.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                
                {/* Popular For Tags */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {destination.popularFor.slice(0, 3).map((tag, i) => (
                    <span key={i} className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs font-medium">
                      {tag}
                    </span>
                  ))}
                </div>
                
                {/* Details Grid */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <MapPinIcon className="w-4 h-4 mr-1" />
                      Must See:
                    </span>
                    <span className="text-gray-900 font-medium">{destination.highlights[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <SunIcon className="w-4 h-4 mr-1" />
                      Best Time:
                    </span>
                    <span className="text-gray-900 font-medium">{destination.bestTime.split(',')[0]}</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="flex items-center text-gray-600">
                      <CurrencyDollarIcon className="w-4 h-4 mr-1" />
                      Budget:
                    </span>
                    <span className={`font-medium ${getBudgetColor(destination.budget)}`}>
                      {destination.averageCost}
                    </span>
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="flex space-x-3">
                  <Link
                    to="/plan-trip"
                    state={{ destination: destination.name }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Plan Trip Here
                  </Link>
                  <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                    <CameraIcon className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Empty State */}
        {filteredDestinations.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <MapPinIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-gray-900 mb-4">No destinations found</h3>
            <p className="text-gray-600 mb-6 max-w-md mx-auto">
              Try adjusting your search terms or filters to discover more amazing destinations.
            </p>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedContinent('all');
                setSelectedBudget('all');
              }}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}

        {/* Popular Destinations Section */}
        {filteredDestinations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-16 bg-white rounded-3xl shadow-2xl border border-gray-100 p-12"
          >
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Planning Your Next Adventure?</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Let our AI travel assistant help you create the perfect itinerary for any destination.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <StarIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Personalized Recommendations</h3>
                <p className="text-gray-600">
                  Get tailored suggestions based on your interests, budget, and travel style.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <MapPinIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Smart Itineraries</h3>
                <p className="text-gray-600">
                  AI-powered day-by-day plans that optimize your time and budget.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <SunIcon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-time Support</h3>
                <p className="text-gray-600">
                  24/7 travel assistance with weather updates, translations, and local tips.
                </p>
              </div>
            </div>

            <div className="text-center mt-12">
              <Link
                to="/plan-trip"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
              >
                Start Planning Your Trip
              </Link>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ExploreDestinations;