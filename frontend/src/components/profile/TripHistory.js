// src/components/profile/TripHistory.js  
import React from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { MapPinIcon, CalendarIcon, CurrencyDollarIcon } from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const TripHistory = () => {
  const { data, isLoading, error } = useQuery(
    'trip-history',
    () => apiService.getTrips({ limit: 50 }),
    {
      refetchOnWindowFocus: false,
    }
  );

  if (isLoading) return <LoadingSpinner />;

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">Failed to load trip history</p>
      </div>
    );
  }

  const trips = data?.data?.trips || [];
  const completedTrips = trips.filter(trip => trip.status === 'completed');

  return (
    <div className="space-y-6">
      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-blue-600">{trips.length}</div>
          <div className="text-sm text-blue-800">Total Trips</div>
        </div>
        <div className="bg-green-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-green-600">{completedTrips.length}</div>
          <div className="text-sm text-green-800">Completed Trips</div>
        </div>
        <div className="bg-purple-50 rounded-lg p-4">
          <div className="text-2xl font-bold text-purple-600">
            {new Set(trips.map(t => t.destination?.country)).size}
          </div>
          <div className="text-sm text-purple-800">Countries Visited</div>
        </div>
      </div>

      {/* Trip List */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">All Trips</h4>
        {trips.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <MapPinIcon className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>No trips yet. Start planning your first adventure!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {trips.map((trip) => (
              <motion.div
                key={trip.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h5 className="font-semibold text-gray-900 mb-2">{trip.title}</h5>
                    
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex items-center">
                        <MapPinIcon className="w-4 h-4 mr-2" />
                        {trip.destination?.name}
                      </div>
                      <div className="flex items-center">
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        {format(new Date(trip.startDate), 'MMM dd, yyyy')} - {format(new Date(trip.endDate), 'MMM dd, yyyy')}
                      </div>
                      {trip.budget?.total > 0 && (
                        <div className="flex items-center">
                          <CurrencyDollarIcon className="w-4 h-4 mr-2" />
                          {trip.budget.currency} {trip.budget.total.toLocaleString()}
                        </div>
                      )}
                    </div>
                  </div>
                  
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                      trip.status === 'completed' ? 'bg-green-100 text-green-800' :
                      trip.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                      trip.status === 'confirmed' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {trip.status.charAt(0).toUpperCase() + trip.status.slice(1)}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TripHistory;