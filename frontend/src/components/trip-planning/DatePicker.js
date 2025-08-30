// src/components/trip-planning/DatePicker.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CalendarIcon } from '@heroicons/react/24/outline';

const DatePicker = ({ startDate, endDate, onDateChange }) => {
  const [tempStartDate, setTempStartDate] = useState(
    startDate ? startDate.toISOString().split('T')[0] : ''
  );
  const [tempEndDate, setTempEndDate] = useState(
    endDate ? endDate.toISOString().split('T')[0] : ''
  );

  const handleStartDateChange = (e) => {
    const date = new Date(e.target.value);
    setTempStartDate(e.target.value);
    onDateChange({ startDate: date, endDate });
  };

  const handleEndDateChange = (e) => {
    const date = new Date(e.target.value);
    setTempEndDate(e.target.value);
    onDateChange({ startDate, endDate: date });
  };

  const today = new Date().toISOString().split('T')[0];
  const duration = startDate && endDate ? Math.ceil((endDate - startDate) / (1000 * 60 * 60 * 24)) + 1 : 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">When are you traveling?</h2>
        <p className="text-gray-600">Select your travel dates</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Start Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Departure Date
          </label>
          <input
            type="date"
            value={tempStartDate}
            onChange={handleStartDateChange}
            min={today}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* End Date */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <CalendarIcon className="w-4 h-4 inline mr-1" />
            Return Date
          </label>
          <input
            type="date"
            value={tempEndDate}
            onChange={handleEndDateChange}
            min={tempStartDate || today}
            className="w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Duration Display */}
      {duration > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-green-50 border border-green-200 rounded-lg p-4"
        >
          <div className="flex items-center justify-center space-x-2">
            <CalendarIcon className="w-5 h-5 text-green-600" />
            <span className="text-green-800 font-semibold">
              Trip Duration: {duration} day{duration !== 1 ? 's' : ''}
            </span>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default DatePicker;