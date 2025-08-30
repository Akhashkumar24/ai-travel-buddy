// src/services/translationService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

class TranslationService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async translateText(text, fromLang, toLang) {
    try {
      const prompt = `Translate the following text from ${fromLang} to ${toLang}. Only return the translation, nothing else:\n\n"${text}"`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return {
        originalText: text,
        translatedText: response.text().trim(),
        fromLanguage: fromLang,
        toLanguage: toLang
      };

    } catch (error) {
      console.error('Translation service error:', error);
      throw new Error('Failed to translate text');
    }
  }

  async detectLanguage(text) {
    try {
      const prompt = `Detect the language of this text and respond with only the language code (e.g., 'en', 'es', 'fr'): "${text}"`;
      
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return response.text().trim().toLowerCase();

    } catch (error) {
      console.error('Language detection error:', error);
      throw new Error('Failed to detect language');
    }
  }
}

module.exports = new TranslationService();