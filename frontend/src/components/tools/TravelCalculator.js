// src/components/tools/TravelCalculator.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  CalculatorIcon,
  MapPinIcon,
  ClockIcon,
  CurrencyDollarIcon,
  TruckIcon,
  PaperAirplaneIcon
} from '@heroicons/react/24/outline';

const TravelCalculator = () => {
  const [calculatorType, setCalculatorType] = useState('fuel');
  const [fuelData, setFuelData] = useState({
    distance: '',
    fuelPrice: '3.50',
    efficiency: '25'
  });
  const [flightData, setFlightData] = useState({
    adults: '2',
    basePrice: '300',
    taxes: '50'
  });
  const [budgetData, setBudgetData] = useState({
    days: '',
    dailyBudget: '',
    people: '1'
  });

  const calculatorTypes = [
    { id: 'fuel', name: 'Fuel Cost', icon: TruckIcon },
    { id: 'flight', name: 'Flight Cost', icon: PaperAirplaneIcon },
    { id: 'budget', name: 'Trip Budget', icon: CurrencyDollarIcon }
  ];

  const calculateFuelCost = () => {
    const distance = parseFloat(fuelData.distance) || 0;
    const price = parseFloat(fuelData.fuelPrice) || 0;
    const mpg = parseFloat(fuelData.efficiency) || 1;
    return ((distance / mpg) * price).toFixed(2);
  };

  const calculateFlightCost = () => {
    const adults = parseInt(flightData.adults) || 0;
    const base = parseFloat(flightData.basePrice) || 0;
    const taxes = parseFloat(flightData.taxes) || 0;
    return (adults * (base + taxes)).toFixed(2);
  };

  const calculateTotalBudget = () => {
    const days = parseInt(budgetData.days) || 0;
    const daily = parseFloat(budgetData.dailyBudget) || 0;
    const people = parseInt(budgetData.people) || 1;
    return (days * daily * people).toFixed(2);
  };

  const renderFuelCalculator = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Distance (miles)</label>
          <input
            type="number"
            value={fuelData.distance}
            onChange={(e) => setFuelData({...fuelData, distance: e.target.value})}
            placeholder="Enter distance"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Fuel Price ($/gallon)</label>
          <input
            type="number"
            step="0.01"
            value={fuelData.fuelPrice}
            onChange={(e) => setFuelData({...fuelData, fuelPrice: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Car Efficiency (MPG)</label>
          <input
            type="number"
            value={fuelData.efficiency}
            onChange={(e) => setFuelData({...fuelData, efficiency: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-green-50 border border-green-200 rounded-lg p-4"
      >
        <h4 className="font-semibold text-green-800 mb-2">Trip Fuel Cost</h4>
        <p className="text-3xl font-bold text-green-900">${calculateFuelCost()}</p>
        <p className="text-sm text-green-700">Total fuel cost for {fuelData.distance} miles</p>
      </motion.div>
    </div>
  );

  const renderFlightCalculator = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of Adults</label>
          <input
            type="number"
            value={flightData.adults}
            onChange={(e) => setFlightData({...flightData, adults: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Base Price ($)</label>
          <input
            type="number"
            value={flightData.basePrice}
            onChange={(e) => setFlightData({...flightData, basePrice: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Taxes & Fees ($)</label>
          <input
            type="number"
            value={flightData.taxes}
            onChange={(e) => setFlightData({...flightData, taxes: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-blue-50 border border-blue-200 rounded-lg p-4"
      >
        <h4 className="font-semibold text-blue-800 mb-2">Total Flight Cost</h4>
        <p className="text-3xl font-bold text-blue-900">${calculateFlightCost()}</p>
        <p className="text-sm text-blue-700">For {flightData.adults} adult{flightData.adults != 1 ? 's' : ''}</p>
      </motion.div>
    </div>
  );

  const renderBudgetCalculator = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trip Duration (days)</label>
          <input
            type="number"
            value={budgetData.days}
            onChange={(e) => setBudgetData({...budgetData, days: e.target.value})}
            placeholder="Enter days"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Daily Budget ($)</label>
          <input
            type="number"
            value={budgetData.dailyBudget}
            onChange={(e) => setBudgetData({...budgetData, dailyBudget: e.target.value})}
            placeholder="Per person per day"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Number of People</label>
          <input
            type="number"
            value={budgetData.people}
            onChange={(e) => setBudgetData({...budgetData, people: e.target.value})}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-purple-50 border border-purple-200 rounded-lg p-4"
      >
        <h4 className="font-semibold text-purple-800 mb-2">Total Trip Budget</h4>
        <p className="text-3xl font-bold text-purple-900">${calculateTotalBudget()}</p>
        <p className="text-sm text-purple-700">
          For {budgetData.people} person{budgetData.people != 1 ? 's' : ''} for {budgetData.days} day{budgetData.days != 1 ? 's' : ''}
        </p>
        
        {budgetData.days && budgetData.dailyBudget && budgetData.people && (
          <div className="mt-4 pt-4 border-t border-purple-200">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="text-purple-700">Per person total:</span>
                <span className="font-medium text-purple-900 ml-2">
                  ${(parseFloat(budgetData.dailyBudget) * parseInt(budgetData.days)).toFixed(2)}
                </span>
              </div>
              <div>
                <span className="text-purple-700">Per day total:</span>
                <span className="font-medium text-purple-900 ml-2">
                  ${(parseFloat(budgetData.dailyBudget) * parseInt(budgetData.people)).toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Calculator Type Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Calculator Type</label>
        <div className="flex space-x-2">
          {calculatorTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.id}
                onClick={() => setCalculatorType(type.id)}
                className={`flex-1 flex items-center justify-center space-x-2 py-3 px-4 rounded-lg border-2 transition-all ${
                  calculatorType === type.id
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-200 hover:border-blue-300 text-gray-700'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{type.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Calculator Content */}
      <motion.div
        key={calculatorType}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {calculatorType === 'fuel' && renderFuelCalculator()}
        {calculatorType === 'flight' && renderFlightCalculator()}
        {calculatorType === 'budget' && renderBudgetCalculator()}
      </motion.div>
    </div>
  );
};

export default TravelCalculator;