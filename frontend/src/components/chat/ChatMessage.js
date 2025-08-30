// src/components/chat/ChatMessage.js
import React from 'react';
import { motion } from 'framer-motion';
import { format } from 'date-fns';
import { 
  UserIcon, 
  ChatBubbleLeftRightIcon,
  ClockIcon 
} from '@heroicons/react/24/outline';

const ChatMessage = ({ message, onSuggestionClick }) => {
  const isBot = message.type === 'bot';
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}
    >
      <div className={`flex items-start space-x-2 max-w-xs lg:max-w-md ${isBot ? '' : 'flex-row-reverse space-x-reverse'}`}>
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
          isBot ? 'bg-blue-100' : 'bg-gray-100'
        }`}>
          {isBot ? (
            <ChatBubbleLeftRightIcon className="w-4 h-4 text-blue-600" />
          ) : (
            <UserIcon className="w-4 h-4 text-gray-600" />
          )}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`rounded-lg px-4 py-2 ${
            isBot 
              ? message.isError 
                ? 'bg-red-100 text-red-800' 
                : 'bg-gray-100 text-gray-900'
              : 'bg-blue-600 text-white'
          }`}>
            <p className="text-sm whitespace-pre-wrap">{message.message}</p>
          </div>

          {/* Timestamp */}
          <div className="flex items-center mt-1 text-xs text-gray-500">
            <ClockIcon className="w-3 h-3 mr-1" />
            {format(new Date(message.timestamp), 'HH:mm')}
          </div>

          {/* Suggestions */}
          {isBot && message.suggestions && message.suggestions.length > 0 && (
            <div className="mt-2 space-y-1">
              {message.suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => onSuggestionClick(suggestion)}
                  className="block text-xs text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-2 py-1 rounded border border-blue-200 transition-colors"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          )}

          {/* Context Info */}
          {message.context && (
            <div className="mt-2 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
              Trip: {message.context.destination?.name}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ChatMessage;