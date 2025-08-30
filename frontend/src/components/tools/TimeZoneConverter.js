// src/components/tools/TimeZoneConverter.js
import React, { useState } from 'react';
import { ClockIcon } from '@heroicons/react/24/outline';

const TimeZoneConverter = () => {
  const [sourceTime, setSourceTime] = useState('12:00');
  const [sourceZone, setSourceZone] = useState('UTC');
  const [targetZone, setTargetZone] = useState('America/New_York');

  const timeZones = [
    'UTC', 'America/New_York', 'America/Los_Angeles', 'Europe/London',
    'Europe/Paris', 'Asia/Tokyo', 'Asia/Shanghai', 'Australia/Sydney'
  ];

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Time</label>
          <input
            type="time"
            value={sourceTime}
            onChange={(e) => setSourceTime(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
          <select
            value={sourceZone}
            onChange={(e) => setSourceZone(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {timeZones.map(zone => (
              <option key={zone} value={zone}>{zone}</option>
            ))}
          </select>
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
        <select
          value={targetZone}
          onChange={(e) => setTargetZone(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          {timeZones.map(zone => (
            <option key={zone} value={zone}>{zone}</option>
          ))}
        </select>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-2 text-blue-800">
          <ClockIcon className="w-5 h-5" />
          <span className="font-semibold">Converted Time</span>
        </div>
        <p className="text-lg font-bold text-blue-900 mt-2">
          {sourceTime} {sourceZone} = {sourceTime} {targetZone}
        </p>
      </div>
    </div>
  );
};

// src/components/tools/TravelCalculator.js
export const TravelCalculator = () => {
  const [distance, setDistance] = useState('');
  const [fuelPrice, setFuelPrice] = useState('3.50');
  const [efficiency, setEfficiency] = useState('25');

  const calculateCost = () => {
    const dist = parseFloat(distance) || 0;
    const price = parseFloat(fuelPrice) || 0;
    const mpg = parseFloat(efficiency) || 1;
    return ((dist / mpg) * price).toFixed(2);
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distance (miles)</label>
          <input
            type="number"
            value={distance}
            onChange={(e) => setDistance(e.target.value)}
            placeholder="Enter distance"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Price ($/gallon)</label>
          <input
            type="number"
            step="0.01"
            value={fuelPrice}
            onChange={(e) => setFuelPrice(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>
      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Car Efficiency (MPG)</label>
        <input
          type="number"
          value={efficiency}
          onChange={(e) => setEfficiency(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="bg-green-50 border border-green-200 rounded-lg p-4">
        <h4 className="font-semibold text-green-800 mb-2">Trip Cost Estimate</h4>
        <p className="text-2xl font-bold text-green-900">${calculateCost()}</p>
        <p className="text-sm text-green-700">Total fuel cost for {distance} miles</p>
      </div>
    </div>
  );
};

// src/components/pages/ExploreDestinations.js
export const ExploreDestinations = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('all');

  const destinations = [
    {
      name: 'Paris, France',
      continent: 'Europe',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=400&q=80',
      description: 'City of Light and Romance',
      highlights: ['Eiffel Tower', 'Louvre Museum', 'Notre-Dame'],
      bestTime: 'April-June, September-October',
      averageCost: '$150-250/day'
    },
    {
      name: 'Tokyo, Japan',
      continent: 'Asia',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=400&q=80',
      description: 'Modern Metropolis Meets Tradition',
      highlights: ['Shibuya Crossing', 'Mount Fuji', 'Cherry Blossoms'],
      bestTime: 'March-May, September-November',
      averageCost: '$100-200/day'
    },
    {
      name: 'New York, USA',
      continent: 'North America',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=400&q=80',
      description: 'The City That Never Sleeps',
      highlights: ['Times Square', 'Central Park', 'Statue of Liberty'],
      bestTime: 'April-June, September-November',
      averageCost: '$200-350/day'
    }
  ];

  const filteredDestinations = destinations.filter(dest => {
    const matchesSearch = dest.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesContinent = selectedContinent === 'all' || dest.continent === selectedContinent;
    return matchesSearch && matchesContinent;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
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
        </div>

        {/* Search and Filters */}
        <div className="mb-8 flex flex-col md:flex-row gap-4">
          <input
            type="text"
            placeholder="Search destinations..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <select
            value={selectedContinent}
            onChange={(e) => setSelectedContinent(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Continents</option>
            <option value="Europe">Europe</option>
            <option value="Asia">Asia</option>
            <option value="North America">North America</option>
            <option value="South America">South America</option>
            <option value="Africa">Africa</option>
            <option value="Oceania">Oceania</option>
          </select>
        </div>

        {/* Destinations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredDestinations.map((destination, index) => (
            <div key={destination.name} className="bg-white rounded-2xl shadow-xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full text-xs font-medium">
                  {destination.continent}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{destination.name}</h3>
                <p className="text-gray-600 mb-4">{destination.description}</p>
                
                <div className="space-y-3 mb-4">
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Must See:</h4>
                    <p className="text-sm text-gray-600">{destination.highlights.join(', ')}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Best Time:</h4>
                    <p className="text-sm text-gray-600">{destination.bestTime}</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-900 mb-1">Average Cost:</h4>
                    <p className="text-sm text-gray-600">{destination.averageCost}</p>
                  </div>
                </div>
                
                <button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white py-3 rounded-lg font-medium transition-all duration-300 transform hover:scale-105">
                  Plan Trip Here
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// src/components/pages/About.js
export const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            About
            <br />
            <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              AI Travel Buddy
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your intelligent travel companion, powered by advanced AI to make every journey extraordinary.
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl border border-gray-100 p-12 mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Mission</h2>
          <p className="text-lg text-gray-700 leading-relaxed mb-8">
            We believe that everyone deserves to experience the joy of travel. Our AI-powered platform eliminates the stress and complexity of trip planning, making it possible for anyone to create personalized, memorable adventures around the world.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🤖 AI-Powered Intelligence</h3>
              <p className="text-gray-700">
                Our advanced AI analyzes millions of travel data points to provide personalized recommendations tailored to your unique preferences and style.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🌍 Global Coverage</h3>
              <p className="text-gray-700">
                From hidden local gems to world-famous landmarks, we provide insights and recommendations for destinations across the globe.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">💬 24/7 Support</h3>
              <p className="text-gray-700">
                Our AI travel assistant is always ready to help, whether you're planning your trip or need assistance while traveling.
              </p>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">🛠️ Smart Tools</h3>
              <p className="text-gray-700">
                Access powerful travel tools including weather forecasts, currency conversion, language translation, and budget planning.
              </p>
            </div>
          </div>
        </div>

        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to Start Your Journey?</h2>
          <p className="text-lg text-gray-600 mb-8">
            Join thousands of travelers who trust AI Travel Buddy to create unforgettable experiences.
          </p>
          <a
            href="/plan-trip"
            className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 inline-block"
          >
            Start Planning Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default TimeZoneConverter;