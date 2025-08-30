// src/components/pages/TravelTools.js - Comprehensive Travel Tools
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {
  CloudIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  MapPinIcon,
  CalendarIcon,
  ClockIcon,
  GlobeAltIcon,
  CameraIcon
} from '@heroicons/react/24/outline';

// Import tool components
import WeatherWidget from '../tools/WeatherWidget';
import CurrencyConverter from '../tools/CurrencyConverter';
import Translator from '../tools/Translator';
import TimeZoneConverter from '../tools/TimeZoneConverter';
import TravelCalculator from '../tools/TravelCalculator';

const TravelTools = () => {
  const [activeTools, setActiveTools] = useState(new Set(['weather', 'currency']));

  const tools = [
    {
      id: 'weather',
      name: 'Weather Forecast',
      description: 'Check weather conditions for any destination',
      icon: CloudIcon,
      color: 'from-blue-400 to-blue-600',
      component: WeatherWidget
    },
    {
      id: 'currency',
      name: 'Currency Converter',
      description: 'Convert between currencies with live rates',
      icon: CurrencyDollarIcon,
      color: 'from-green-400 to-green-600',
      component: CurrencyConverter
    },
    {
      id: 'translator',
      name: 'Language Translator',
      description: 'Translate text to any language instantly',
      icon: LanguageIcon,
      color: 'from-purple-400 to-purple-600',
      component: Translator
    },
    {
      id: 'timezone',
      name: 'Time Zone Converter',
      description: 'Convert times across different time zones',
      icon: ClockIcon,
      color: 'from-orange-400 to-orange-600',
      component: TimeZoneConverter
    },
    {
      id: 'calculator',
      name: 'Travel Calculator',
      description: 'Calculate distances, costs, and travel time',
      icon: CalendarIcon,
      color: 'from-red-400 to-red-600',
      component: TravelCalculator
    },
    {
      id: 'explorer',
      name: 'Local Explorer',
      description: 'Discover attractions and places nearby',
      icon: MapPinIcon,
      color: 'from-teal-400 to-teal-600',
      component: null
    }
  ];

  const toggleTool = (toolId) => {
    const newActiveTools = new Set(activeTools);
    if (newActiveTools.has(toolId)) {
      newActiveTools.delete(toolId);
    } else {
      newActiveTools.add(toolId);
    }
    setActiveTools(newActiveTools);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center space-x-2 bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm font-medium mb-4">
            <GlobeAltIcon className="w-4 h-4" />
            <span>Smart Travel Tools</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Everything You Need
            <br />
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              for Perfect Travel
            </span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Access powerful travel tools designed to make your journey smoother, smarter, and more enjoyable.
          </p>
        </motion.div>

        {/* Tool Selection Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Select Your Tools</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {tools.map((tool, index) => {
              const Icon = tool.icon;
              const isActive = activeTools.has(tool.id);
              
              return (
                <motion.button
                  key={tool.id}
                  onClick={() => toggleTool(tool.id)}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative p-6 rounded-2xl border-2 transition-all duration-300 transform hover:scale-105 ${
                    isActive 
                      ? 'border-blue-500 bg-blue-50 shadow-lg shadow-blue-500/20' 
                      : 'border-gray-200 bg-white hover:border-blue-300 hover:shadow-md'
                  }`}
                >
                  <div className={`w-12 h-12 mx-auto mb-3 rounded-xl bg-gradient-to-r ${tool.color} flex items-center justify-center ${
                    isActive ? 'scale-110' : ''
                  } transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className={`text-sm font-semibold text-center ${
                    isActive ? 'text-blue-900' : 'text-gray-900'
                  }`}>
                    {tool.name}
                  </h3>
                  {isActive && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-2 -right-2 w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                      <span className="text-white text-xs">✓</span>
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </motion.div>

        {/* Active Tools Display */}
        {activeTools.size > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-8"
          >
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Active Tools</h2>
              <p className="text-gray-600">Click on tools above to add or remove them from your workspace</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {Array.from(activeTools).map((toolId) => {
                const tool = tools.find(t => t.id === toolId);
                if (!tool || !tool.component) return null;
                
                const ToolComponent = tool.component;
                return (
                  <motion.div
                    key={toolId}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-2xl shadow-xl border border-gray-100 overflow-hidden"
                  >
                    <div className={`h-2 bg-gradient-to-r ${tool.color}`}></div>
                    <div className="p-6">
                      <div className="flex items-center space-x-3 mb-4">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${tool.color} flex items-center justify-center`}>
                          <tool.icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold text-gray-900">{tool.name}</h3>
                          <p className="text-sm text-gray-600">{tool.description}</p>
                        </div>
                      </div>
                      <ToolComponent />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        )}

        {/* Empty State */}
        {activeTools.size === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <GlobeAltIcon className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Select Tools to Get Started</h3>
            <p className="text-gray-600 max-w-md mx-auto mb-8">
              Choose from our collection of smart travel tools above to create your personalized workspace.
            </p>
            <button
              onClick={() => setActiveTools(new Set(['weather', 'currency', 'translator']))}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105"
            >
              Load Essential Tools
            </button>
          </motion.div>
        )}

        {/* Tool Features */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 bg-white rounded-3xl shadow-2xl border border-gray-100 p-12"
        >
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Why Our Tools Are Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Built with cutting-edge technology to provide accurate, real-time information for travelers worldwide.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <GlobeAltIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Real-Time Data</h3>
              <p className="text-gray-600">
                Get the most up-to-date information with live feeds from reliable sources worldwide.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-teal-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <CameraIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">User-Friendly</h3>
              <p className="text-gray-600">
                Intuitive interfaces designed for travelers of all experience levels and tech comfort.
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <ClockIcon className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-3">Always Available</h3>
              <p className="text-gray-600">
                Access all tools 24/7 from anywhere in the world, no downloads or installations required.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TravelTools;