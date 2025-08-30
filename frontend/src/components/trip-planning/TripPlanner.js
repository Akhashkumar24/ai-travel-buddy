import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation } from 'react-query';
import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import toast from 'react-hot-toast';

const TripPlanner = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    destination: { name: '', coordinates: { lat: 0, lng: 0 }, country: '' },
    startDate: '',
    endDate: '',
    budget: { total: 1000, currency: 'USD' },
    preferences: { travelStyle: 'balanced', interests: [], groupSize: 1, pace: 'moderate' }
  });

  const createTripMutation = useMutation(apiService.createTrip, {
    onSuccess: (data) => {
      toast.success('Trip created successfully!');
      navigate(`/trip/${data.data.trip.id}`);
    },
    onError: (error) => {
      toast.error('Failed to create trip');
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title || !formData.destination.name || !formData.startDate || !formData.endDate) {
      toast.error('Please fill in all required fields');
      return;
    }
    
    const tripData = {
      ...formData,
      startDate: new Date(formData.startDate),
      endDate: new Date(formData.endDate)
    };
    
    createTripMutation.mutate(tripData);
  };

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  if (createTripMutation.isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <LoadingSpinner size="large" />
          <p className="mt-4 text-lg text-gray-600">Creating your trip...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-2xl mx-auto px-4">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Plan Your Trip</h1>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Trip Title */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Trip Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleChange('title', e.target.value)}
                placeholder="My Amazing Trip"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Destination */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Destination</label>
              <input
                type="text"
                value={formData.destination.name}
                onChange={(e) => handleChange('destination', { 
                  name: e.target.value, 
                  coordinates: { lat: 0, lng: 0 }, 
                  country: e.target.value.split(',').pop()?.trim() || ''
                })}
                placeholder="Paris, France"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Dates */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Start Date</label>
                <input
                  type="date"
                  value={formData.startDate}
                  onChange={(e) => handleChange('startDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">End Date</label>
                <input
                  type="date"
                  value={formData.endDate}
                  onChange={(e) => handleChange('endDate', e.target.value)}
                  min={formData.startDate || new Date().toISOString().split('T')[0]}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Budget */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget</label>
              <div className="flex space-x-2">
                <select
                  value={formData.budget.currency}
                  onChange={(e) => handleChange('budget', { ...formData.budget, currency: e.target.value })}
                  className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="USD">USD $</option>
                  <option value="EUR">EUR €</option>
                  <option value="GBP">GBP £</option>
                  <option value="INR">INR ₹</option>
                </select>
                <input
                  type="number"
                  value={formData.budget.total}
                  onChange={(e) => handleChange('budget', { ...formData.budget, total: parseFloat(e.target.value) || 0 })}
                  placeholder="1000"
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Travel Style */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Travel Style</label>
              <select
                value={formData.preferences.travelStyle}
                onChange={(e) => handleChange('preferences', { ...formData.preferences, travelStyle: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="budget">Budget Explorer</option>
                <option value="balanced">Balanced Traveler</option>
                <option value="luxury">Luxury Seeker</option>
              </select>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={createTripMutation.isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-md font-medium transition-colors disabled:opacity-50"
            >
              {createTripMutation.isLoading ? 'Creating Trip...' : 'Create Trip'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default TripPlanner;
