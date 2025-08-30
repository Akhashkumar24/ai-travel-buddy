// src/components/chat/ChatBot.js - Enhanced AI Travel Assistant
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ChatBubbleLeftRightIcon,
  XMarkIcon,
  PaperAirplaneIcon,
  SparklesIcon,
  MapPinIcon,
  SunIcon,
  CurrencyDollarIcon,
  LanguageIcon,
  MicrophoneIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      message: "👋 Hi there! I'm your AI Travel Buddy! I can help you plan trips, find destinations, check weather, convert currencies, and much more. What would you like to explore today?",
      timestamp: new Date(),
      suggestions: [
        "Plan a trip to Paris",
        "Best beaches in Thailand",
        "Budget travel tips",
        "Weather in Tokyo"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const quickActions = [
    { 
      icon: MapPinIcon, 
      label: 'Find Destinations', 
      action: () => handleQuickMessage("Suggest some popular travel destinations for this season")
    },
    { 
      icon: SunIcon, 
      label: 'Weather Check', 
      action: () => handleQuickMessage("What's the weather like in popular travel destinations?")
    },
    { 
      icon: CurrencyDollarIcon, 
      label: 'Budget Help', 
      action: () => handleQuickMessage("Help me plan a budget for a week-long trip")
    },
    { 
      icon: LanguageIcon, 
      label: 'Travel Phrases', 
      action: () => handleQuickMessage("Teach me essential travel phrases for different countries")
    }
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateBotResponse = async (userMessage) => {
    setIsTyping(true);
    
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const responses = [
      {
        condition: (msg) => msg.toLowerCase().includes('paris'),
        response: "🇫🇷 Paris is absolutely magical! Here are some must-visit spots:\n\n🗼 Eiffel Tower - Best views at sunset\n🏛️ Louvre Museum - Book skip-the-line tickets\n🌸 Montmartre - Perfect for morning strolls\n🥐 Latin Quarter - Amazing cafes and bistros\n\nWhen are you planning to visit? I can help with weather forecasts and budget planning!",
        suggestions: ["Weather in Paris", "Budget for Paris trip", "Best time to visit Paris", "Paris travel itinerary"]
      },
      {
        condition: (msg) => msg.toLowerCase().includes('budget'),
        response: "💰 Smart budgeting makes travel so much better! Here's my framework:\n\n✈️ Transportation: 25-30% of budget\n🏨 Accommodation: 30-35%\n🍽️ Food: 20-25%\n🎯 Activities: 15-20%\n🛍️ Shopping/Extras: 5-10%\n\nWhat's your destination and trip duration? I'll create a detailed budget breakdown for you!",
        suggestions: ["Budget for 7-day Europe trip", "Cheap travel destinations", "How to save money traveling", "Travel insurance costs"]
      },
      {
        condition: (msg) => msg.toLowerCase().includes('weather'),
        response: "🌤️ Weather can make or break a trip! I can check current conditions and forecasts for any destination.\n\nRight now, here are some great weather spots:\n🏖️ Maldives - 28°C, sunny\n🏔️ Swiss Alps - Perfect for skiing\n🌺 Hawaii - 24°C, light breeze\n\nWhich destination would you like a detailed forecast for?",
        suggestions: ["Weather in Bali", "Best weather destinations now", "Rainy season in Southeast Asia", "Hurricane season Caribbean"]
      },
      {
        condition: (msg) => msg.toLowerCase().includes('thailand') || msg.toLowerCase().includes('beaches'),
        response: "🏖️ Thailand has some of the world's most stunning beaches! Here are my top picks:\n\n🏝️ **Railay Beach, Krabi** - Dramatic limestone cliffs\n🌅 **Maya Bay, Phi Phi** - Famous movie location\n🐠 **Koh Tao** - Best for diving and snorkeling\n🌴 **Patong Beach, Phuket** - Vibrant nightlife\n🌊 **Hua Hin** - Perfect for families\n\nAre you looking for party vibes, quiet relaxation, or adventure activities?",
        suggestions: ["Best time Thailand beaches", "Thailand visa requirements", "Island hopping Thailand", "Thailand travel costs"]
      }
    ];

    const response = responses.find(r => r.condition(userMessage)) || {
      response: "That's a great question! ✨ I'd love to help you with that. Could you provide a bit more detail about what you're looking for? Whether it's destinations, planning, budgets, or travel tips, I'm here to make your travel dreams come true! 🌍",
      suggestions: ["Plan a trip", "Find cheap flights", "Travel safety tips", "Best travel apps"]
    };

    setIsTyping(false);
    
    const botMessage = {
      id: Date.now(),
      type: 'bot',
      message: response.response,
      timestamp: new Date(),
      suggestions: response.suggestions || []
    };

    setMessages(prev => [...prev, botMessage]);
  };

  const handleSendMessage = async (messageText = input) => {
    if (!messageText.trim()) return;

    const userMessage = {
      id: Date.now(),
      type: 'user',
      message: messageText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput('');

    await generateBotResponse(messageText);
  };

  const handleQuickMessage = (message) => {
    handleSendMessage(message);
  };

  const handleSuggestionClick = (suggestion) => {
    handleSendMessage(suggestion);
  };

  const handleVoiceInput = () => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      alert('Speech recognition not supported in this browser');
      return;
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = 'en-US';

    setIsListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setInput(transcript);
      setIsListening(false);
    };

    recognition.onerror = () => {
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 w-16 h-16 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 ${
          isOpen 
            ? 'bg-red-500 hover:bg-red-600' 
            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        }`}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        animate={!isOpen ? { 
          boxShadow: [
            '0 0 20px rgba(59, 130, 246, 0.5)',
            '0 0 30px rgba(147, 51, 234, 0.5)',
            '0 0 20px rgba(59, 130, 246, 0.5)'
          ]
        } : {}}
        transition={!isOpen ? { duration: 2, repeat: Infinity } : {}}
      >
        {isOpen ? (
          <XMarkIcon className="w-8 h-8 text-white" />
        ) : (
          <div className="relative">
            <ChatBubbleLeftRightIcon className="w-8 h-8 text-white" />
            {messages.length === 1 && (
              <motion.div
                className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              >
                <span className="text-white text-xs">1</span>
              </motion.div>
            )}
          </div>
        )}
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 100, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 100, scale: 0.8 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="fixed bottom-24 right-6 w-96 h-[600px] bg-white rounded-2xl shadow-2xl border border-gray-200 z-40 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-4 text-white">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                    <SparklesIcon className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg">AI Travel Buddy</h3>
                    <p className="text-sm opacity-90">Your intelligent travel companion</p>
                  </div>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 hover:bg-white/20 rounded-full transition-colors"
                >
                  <XMarkIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Quick Actions */}
            {messages.length <= 1 && (
              <div className="p-4 border-b border-gray-100">
                <p className="text-sm text-gray-600 mb-3">Quick actions:</p>
                <div className="grid grid-cols-2 gap-2">
                  {quickActions.map((action, index) => (
                    <motion.button
                      key={index}
                      onClick={action.action}
                      className="flex items-center space-x-2 p-2 bg-gray-50 hover:bg-blue-50 rounded-lg text-sm text-gray-700 hover:text-blue-700 transition-colors"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <action.icon className="w-4 h-4" />
                      <span>{action.label}</span>
                    </motion.button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className="max-w-[80%] space-y-2">
                    <div
                      className={`rounded-2xl px-4 py-3 ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                          : 'bg-gray-100 text-gray-900'
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.message}</p>
                    </div>
                    
                    {/* Suggestions */}
                    {message.suggestions && message.suggestions.length > 0 && (
                      <div className="space-y-2">
                        {message.suggestions.map((suggestion, index) => (
                          <motion.button
                            key={index}
                            onClick={() => handleSuggestionClick(suggestion)}
                            className="block w-full text-left text-xs bg-blue-50 hover:bg-blue-100 text-blue-700 px-3 py-2 rounded-lg border border-blue-200 transition-colors"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            {suggestion}
                          </motion.button>
                        ))}
                      </div>
                    )}

                    <div className="text-xs text-gray-500">
                      {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex justify-start"
                >
                  <div className="bg-gray-100 rounded-2xl px-4 py-3">
                    <div className="flex space-x-1">
                      <motion.div
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.2 }}
                      />
                      <motion.div
                        className="w-2 h-2 bg-gray-500 rounded-full"
                        animate={{ scale: [1, 1.5, 1] }}
                        transition={{ duration: 0.6, repeat: Infinity, delay: 0.4 }}
                      />
                    </div>
                  </div>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-gray-100">
              <div className="flex space-x-2">
                <div className="flex-1 relative">
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Ask me anything about travel..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-colors"
                    disabled={isTyping}
                  />
                  <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                    <button
                      onClick={handleVoiceInput}
                      className={`p-2 rounded-full transition-colors ${
                        isListening 
                          ? 'bg-red-100 text-red-600' 
                          : 'hover:bg-gray-200 text-gray-400 hover:text-gray-600'
                      }`}
                      title="Voice input"
                    >
                      <MicrophoneIcon className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-200 rounded-full text-gray-400 hover:text-gray-600 transition-colors"
                      title="Upload image"
                    >
                      <PhotoIcon className="w-4 h-4" />
                    </button>
                  </div>
                </div>
                <motion.button
                  onClick={() => handleSendMessage()}
                  disabled={!input.trim() || isTyping}
                  className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 disabled:from-gray-300 disabled:to-gray-400 text-white rounded-full transition-all duration-300 disabled:cursor-not-allowed"
                  whileHover={{ scale: input.trim() ? 1.05 : 1 }}
                  whileTap={{ scale: input.trim() ? 0.95 : 1 }}
                >
                  <PaperAirplaneIcon className="w-5 h-5" />
                </motion.button>
              </div>
              
              <div className="text-center mt-2">
                <p className="text-xs text-gray-500">
                  Powered by AI • Always learning • Travel smarter ✨
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;