// src/components/trip-planning/BudgetSelector.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { CurrencyDollarIcon } from '@heroicons/react/24/outline';

const currencies = [
  { code: 'USD', symbol: ', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'AUD', symbol: 'A, name: 'Australian Dollar' }
];

const budgetPresets = {
  USD: [
    { label: 'Budget', range: '$50-100/day', min: 500, max: 1500 },
    { label: 'Mid-range', range: '$100-250/day', min: 1500, max: 3500 },
    { label: 'Luxury', range: '$250+/day', min: 3500, max: 10000 }
  ],
  EUR: [
    { label: 'Budget', range: '€45-90/day', min: 450, max: 1350 },
    { label: 'Mid-range', range: '€90-225/day', min: 1350, max: 3150 },
    { label: 'Luxury', range: '€225+/day', min: 3150, max: 9000 }
  ],
  INR: [
    { label: 'Budget', range: '₹2000-5000/day', min: 20000, max: 75000 },
    { label: 'Mid-range', range: '₹5000-12000/day', min: 75000, max: 180000 },
    { label: 'Luxury', range: '₹12000+/day', min: 180000, max: 500000 }
  ]
};

const BudgetSelector = ({ budget, onBudgetChange }) => {
  const [selectedCurrency, setSelectedCurrency] = useState(budget.currency || 'USD');
  const [customAmount, setCustomAmount] = useState(budget.total || '');
  const [selectedPreset, setSelectedPreset] = useState(null);

  const handleCurrencyChange = (currency) => {
    setSelectedCurrency(currency);
    onBudgetChange({
      ...budget,
      currency,
      total: customAmount || 0
    });
  };

  const handlePresetSelect = (preset, index) => {
    setSelectedPreset(index);
    const amount = (preset.min + preset.max) / 2;
    setCustomAmount(amount);
    onBudgetChange({
      ...budget,
      total: amount,
      currency: selectedCurrency
    });
  };

  const handleCustomAmountChange = (e) => {
    const amount = parseFloat(e.target.value) || 0;
    setCustomAmount(amount);
    setSelectedPreset(null);
    onBudgetChange({
      ...budget,
      total: amount,
      currency: selectedCurrency
    });
  };

  const currentPresets = budgetPresets[selectedCurrency] || budgetPresets.USD;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">What's your budget?</h2>
        <p className="text-gray-600">Set your travel budget to get personalized recommendations</p>
      </div>

      {/* Currency Selector */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Currency</label>
        <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
          {currencies.map((currency) => (
            <button
              key={currency.code}
              onClick={() => handleCurrencyChange(currency.code)}
              className={`p-3 rounded-lg border-2 transition-all text-center ${
                selectedCurrency === currency.code
                  ? 'border-blue-500 bg-blue-50 text-blue-700'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
            >
              <div className="font-semibold">{currency.symbol}</div>
              <div className="text-xs">{currency.code}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Budget Presets */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">Budget Range</label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {currentPresets.map((preset, index) => (
            <motion.button
              key={index}
              onClick={() => handlePresetSelect(preset, index)}
              className={`p-4 rounded-lg border-2 transition-all text-left ${
                selectedPreset === index
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-gray-200 hover:border-blue-300'
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="font-semibold text-gray-900">{preset.label}</div>
              <div className="text-sm text-gray-600">{preset.range}</div>
              <div className="text-xs text-gray-500 mt-1">
                Total: {currencies.find(c => c.code === selectedCurrency)?.symbol}{(preset.min + preset.max) / 2}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Custom Amount */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          <CurrencyDollarIcon className="w-4 h-4 inline mr-1" />
          Custom Amount (Total Trip Budget)
        </label>
        <div className="relative">
          <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
            {currencies.find(c => c.code === selectedCurrency)?.symbol}
          </span>
          <input
            type="number"
            value={customAmount}
            onChange={handleCustomAmountChange}
            placeholder="Enter your budget"
            className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Budget Summary */}
      {budget.total > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gray-50 rounded-lg p-4"
        >
          <h4 className="font-semibold text-gray-900 mb-2">Budget Breakdown (Suggested)</h4>
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-600">Accommodation (40%):</span>
              <span className="font-medium">{currencies.find(c => c.code === selectedCurrency)?.symbol}{(budget.total * 0.4).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Food (25%):</span>
              <span className="font-medium">{currencies.find(c => c.code === selectedCurrency)?.symbol}{(budget.total * 0.25).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Activities (20%):</span>
              <span className="font-medium">{currencies.find(c => c.code === selectedCurrency)?.symbol}{(budget.total * 0.2).toFixed(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Transport (15%):</span>
              <span className="font-medium">{currencies.find(c => c.code === selectedCurrency)?.symbol}{(budget.total * 0.15).toFixed(0)}</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
};

export default BudgetSelector;