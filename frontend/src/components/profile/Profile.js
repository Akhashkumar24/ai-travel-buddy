// src/components/profile/Profile.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useAuth } from '../../hooks/useAuth';
import {
  UserCircleIcon,
  CameraIcon,
  PencilIcon,
  KeyIcon,
  MapIcon
} from '@heroicons/react/24/outline';
import LoadingSpinner from '../common/LoadingSpinner';
import TripHistory from './TripHistory';

const Profile = () => {
  const { user, updateProfile, changePassword } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const [profileForm, setProfileForm] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    preferences: user?.preferences || {}
  });

  const tabs = [
    { id: 'profile', name: 'Profile', icon: UserCircleIcon },
    { id: 'security', name: 'Security', icon: KeyIcon },
    { id: 'history', name: 'Trip History', icon: MapIcon }
  ];

  const handleProfileSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const result = await updateProfile(profileForm);
    
    if (result.success) {
      setIsEditing(false);
    }
    
    setLoading(false);
  };

  const handlePasswordSubmit = async (e) => {
    e.preventDefault();
    
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      toast.error('New passwords do not match');
      return;
    }
    
    setLoading(true);
    
    const result = await changePassword({
      currentPassword: passwordForm.currentPassword,
      newPassword: passwordForm.newPassword
    });
    
    if (result.success) {
      setPasswordForm({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
    }
    
    setLoading(false);
  };

  const renderProfileTab = () => (
    <div className="space-y-6">
      {/* Profile Picture */}
      <div className="flex items-center space-x-6">
        <div className="relative">
          {user?.profilePicture ? (
            <img
              src={user.profilePicture}
              alt="Profile"
              className="w-24 h-24 rounded-full object-cover"
            />
          ) : (
            <UserCircleIcon className="w-24 h-24 text-gray-400" />
          )}
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <CameraIcon className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {user?.firstName} {user?.lastName}
          </h3>
          <p className="text-gray-600">{user?.email}</p>
          <p className="text-sm text-gray-500">
            Member since {new Date(user?.createdAt).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Profile Form */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h4 className="text-lg font-medium text-gray-900">Personal Information</h4>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="flex items-center space-x-1 text-blue-600 hover:text-blue-700"
          >
            <PencilIcon className="w-4 h-4" />
            <span>{isEditing ? 'Cancel' : 'Edit'}</span>
          </button>
        </div>

        <form onSubmit={handleProfileSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                First Name
              </label>
              <input
                type="text"
                value={profileForm.firstName}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  firstName: e.target.value
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Last Name
              </label>
              <input
                type="text"
                value={profileForm.lastName}
                onChange={(e) => setProfileForm({
                  ...profileForm,
                  lastName: e.target.value
                })}
                disabled={!isEditing}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50 disabled:text-gray-500"
              />
            </div>
          </div>

          {/* Preferences */}
          <div className="mt-6">
            <h5 className="text-md font-medium text-gray-900 mb-3">Travel Preferences</h5>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Preferred Currency
                </label>
                <select
                  value={profileForm.preferences.currency || 'USD'}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    preferences: {
                      ...profileForm.preferences,
                      currency: e.target.value
                    }
                  })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                >
                  <option value="USD">USD ($)</option>
                  <option value="EUR">EUR (€)</option>
                  <option value="GBP">GBP (£)</option>
                  <option value="INR">INR (₹)</option>
                  <option value="JPY">JPY (¥)</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Travel Style
                </label>
                <select
                  value={profileForm.preferences.travelStyle || 'balanced'}
                  onChange={(e) => setProfileForm({
                    ...profileForm,
                    preferences: {
                      ...profileForm.preferences,
                      travelStyle: e.target.value
                    }
                  })}
                  disabled={!isEditing}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-50"
                >
                  <option value="budget">Budget Explorer</option>
                  <option value="balanced">Balanced Traveler</option>
                  <option value="luxury">Luxury Seeker</option>
                </select>
              </div>
            </div>
          </div>

          {isEditing && (
            <div className="mt-6">
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
              >
                {loading ? <LoadingSpinner size="small" /> : 'Save Changes'}
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">Change Password</h4>
        <p className="text-gray-600">Keep your account secure with a strong password</p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              newPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="small" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'history' && <TripHistory />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;

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
  const totalSpent = completedTrips.reduce((sum, trip) => sum + (trip.budget?.total || 0), 0);

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

  const renderSecurityTab = () => (
    <div className="space-y-6">
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-2">Change Password</h4>
        <p className="text-gray-600">Keep your account secure with a strong password</p>
      </div>

      <form onSubmit={handlePasswordSubmit} className="space-y-4 max-w-md">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Current Password
          </label>
          <input
            type="password"
            value={passwordForm.currentPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              currentPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            New Password
          </label>
          <input
            type="password"
            value={passwordForm.newPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              newPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Confirm New Password
          </label>
          <input
            type="password"
            value={passwordForm.confirmPassword}
            onChange={(e) => setPasswordForm({
              ...passwordForm,
              confirmPassword: e.target.value
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md font-medium transition-colors disabled:opacity-50"
        >
          {loading ? <LoadingSpinner size="small" /> : 'Update Password'}
        </button>
      </form>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-lg shadow-sm overflow-hidden"
        >
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex space-x-8 px-6">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`py-4 px-1 border-b-2 font-medium text-sm flex items-center space-x-2 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <tab.icon className="w-4 h-4" />
                  <span>{tab.name}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {activeTab === 'profile' && renderProfileTab()}
            {activeTab === 'security' && renderSecurityTab()}
            {activeTab === 'history' && <TripHistory />}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Profile;