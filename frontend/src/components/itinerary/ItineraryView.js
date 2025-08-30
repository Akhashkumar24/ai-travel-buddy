import React from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from 'react-query';
import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const ItineraryView = () => {
  const { id } = useParams();
  
  const { data: tripData, isLoading, error } = useQuery(
    ['trip', id],
    () => apiService.getTrip(id),
    { refetchOnWindowFocus: false }
  );

  if (isLoading) return <div className="min-h-screen flex items-center justify-center"><LoadingSpinner size="large" /></div>;
  
  if (error || !tripData?.data?.trip) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip not found</h2>
          <a href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-md">Back to Dashboard</a>
        </div>
      </div>
    );
  }

  const trip = tripData.data.trip;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">{trip.title}</h1>
          <p className="text-gray-600 mb-4">📍 {trip.destination?.name}</p>
          <p className="text-gray-600 mb-6">
            {new Date(trip.startDate).toLocaleDateString()} - {new Date(trip.endDate).toLocaleDateString()}
          </p>
          
          {trip.itineraries?.length > 0 ? (
            <div className="space-y-4">
              <h2 className="text-xl font-semibold">Itinerary</h2>
              {trip.itineraries.map((day, index) => (
                <div key={day.id} className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-semibold">Day {index + 1}</h3>
                  <p className="text-gray-600">{day.theme || 'Exploration'}</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p className="text-gray-600 mb-4">No itinerary yet</p>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-md">
                Generate Itinerary
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ItineraryView;
