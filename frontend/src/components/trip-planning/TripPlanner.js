// src/components/trip-planning/TripPlanner.js - Fixed Syntax Error
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  MapPinIcon, 
  CalendarIcon, 
  CurrencyDollarIcon, 
  UserGroupIcon,
  SparklesIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  CheckIcon
} from '@heroicons/react/24/outline';

// Import step components
import DestinationSelector from './DestinationSelector';
import DatePicker from './DatePicker';
import BudgetSelector from './BudgetSelector';
import PreferencesForm from './PreferencesForm';
import TripSummary from './TripSummary';

const TripPlanner = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [tripData, setTripData] = useState({
    destination: null,
    startDate: null,
    endDate: null,
    budget: {
      total: 0,
      currency: 'USD',
      breakdown: {
        accommodation: 0,
        food: 0,
        transport: 0,
        activities: 0,
        other: 0
      }
    },
    preferences: {
      travelStyle: 'balanced',
      interests: [],
      groupSize: 1,
      pace: 'moderate'
    }
  });

  const steps = [
    {
      id: 'destination',
      title: 'Where to?',
      subtitle: 'Choose your dream destination',
      icon: MapPinIcon,
      component: DestinationSelector,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'dates',
      title: 'When?',
      subtitle: 'Select your travel dates',
      icon: CalendarIcon,
      component: DatePicker,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'budget',
      title: 'Budget?',
      subtitle: 'Set your travel budget',
      icon: CurrencyDollarIcon,
      component: BudgetSelector,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'preferences',
      title: 'Preferences?',
      subtitle: 'Tell us your travel style',
      icon: UserGroupIcon,
      component: PreferencesForm,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'summary',
      title: 'Review',
      subtitle: 'Confirm your trip details',
      icon: SparklesIcon,
      component: TripSummary,
      color: 'from-indigo-500 to-purple-500'
    }
  ];

  const updateTripData = (stepData) => {
    setTripData(prev => ({ ...prev, ...stepData }));
  };

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = (stepIndex) => {
    switch (stepIndex) {
      case 0: return !!tripData.destination?.name;
      case 1: return !!tripData.startDate && !!tripData.endDate;
      case 2: return tripData.budget.total > 0;
      case 3: return tripData.preferences.travelStyle && tripData.preferences.groupSize > 0;
      default: return true;
    }
  };

  const getCurrentStepData = () => {
    const step = steps[currentStep];
    switch (step.id) {
      case 'destination':
        return {
          selected: tripData.destination,
          onSelect: (destination) => updateTripData({ destination })
        };
      case 'dates':
        return {
          startDate: tripData.startDate,
          endDate: tripData.endDate,
          onDateChange: ({ startDate, endDate }) => updateTripData({ startDate, endDate })
        };
      case 'budget':
        return {
          budget: tripData.budget,
          onBudgetChange: (budget) => updateTripData({ budget })
        };
      case 'preferences':
        return {
          preferences: tripData.preferences,
          onPreferencesChange: (preferences) => updateTripData({ preferences })
        };
      case 'summary':
        return {
          tripData,
          onTripCreate: () => {
            // Handle trip creation
            console.log('Creating trip with:', tripData);
          }
        };
      default:
        return {};
    }
  };

  const CurrentStepComponent = steps[currentStep].component;
  const currentStepIcon = steps[currentStep].icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Progress Header */}
      <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-900">Plan Your Perfect Trip</h1>
            <div className="text-sm text-gray-600">
              Step {currentStep + 1} of {steps.length}
            </div>
          </div>
          
          {/* Progress Bar */}
          <div className="relative">
            <div className="flex items-center justify-between">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                const isValid = isStepValid(index);
                
                return (
                  <div key={step.id} className="flex flex-col items-center flex-1 relative">
                    <motion.div
                      className={`w-12 h-12 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                        isCompleted
                          ? 'bg-green-500 border-green-500 text-white'
                          : isCurrent
                          ? `bg-gradient-to-r ${step.color} border-transparent text-white shadow-lg`
                          : isValid
                          ? 'bg-blue-100 border-blue-300 text-blue-600'
                          : 'bg-gray-100 border-gray-300 text-gray-400'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isCompleted ? (
                        <CheckIcon className="w-6 h-6" />
                      ) : (
                        <StepIcon className="w-6 h-6" />
                      )}
                    </motion.div>
                    <div className="mt-2 text-center">
                      <div className={`text-sm font-medium ${
                        isCurrent ? 'text-gray-900' : 'text-gray-600'
                      }`}>
                        {step.title}
                      </div>
                    </div>
                    
                    {index < steps.length - 1 && (
                      <div 
                        className={`absolute top-6 left-1/2 w-full h-0.5 transition-colors duration-300 ${
                          isCompleted ? 'bg-green-500' : 'bg-gray-300'
                        }`}
                        style={{ transform: 'translateX(50%)' }}
                      />
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden"
          >
            {/* Step Header */}
            <div className={`bg-gradient-to-r ${steps[currentStep].color} p-8 text-white`}>
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center">
                  {React.createElement(currentStepIcon, { className: "w-8 h-8" })}
                </div>
                <div>
                  <h2 className="text-3xl font-bold">{steps[currentStep].title}</h2>
                  <p className="text-xl opacity-90">{steps[currentStep].subtitle}</p>
                </div>
              </div>
            </div>

            {/* Step Content */}
            <div className="p-8">
              <CurrentStepComponent {...getCurrentStepData()} />
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between p-8 bg-gray-50 border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  currentStep === 0
                    ? 'text-gray-400 cursor-not-allowed'
                    : 'text-gray-700 hover:text-gray-900 hover:bg-white'
                }`}
              >
                <ArrowLeftIcon className="w-5 h-5" />
                <span>Previous</span>
              </button>

              <div className="flex items-center space-x-2">
                {steps.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      index === currentStep
                        ? 'bg-blue-600'
                        : index < currentStep
                        ? 'bg-green-500'
                        : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>

              {currentStep < steps.length - 1 ? (
                <button
                  onClick={nextStep}
                  disabled={!isStepValid(currentStep)}
                  className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 transform hover:scale-105 ${
                    isStepValid(currentStep)
                      ? `bg-gradient-to-r ${steps[currentStep].color} text-white hover:shadow-lg`
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <span>Continue</span>
                  <ArrowRightIcon className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={() => {
                    // Handle final trip creation
                    console.log('Creating trip:', tripData);
                  }}
                  className="flex items-center space-x-2 px-8 py-3 rounded-full font-semibold bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <SparklesIcon className="w-5 h-5" />
                  <span>Create My Trip</span>
                </button>
              )}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Quick Tips Sidebar */}
      <motion.div
        initial={{ opacity: 0, x: 100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden xl:block z-30"
      >
        <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-6 max-w-sm">
          <h3 className="font-semibold text-gray-900 mb-4">💡 Quick Tips</h3>
          <div className="space-y-3 text-sm text-gray-600">
            {currentStep === 0 && (
              <>
                <p>• Search by city, country, or famous landmark</p>
                <p>• Try destinations like "Paris" or "Bali"</p>
                <p>• Popular spots are pre-loaded for quick selection</p>
              </>
            )}
            {currentStep === 1 && (
              <>
                <p>• Plan at least 2-3 weeks in advance</p>
                <p>• Consider local seasons and weather</p>
                <p>• Weekend trips vs longer vacations</p>
              </>
            )}
            {currentStep === 2 && (
              <>
                <p>• Include accommodation, food, activities</p>
                <p>• Add 20% buffer for unexpected expenses</p>
                <p>• Local costs vary significantly by destination</p>
              </>
            )}
            {currentStep === 3 && (
              <>
                <p>• Be honest about your travel style</p>
                <p>• Select interests for personalized recommendations</p>
                <p>• Group size affects accommodation and activities</p>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default TripPlanner;