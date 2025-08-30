// src/components/pages/Home.js - Beautiful Home Page
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  SparklesIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  CloudIcon,
  LanguageIcon,
  ArrowRightIcon,
  PlayIcon
} from '@heroicons/react/24/outline';

const Home = () => {
  const [currentDestination, setCurrentDestination] = useState(0);
  
  const featuredDestinations = [
    {
      name: 'Paris, France',
      image: 'https://images.unsplash.com/photo-1502602898536-47ad22581b52?w=800&q=80',
      description: 'City of Light and Romance'
    },
    {
      name: 'Tokyo, Japan',
      image: 'https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&q=80',
      description: 'Modern Metropolis Meets Tradition'
    },
    {
      name: 'Bali, Indonesia',
      image: 'https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?w=800&q=80',
      description: 'Tropical Paradise'
    },
    {
      name: 'New York, USA',
      image: 'https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800&q=80',
      description: 'The City That Never Sleeps'
    }
  ];

  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Planning',
      description: 'Get personalized itineraries created by advanced AI based on your preferences and interests.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: MapPinIcon,
      title: 'Smart Recommendations',
      description: 'Discover hidden gems and popular attractions tailored to your travel style.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '24/7 Travel Assistant',
      description: 'Chat with your AI travel companion anytime for instant help and suggestions.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: CurrencyDollarIcon,
      title: 'Budget Optimization',
      description: 'Keep your expenses on track with smart budgeting and cost predictions.',
      color: 'from-yellow-500 to-orange-500'
    }
  ];

  const tools = [
    { icon: CloudIcon, name: 'Weather Forecast', description: 'Real-time weather updates' },
    { icon: CurrencyDollarIcon, name: 'Currency Converter', description: 'Live exchange rates' },
    { icon: LanguageIcon, name: 'Language Translator', description: 'Instant translations' },
    { icon: MapPinIcon, name: 'Local Explorer', description: 'Discover nearby attractions' }
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
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background with animated destinations */}
        <div className="absolute inset-0 z-0">
          {featuredDestinations.map((dest, index) => (
            <motion.div
              key={dest.name}
              className="absolute inset-0"
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ 
                opacity: index === currentDestination ? 0.3 : 0,
                scale: index === currentDestination ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: 'easeInOut' }}
            >
              <img 
                src={dest.image} 
                alt={dest.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blue-900/50 to-purple-900/50" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium"
              >
                <SparklesIcon className="w-4 h-4" />
                <span>Powered by Advanced AI</span>
              </motion.div>
              
              <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight">
                Your Perfect Trip
                <br />
                <span className="bg-gradient-to-r from-yellow-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                  Starts Here
                </span>
              </h1>
              
              <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto leading-relaxed">
                Let AI plan your dream vacation. Get personalized itineraries, local insights, 
                and 24/7 travel assistance for unforgettable adventures.
              </p>
            </div>

            {/* Current Destination Display */}
            <motion.div
              key={currentDestination}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-white/80 text-lg"
            >
              Now exploring: <span className="font-semibold text-yellow-400">
                {featuredDestinations[currentDestination].name}
              </span>
              <br />
              <span className="text-sm">{featuredDestinations[currentDestination].description}</span>
            </motion.div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-8">
              <Link
                to="/plan-trip"
                className="group bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-purple-500/25 flex items-center space-x-2"
              >
                <span>Start Planning Now</span>
                <ArrowRightIcon className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              
              <button className="group bg-white/10 backdrop-blur-sm border border-white/20 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:bg-white/20 flex items-center space-x-2">
                <PlayIcon className="w-5 h-5" />
                <span>Watch Demo</span>
              </button>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white/50 rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white/70 rounded-full mt-2"></div>
          </div>
        </motion.div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Why Choose AI Travel Buddy?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experience the future of travel planning with our intelligent features designed to make your journey extraordinary.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Tools Preview Section */}
      <section className="py-24 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Powerful Travel Tools
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Everything you need for seamless travel planning and execution, all in one place.
            </p>
            <Link
              to="/tools"
              className="inline-flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors"
            >
              <span>Explore All Tools</span>
              <ArrowRightIcon className="w-4 h-4" />
            </Link>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {tools.map((tool, index) => (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <tool.icon className="w-10 h-10 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{tool.name}</h3>
                <p className="text-gray-600 text-sm">{tool.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
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
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;