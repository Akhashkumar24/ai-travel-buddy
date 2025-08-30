// src/components/chat/ChatBot.js
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMutation, useQuery } from 'react-query';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  MapPinIcon,
  CalendarIcon,
  CurrencyDollarIcon
} from '@heroicons/react/24/outline';

import { apiService } from '../../services/api';
import { useAuth } from '../../hooks/useAuth';
import ChatMessage from './ChatMessage';
import LoadingSpinner from '../common/LoadingSpinner';

const ChatBot = () => {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: `Hi ${user?.firstName || 'there'}! 👋 I'm your AI travel assistant. I can help you with trip planning, local recommendations, weather updates, and more!`,
      timestamp: new Date(),
      suggestions: ['Plan a new trip', 'Weather forecast', 'Local attractions', 'Currency rates']
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [currentTripId, setCurrentTripId] = useState(null);
  const messagesEndRef = useRef(null);

  // Get user's current trip for context
  const { data: tripsData } = useQuery(
    'current-trip',
    () => apiService.getTrips({ status: 'ongoing', limit: 1 }),
    { enabled: isOpen }
  );

  const currentTrip = tripsData?.data?.trips?.[0];

  useEffect(() => {
    if (currentTrip && currentTripId !== currentTrip.id) {
      setCurrentTripId(currentTrip.id);
      setMessages(prev => [...prev, {
        id: Date.now(),
        type: 'bot',
        message: `I see you're currently on your trip to ${currentTrip.destination.name}! How can I help you today?`,
        timestamp: new Date(),
        context: currentTrip
      }]);
    }
  }, [currentTrip, currentTripId]);

  const sendMessageMutation = useMutation(apiService.sendChatMessage, {
    onSuccess: (response) => {
      const botMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: response.data.message,
        timestamp: new Date(),
        suggestions: response.data.suggestions || []
      };
      setMessages(prev => [...prev, botMessage]);
      scrollToBottom();
    },
    onError: (error) => {
      const errorMessage = {
        id: Date.now() + 1,
        type: 'bot',
        message: "I'm sorry, I encountered an error. Please try again.",
        timestamp: new Date(),
        isError: true
      };
      setMessages(prev => [...prev, errorMessage]);
      scrollToBottom();
    }
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = (message = inputValue.trim()) => {
    if (!message) return;

    // Add user message
    const userMessage = {
      id: Date.now(),
      type: 'user',
      message,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    // Send to API
    sendMessageMutation.mutate({
      message,
      context: {
        currentTrip,
        userPreferences: user?.preferences
      }
    });

    scrollToBottom();
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickActions = [
    {
      icon: MapPinIcon,
      label: 'Find attractions',
      message: 'Show me popular attractions nearby'
    },
    {
      icon: CalendarIcon,
      label: 'Plan today',
      message: 'Help me plan activities for today'
    },
    {
      icon: CurrencyDollarIcon,
      label: 'Budget tips',
      message: 'Give me budget-friendly recommendations'
    }
  ];

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 bg-blue-600 hover:bg-blue-700 text-white rounded-full p-4 shadow-lg transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        aria-label="Toggle chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <XMarkIcon className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <ChatBubbleLeftRightIcon className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3 }}
            className="fixed bottom-24 right-6 z-40 w-96 h-[600px] bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col"
          >
            {/* Chat Header */}
            <div className="bg-blue-600 text-white p-4 rounded-t-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <ChatBubbleLeftRightIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-semibold">AI Travel Assistant</h3>
                    <p className="text-xs text-blue-100">Online</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-blue-100 hover:text-white"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  message={message}
                  onSuggestionClick={handleSuggestionClick}
                />
              ))}
              
              {sendMessageMutation.isLoading && (
                <div className="flex justify-start">
                  <div className="bg-gray-100 rounded-lg p-3 max-w-xs">
                    <LoadingSpinner size="small" />
                  </div>
                </div>
              )}
              
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Actions */}
            {messages.length === 1 && (
              <div className="px-4 py-2 border-t border-gray-100">
                <p className="text-xs text-gray-500 mb-2">Quick actions:</p>
                <div className="flex space-x-2">
                  {quickActions.map((action, index) => (
                    <button
                      key={index}
                      onClick={() => handleSuggestionClick(action.message)}
                      className="flex items-center space-x-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded text-xs text-gray-700 transition-colors"
                    >
                      <action.icon className="w-3 h-3" />
                      <span>{action.label}</span>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-4 border-t border-gray-200">
              <div className="flex items-end space-x-2">
                <div className="flex-1">
                  <textarea
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Ask me anything about travel..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    rows="2"
                    disabled={sendMessageMutation.isLoading}
                  />
                </div>
                <button
                  onClick={() => handleSendMessage()}
                  disabled={!inputValue.trim() || sendMessageMutation.isLoading}
                  className={`p-2 rounded-lg transition-colors ${
                    inputValue.trim() && !sendMessageMutation.isLoading
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <PaperAirplaneIcon className="w-4 h-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;