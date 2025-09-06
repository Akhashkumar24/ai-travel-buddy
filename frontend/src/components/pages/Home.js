// src/components/pages/Home.js - MINIMAL CLEAN VERSION
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Home = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  
  const featuredDestinations = [
    { name: 'Paris, France', description: 'City of Light and Romance' },
    { name: 'Tokyo, Japan', description: 'Modern Metropolis Meets Tradition' },
    { name: 'Bali, Indonesia', description: 'Tropical Paradise' },
    { name: 'New York, USA', description: 'The City That Never Sleeps' }
  ];

  const features = [
    {
      title: 'AI-Powered Planning',
      description: 'Get personalized itineraries created by advanced AI based on your preferences and interests.',
      color: 'bg-purple-500'
    },
    {
      title: 'Smart Recommendations',
      description: 'Discover hidden gems and popular attractions tailored to your travel style.',
      color: 'bg-blue-500'
    },
    {
      title: '24/7 Travel Assistant',
      description: 'Chat with your AI travel companion anytime for instant help and suggestions.',
      color: 'bg-green-500'
    },
    {
      title: 'Budget Optimization',
      description: 'Keep your expenses on track with smart budgeting and cost predictions.',
      color: 'bg-yellow-500'
    }
  ];

  const tools = [
    { name: 'Weather Forecast', description: 'Real-time weather updates' },
    { name: 'Currency Converter', description: 'Live exchange rates' },
    { name: 'Language Translator', description: 'Instant translations' },
    { name: 'Local Explorer', description: 'Discover nearby attractions' }
  ];

  // Auto-rotate destinations
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDestination((prev) => (prev + 1) % featuredDestinations.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen">
      {/* Hero Section - NO BACKGROUND IMAGES */}
      <section className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="inline-block bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
                Powered by Advanced AI
              </div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Your Perfect Trip
                <br />
                <span className="text-yellow-300">
                  Starts Here
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Let AI plan your dream vacation. Get personalized itineraries, local insights, 
                and 24/7 travel assistance for unforgettable adventures.
              </p>
            </div>

            {/* Current Destination Display */}
            <div className="text-white/80 text-lg">
              Now exploring: <span className="font-semibold text-yellow-300">
                {featuredDestinations[currentDestination].name}
              </span>
              <br />
              <span className="text-sm">{featuredDestinations[currentDestination].description}</span>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                to="/plan-trip"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Start Planning Now
              </Link>
              
              <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300">
                Watch Demo
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AI Travel Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of travel planning with our intelligent features designed to make your journey extraordinary.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={feature.title}
                className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-4 h-4 ${feature.color} rounded mb-6`}></div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Travel Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need for seamless travel planning and execution, all in one place.
            </p>
            <Link
              to="/tools"
              className="inline-block bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              Explore All Tools
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <div
                key={tool.name}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-4 h-4 bg-blue-500 rounded mb-4"></div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Ready for Your Next Adventure?
            </h2>
            <p className="text-xl text-white/90 max-w-2xl mx-auto mb-8">
              Join thousands of travelers who trust AI Travel Buddy to create unforgettable experiences.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/plan-trip"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105 shadow-xl"
              >
                Plan My Trip Now
              </Link>
              <Link
                to="/explore"
                className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
              >
                Explore Destinations
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;