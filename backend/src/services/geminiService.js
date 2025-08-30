// src/services/geminiService.js
const { GoogleGenerativeAI } = require('@google/generative-ai');

class GeminiService {
  constructor() {
    this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    this.model = this.genAI.getGenerativeModel({ model: "gemini-pro" });
  }

  async generateTripItinerary(tripData) {
    try {
      const prompt = this.buildItineraryPrompt(tripData);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return this.parseItineraryResponse(response.text());
    } catch (error) {
      console.error('Gemini API error:', error);
      throw new Error('Failed to generate itinerary');
    }
  }

  async chatWithAI(message, context = {}) {
    try {
      const prompt = this.buildChatPrompt(message, context);
      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return {
        message: response.text(),
        suggestions: this.extractSuggestions(response.text())
      };
    } catch (error) {
      console.error('Gemini chat error:', error);
      throw new Error('Failed to process chat message');
    }
  }

  async getSuggestionsForDestination(destination, preferences) {
    try {
      const prompt = `Act as an expert travel guide. Provide detailed suggestions for ${destination.name} based on these preferences: ${JSON.stringify(preferences)}.

Include:
1. Top 10 attractions with brief descriptions
2. Local cuisine recommendations (5-7 dishes)
3. Cultural etiquette tips (3-5 important points)
4. Best neighborhoods to stay in
5. Transportation tips
6. Safety considerations
7. Budget estimates for different categories

Format the response as structured JSON with the following structure:
{
  "attractions": [{"name": "", "description": "", "category": "", "estimatedTime": "", "cost": ""}],
  "cuisine": [{"dish": "", "description": "", "whereToTry": ""}],
  "etiquette": [""],
  "neighborhoods": [{"name": "", "description": "", "priceRange": ""}],
  "transportation": {"local": "", "fromAirport": "", "tips": ""},
  "safety": {"tips": [""], "emergencyNumbers": {}},
  "budgetEstimates": {"budget": "", "mid-range": "", "luxury": ""}
}`;

      const result = await this.model.generateContent(prompt);
      const response = await result.response;
      
      return JSON.parse(response.text());
    } catch (error) {
      console.error('Gemini suggestions error:', error);
      throw new Error('Failed to get destination suggestions');
    }
  }

  buildItineraryPrompt(tripData) {
    return `Create a detailed ${this.calculateDays(tripData.startDate, tripData.endDate)}-day travel itinerary for ${tripData.destination.name}.

Trip Details:
- Dates: ${tripData.startDate} to ${tripData.endDate}
- Budget: ${tripData.budget.total} ${tripData.budget.currency}
- Travel Style: ${tripData.preferences.travelStyle}
- Group Size: ${tripData.preferences.groupSize}
- Interests: ${tripData.preferences.interests.join(', ')}
- Pace: ${tripData.preferences.pace}

Requirements:
1. Create a day-by-day itinerary
2. Include specific attractions, restaurants, and activities
3. Provide estimated costs for each activity
4. Include travel times between locations
5. Suggest optimal routes
6. Consider opening hours and seasonal factors
7. Balance must-see attractions with local experiences

Format as JSON:
{
  "overview": {"totalDays": 0, "highlights": [], "estimatedCost": ""},
  "days": [
    {
      "day": 1,
      "date": "",
      "theme": "",
      "activities": [
        {
          "time": "",
          "title": "",
          "description": "",
          "location": {"name": "", "coordinates": {"lat": 0, "lng": 0}},
          "duration": "",
          "cost": "",
          "category": "",
          "tips": ""
        }
      ],
      "meals": [{"type": "", "restaurant": "", "cuisine": "", "cost": ""}],
      "transportation": "",
      "accommodationSuggestion": ""
    }
  ],
  "packingList": [],
  "importantNotes": []
}`;
  }

  buildChatPrompt(message, context) {
    let contextInfo = '';
    if (context.currentTrip) {
      contextInfo = `Current trip context: ${context.currentTrip.destination.name} from ${context.currentTrip.startDate} to ${context.currentTrip.endDate}. `;
    }
    if (context.userPreferences) {
      contextInfo += `User preferences: ${JSON.stringify(context.userPreferences)}. `;
    }

    return `You are an expert AI travel assistant. ${contextInfo}

User message: "${message}"

Provide helpful, personalized travel advice. Be conversational but informative. If the user is asking about:
- Destinations: Provide specific recommendations with reasons
- Activities: Suggest options based on their interests and budget
- Logistics: Give practical, actionable advice
- Local culture: Share insights and etiquette tips
- Safety: Provide current, relevant safety information

Keep responses concise but helpful. Always end with a follow-up question to keep the conversation engaging.`;
  }

  calculateDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  }

  parseItineraryResponse(responseText) {
    try {
      return JSON.parse(responseText);
    } catch (error) {
      // Fallback parsing if JSON is malformed
      return {
        overview: {
          totalDays: 0,
          highlights: [],
          estimatedCost: "Unable to parse"
        },
        days: [],
        packingList: [],
        importantNotes: [responseText]
      };
    }
  }

  extractSuggestions(responseText) {
    // Extract actionable suggestions from AI response
    const suggestions = [];
    const lines = responseText.split('\n');
    
    for (const line of lines) {
      if (line.includes('suggest') || line.includes('recommend') || line.includes('consider')) {
        suggestions.push(line.trim());
      }
    }
    
    return suggestions.slice(0, 3); // Return top 3 suggestions
  }
}

module.exports = new GeminiService();