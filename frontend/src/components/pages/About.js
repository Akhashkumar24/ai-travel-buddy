// src/components/pages/About.js
import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  SparklesIcon,
  GlobeAltIcon,
  ChatBubbleLeftRightIcon,
  ShieldCheckIcon,
  ClockIcon,
  HeartIcon,
  UserGroupIcon,
  LightBulbIcon
} from '@heroicons/react/24/outline';

const About = () => {
  const features = [
    {
      icon: SparklesIcon,
      title: 'AI-Powered Intelligence',
      description: 'Our advanced AI analyzes millions of travel data points to provide personalized recommendations tailored to your unique preferences and style.',
      color: 'from-purple-500 to-pink-500'
    },
    {
      icon: GlobeAltIcon,
      title: 'Global Coverage',
      description: 'From hidden local gems to world-famous landmarks, we provide insights and recommendations for destinations across the globe.',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      icon: ChatBubbleLeftRightIcon,
      title: '24/7 Support',
      description: 'Our AI travel assistant is always ready to help, whether you\'re planning your trip or need assistance while traveling.',
      color: 'from-green-500 to-emerald-500'
    },
    {
      icon: ShieldCheckIcon,
      title: 'Trusted & Secure',
      description: 'Your data and privacy are our top priority. We use industry-standard security measures to protect your information.',
      color: 'from-orange-500 to-red-500'
    }
  ];

  const team = [
    {
      name: 'AI Travel Engine',
      role: 'Core Intelligence',
      description: 'Advanced machine learning algorithms that understand your preferences and create personalized experiences.',
      avatar: '🤖'
    },
    {
      name: 'Global Data Network',
      role: 'Real-time Information',
      description: 'Constantly updated database of destinations, attractions, weather, and local insights from around the world.',
      avatar: '🌍'
    },
    {
      name: 'Smart Analytics',
      role: 'Optimization Engine',
      description: 'Intelligent systems that optimize routes, budgets, and schedules for the perfect travel experience.',
      avatar: '📊'
    }
  ];

  const stats = [
    { number: '1M+', label: 'Trips Planned', icon: '✈️' },
    { number: '150+', label: 'Countries Covered', icon: '🗺️' },
    { number: '24/7', label: 'AI Support', icon: '🤖' },
    { number: '99.9%', label: 'User Satisfaction', icon: '⭐' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center space-x-2 bg-purple-100 text-purple-800 px-4 py-2 rounded-full text-sm font-medium mb-6">
              <HeartIcon className="w-4 h-4" />
              <span>Made with passion for travelers</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              About
              <br />
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                AI Travel Buddy
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your intelligent travel companion, powered by advanced AI to make every journey extraordinary. 
              We believe that everyone deserves to experience the joy of seamless, personalized travel.
            </p>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-20"
          >
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl font-bold text-gray-900 mb-1">{stat.number}</div>
                <div className="text-gray-600 font-medium">{stat.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            <div className="bg-gradient-to-r from-purple-600 to-pink-600 px-12 py-16 text-white text-center">
              <LightBulbIcon className="w-16 h-16 mx-auto mb-6 opacity-90" />
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Our Mission</h2>
              <p className="text-xl opacity-90 max-w-3xl mx-auto leading-relaxed">
                To democratize travel by making personalized trip planning accessible to everyone through 
                the power of artificial intelligence and human insight.
              </p>
            </div>
            
            <div className="px-12 py-16">
              <div className="max-w-4xl mx-auto">
                <h3 className="text-2xl font-bold text-gray-900 mb-8 text-center">Why We Exist</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-lg text-gray-700 leading-relaxed">
                  <div>
                    <p className="mb-6">
                      Travel planning can be overwhelming. Hours spent researching destinations, comparing prices, 
                      reading reviews, and trying to create the perfect itinerary often leads to stress rather than excitement.
                    </p>
                    <p>
                      We believe travel should inspire joy from the moment you start planning. That's why we created 
                      AI Travel Buddy - to handle the complexity so you can focus on the adventure.
                    </p>
                  </div>
                  <div>
                    <p className="mb-6">
                      Our AI doesn't just provide generic recommendations. It learns your preferences, understands your 
                      travel style, and considers your budget to create truly personalized experiences.
                    </p>
                    <p>
                      Whether you're a budget backpacker or a luxury traveler, planning a romantic getaway or a family 
                      adventure, we're here to make your dream trip a reality.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">What Makes Us Special</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Cutting-edge technology meets travel expertise to create experiences that are uniquely yours.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                  <feature.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">Meet Our AI Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The intelligent systems working behind the scenes to make your travel dreams come true.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center hover:shadow-xl transition-all duration-300"
              >
                <div className="text-6xl mb-4">{member.avatar}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-4">{member.role}</p>
                <p className="text-gray-600 leading-relaxed">{member.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl shadow-2xl p-12 text-white"
          >
            <UserGroupIcon className="w-16 h-16 mx-auto mb-6 opacity-90" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
            <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
              Join thousands of travelers who trust AI Travel Buddy to create unforgettable experiences. 
              Your next adventure is just a few clicks away.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link
                to="/plan-trip"
                className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
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

      {/* Values Section */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="bg-white rounded-3xl shadow-xl border border-gray-100 p-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <HeartIcon className="w-8 h-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Passion for Travel</h3>
                <p className="text-gray-600">
                  We're travelers at heart who understand the transformative power of exploration and discovery.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShieldCheckIcon className="w-8 h-8 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Trust & Transparency</h3>
                <p className="text-gray-600">
                  We believe in honest recommendations and transparent pricing with no hidden fees or biased suggestions.
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <SparklesIcon className="w-8 h-8 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Innovation</h3>
                <p className="text-gray-600">
                  We continuously evolve our AI to provide better, smarter, and more personalized travel experiences.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default About;