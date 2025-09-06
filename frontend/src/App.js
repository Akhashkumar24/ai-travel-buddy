// src/App.js - FIXED VERSION (NO CHATBOT, CLEAN IMPORTS)
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { Toaster } from 'react-hot-toast';

// Import components - USING FIXED VERSIONS
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import Home from './components/pages/Home';
import TripPlanner from './components/trip-planning/TripPlanner';
import ExploreDestinations from './components/pages/ExploreDestinations';
import TravelTools from './components/pages/TravelTools';
import AboutPage from './components/pages/About';
// TEMPORARILY REMOVED: import ChatBot from './components/chat/ChatBot';

import './styles/globals.css';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000,
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: '#363636',
                color: '#fff',
                borderRadius: '12px',
                padding: '16px',
              },
              success: {
                duration: 3000,
                iconTheme: {
                  primary: '#4ade80',
                  secondary: '#fff',
                },
              },
            }}
          />
          
          <Header />
          
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/plan-trip" element={<TripPlanner />} />
              <Route path="/explore" element={<ExploreDestinations />} />
              <Route path="/tools" element={<TravelTools />} />
              <Route path="/about" element={<AboutPage />} />
              
              <Route path="/dashboard" element={<Navigate to="/" replace />} />
              
              <Route 
                path="*" 
                element={
                  <div className="min-h-screen flex items-center justify-center">
                    <div className="text-center space-y-6">
                      <div className="text-8xl">🗺️</div>
                      <h1 className="text-4xl font-bold text-gray-900">Lost in Space</h1>
                      <p className="text-xl text-gray-600 max-w-md">
                        Looks like this page doesn't exist. Let's get you back on track!
                      </p>
                      <a 
                        href="/" 
                        className="inline-block bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105"
                      >
                        Go Home
                      </a>
                    </div>
                  </div>
                } 
              />
            </Routes>
          </main>
          
          <Footer />
          
          {/* TEMPORARILY REMOVED CHATBOT */}
          {/* <ChatBot /> */}
        </div>
      </Router>
    </QueryClientProvider>
  );
}

export default App;