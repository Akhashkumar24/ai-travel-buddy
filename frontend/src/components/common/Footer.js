// src/components/common/Footer.js
import React from 'react';
import { MapIcon } from '@heroicons/react/24/outline';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center space-x-2 mb-4 md:mb-0">
            <MapIcon className="w-6 h-6 text-blue-400" />
            <span className="text-lg font-semibold">AI Travel Buddy</span>
          </div>
          
          <div className="text-sm text-gray-400">
            © 2025 AI Travel Buddy. Made with ❤️ for travelers.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;