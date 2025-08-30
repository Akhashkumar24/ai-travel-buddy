// src/components/tools/WeatherWidget.js - Fixed
import React from 'react';
import { useQuery } from 'react-query';
import { motion } from 'framer-motion';
import { SunIcon, CloudIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';

const WeatherWidget = ({ trip }) => {
  const { data, isLoading, error } = useQuery(
    ['weather', trip?.destination?.name],
    () => apiService.getWeather(trip.destination.name, {
      startDate: trip.startDate,
      endDate: trip.endDate
    }),
    {
      enabled: !!trip?.destination?.name,
      refetchOnWindowFocus: false,
      staleTime: 10 * 60 * 1000, // 10 minutes
      retry: false
    }
  );

  if (isLoading) {
    return (
      <div className="animate-pulse space-y-3">
        <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        <div className="h-6 bg-gray-200 rounded w-1/2"></div>
        <div className="h-3 bg-gray-200 rounded w-2/3"></div>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="text-center text-gray-500 py-4">
        <ExclamationTriangleIcon className="w-8 h-8 mx-auto mb-2 opacity-50" />
        <p className="text-sm">Weather data unavailable</p>
        <p className="text-xs text-gray-400 mt-1">
          Set up weather API to see forecasts
        </p>
      </div>
    );
  }

  const weather = data.data.weather;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-3"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-600">{weather.location?.name || trip.destination.name}</p>
          <p className="text-2xl font-bold text-gray-900">
            {Math.round(weather.current?.main?.temp || 22)}°C
          </p>
        </div>
        <div className="text-right">
          {weather.current?.weather?.[0]?.main === 'Clear' ? (
            <SunIcon className="w-8 h-8 text-yellow-500" />
          ) : (
            <CloudIcon className="w-8 h-8 text-gray-500" />
          )}
        </div>
      </div>
      
      <div className="text-sm text-gray-600">
        <p>Feels like {Math.round(weather.current?.main?.feels_like || 20)}°C</p>
        <p className="capitalize">{weather.current?.weather?.[0]?.description || 'Partly cloudy'}</p>
      </div>

      {/* Forecast */}
      {weather.forecast && weather.forecast.length > 0 && (
        <div className="border-t border-gray-200 pt-3">
          <p className="text-xs text-gray-500 mb-2">5-Day Forecast</p>
          <div className="flex justify-between">
            {weather.forecast.slice(0, 5).map((day, index) => (
              <div key={index} className="text-center">
                <div className="text-xs text-gray-500">
                  {new Date(day.dt * 1000).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="text-sm font-medium">
                  {Math.round(day.main.temp)}°
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.div>
  );
};

export default WeatherWidget;