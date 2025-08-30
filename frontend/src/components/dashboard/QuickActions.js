// src/components/dashboard/QuickActions.js
import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  PlusIcon,
  MapIcon,
  ChatBubbleLeftRightIcon,
  SunIcon,
  CurrencyDollarIcon,
  LanguageIcon
} from '@heroicons/react/24/outline';

const QuickActions = () => {
  const actions = [
    {
      title: 'Plan New Trip',
      description: 'Start planning your next adventure',
      icon: PlusIcon,
      href: '/plan-trip',
      color: 'bg-blue-50 text-blue-600 hover:bg-blue-100'
    },
    {
      title: 'Explore Maps',
      description: 'Discover new destinations',
      icon: MapIcon,
      href: '#',
      color: 'bg-green-50 text-green-600 hover:bg-green-100'
    },
    {
      title: 'Weather Check',
      description: 'Check destination weather',
      icon: SunIcon,
      href: '#',
      color: 'bg-yellow-50 text-yellow-600 hover:bg-yellow-100'
    },
    {
      title: 'Currency Rates',
      description: 'Convert currencies',
      icon: CurrencyDollarIcon,
      href: '#',
      color: 'bg-purple-50 text-purple-600 hover:bg-purple-100'
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
      <div className="grid grid-cols-2 gap-3">
        {actions.map((action, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {action.href === '#' ? (
              <button className={`w-full p-4 rounded-lg transition-colors ${action.color} text-left`}>
                <action.icon className="w-5 h-5 mb-2" />
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </button>
            ) : (
              <Link
                to={action.href}
                className={`block w-full p-4 rounded-lg transition-colors ${action.color}`}
              >
                <action.icon className="w-5 h-5 mb-2" />
                <div className="font-medium text-sm">{action.title}</div>
                <div className="text-xs opacity-75">{action.description}</div>
              </Link>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;