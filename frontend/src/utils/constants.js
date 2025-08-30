// src/utils/constants.js
export const API_ENDPOINTS = {
  AUTH: '/auth',
  TRIPS: '/trips',
  CHAT: '/chat',
  TOOLS: '/tools',
  USERS: '/users'
};

export const TRIP_STATUS = {
  PLANNING: 'planning',
  CONFIRMED: 'confirmed',
  ONGOING: 'ongoing',
  COMPLETED: 'completed',
  CANCELLED: 'cancelled'
};

export const CURRENCIES = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' }
];

export const TRAVEL_STYLES = [
  { id: 'budget', label: 'Budget Explorer' },
  { id: 'balanced', label: 'Balanced Traveler' },
  { id: 'luxury', label: 'Luxury Seeker' }
];