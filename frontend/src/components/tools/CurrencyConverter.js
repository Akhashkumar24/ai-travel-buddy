// src/components/tools/CurrencyConverter.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { CurrencyDollarIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const currencies = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'INR', name: 'Indian Rupee', symbol: '₹' },
  { code: 'AUD', name: 'Australian Dollar', symbol: 'A$' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
  { code: 'CHF', name: 'Swiss Franc', symbol: 'Fr' }
];

const CurrencyConverter = () => {
  const [fromCurrency, setFromCurrency] = useState('USD');
  const [toCurrency, setToCurrency] = useState('EUR');
  const [amount, setAmount] = useState('100');
  const [result, setResult] = useState(null);

  const convertMutation = useMutation(
    () => apiService.convertCurrency(fromCurrency, toCurrency, parseFloat(amount)),
    {
      onSuccess: (data) => {
        setResult(data.data.conversion);
      },
      onError: (error) => {
        console.error('Currency conversion error:', error);
      }
    }
  );

  const handleConvert = () => {
    if (amount && fromCurrency && toCurrency) {
      convertMutation.mutate();
    }
  };

  const swapCurrencies = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setResult(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <CurrencyDollarIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Currency Converter</h3>
      </div>

      <div className="space-y-4">
        {/* Amount Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Amount</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter amount"
          />
        </div>

        {/* Currency Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromCurrency}
              onChange={(e) => setFromCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toCurrency}
              onChange={(e) => setToCurrency(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {currencies.map(currency => (
                <option key={currency.code} value={currency.code}>
                  {currency.code} - {currency.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapCurrencies}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ArrowsRightLeftIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Convert Button */}
        <button
          onClick={handleConvert}
          disabled={!amount || convertMutation.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {convertMutation.isLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            'Convert'
          )}
        </button>

        {/* Result */}
        {result && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-4"
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-green-800">
                {currencies.find(c => c.code === result.from)?.symbol}{result.originalAmount} = {currencies.find(c => c.code === result.to)?.symbol}{result.convertedAmount}
              </div>
              <div className="text-sm text-green-600 mt-1">
                Rate: 1 {result.from} = {result.rate.toFixed(4)} {result.to}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;