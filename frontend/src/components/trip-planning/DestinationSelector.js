// src/components/trip-planning/DestinationSelector.js
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { MagnifyingGlassIcon, MapPinIcon } from '@heroicons/react/24/outline';

const popularDestinations = [
  { name: 'Paris, France', coordinates: { lat: 48.8566, lng: 2.3522 }, country: 'France' },
  { name: 'Tokyo, Japan', coordinates: { lat: 35.6762, lng: 139.6503 }, country: 'Japan' },
  { name: 'New York, USA', coordinates: { lat: 40.7128, lng: -74.0060 }, country: 'USA' },
  { name: 'London, UK', coordinates: { lat: 51.5074, lng: -0.1278 }, country: 'UK' },
  { name: 'Rome, Italy', coordinates: { lat: 41.9028, lng: 12.4964 }, country: 'Italy' },
  { name: 'Barcelona, Spain', coordinates: { lat: 41.3851, lng: 2.1734 }, country: 'Spain' },
  { name: 'Dubai, UAE', coordinates: { lat: 25.2048, lng: 55.2708 }, country: 'UAE' },
  { name: 'Bali, Indonesia', coordinates: { lat: -8.3405, lng: 115.0920 }, country: 'Indonesia' }
];

const DestinationSelector = ({ selected, onSelect }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const searchRef = useRef(null);

  useEffect(() => {
    if (searchQuery.length > 2) {
      // Filter popular destinations or implement API search
      const filtered = popularDestinations.filter(dest =>
        dest.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(filtered);
      setShowDropdown(true);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
    }
  }, [searchQuery]);

  const handleSelect = (destination) => {
    onSelect(destination);
    setSearchQuery(destination.name);
    setShowDropdown(false);
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Where do you want to go?</h2>
        <p className="text-gray-600">Choose your dream destination</p>
      </div>

      {/* Search Input */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <MagnifyingGlassIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search for a destination..."
            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Search Results Dropdown */}
        {showDropdown && searchResults.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto"
          >
            {searchResults.map((destination, index) => (
              <button
                key={index}
                onClick={() => handleSelect(destination)}
                className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3 border-b border-gray-100 last:border-b-0"
              >
                <MapPinIcon className="w-4 h-4 text-gray-400" />
                <span className="text-gray-900">{destination.name}</span>
              </button>
            ))}
          </motion.div>
        )}
      </div>

      {/* Popular Destinations */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Popular Destinations</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {popularDestinations.map((destination, index) => (
            <motion.button
              key={index}
              onClick={() => handleSelect(destination)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selected?.name === destination.name
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300 hover:bg-gray-50'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex items-center space-x-2">
                <MapPinIcon className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900 text-sm">{destination.name}</span>
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Selected Destination Display */}
      {selected && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-blue-50 border border-blue-200 rounded-lg p-4"
        >
          <div className="flex items-center space-x-3">
            <MapPinIcon className="w-5 h-5 text-blue-600" />
            <div>
              <h4 className="font-semibold text-blue-900">Selected Destination</h4>
              <p className="text-blue-700">{selected.name}</p>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DestinationSelector;