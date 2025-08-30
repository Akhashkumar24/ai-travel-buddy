// src/components/tools/Translator.js
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useMutation } from 'react-query';
import { LanguageIcon, ArrowsRightLeftIcon } from '@heroicons/react/24/outline';
import { apiService } from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';

const languages = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
  { code: 'hi', name: 'Hindi' },
  { code: 'ar', name: 'Arabic' }
];

const Translator = () => {
  const [fromLang, setFromLang] = useState('en');
  const [toLang, setToLang] = useState('es');
  const [inputText, setInputText] = useState('');
  const [translation, setTranslation] = useState(null);

  const translateMutation = useMutation(
    () => apiService.translateText(inputText, fromLang, toLang),
    {
      onSuccess: (data) => {
        setTranslation(data.data.translation);
      },
      onError: (error) => {
        console.error('Translation error:', error);
      }
    }
  );

  const handleTranslate = () => {
    if (inputText.trim()) {
      translateMutation.mutate();
    }
  };

  const swapLanguages = () => {
    setFromLang(toLang);
    setToLang(fromLang);
    if (translation) {
      setInputText(translation.translatedText);
      setTranslation(null);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center mb-4">
        <LanguageIcon className="w-5 h-5 text-blue-600 mr-2" />
        <h3 className="text-lg font-semibold text-gray-900">Translator</h3>
      </div>

      <div className="space-y-4">
        {/* Language Selection */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">From</label>
            <select
              value={fromLang}
              onChange={(e) => setFromLang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">To</label>
            <select
              value={toLang}
              onChange={(e) => setToLang(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>{lang.name}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <button
            onClick={swapLanguages}
            className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-50 rounded-full transition-colors"
          >
            <ArrowsRightLeftIcon className="w-4 h-4" />
          </button>
        </div>

        {/* Text Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Text to translate</label>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Enter text to translate..."
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
          />
        </div>

        {/* Translate Button */}
        <button
          onClick={handleTranslate}
          disabled={!inputText.trim() || translateMutation.isLoading}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {translateMutation.isLoading ? (
            <LoadingSpinner size="small" />
          ) : (
            'Translate'
          )}
        </button>

        {/* Translation Result */}
        {translation && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 border border-gray-200 rounded-lg p-4"
          >
            <label className="block text-sm font-medium text-gray-700 mb-2">Translation</label>
            <p className="text-gray-900">{translation.translatedText}</p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Translator;