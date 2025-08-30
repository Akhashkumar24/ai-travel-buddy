// src/services/weatherService.js
const axios = require('axios');

class WeatherService {
  constructor() {
    this.apiKey = process.env.OPENWEATHER_API_KEY;
    this.baseUrl = 'https://api.openweathermap.org/data/2.5';
  }

  async getWeatherForecast(location, startDate, endDate) {
    try {
      let coordinates;
      
      // If location is a string, geocode it
      if (typeof location === 'string') {
        coordinates = await this.geocodeLocation(location);
      } else {
        coordinates = location;
      }

      const { lat, lon } = coordinates;

      // Get current weather
      const currentWeather = await axios.get(`${this.baseUrl}/weather`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      // Get 5-day forecast
      const forecast = await axios.get(`${this.baseUrl}/forecast`, {
        params: {
          lat,
          lon,
          appid: this.apiKey,
          units: 'metric'
        }
      });

      return {
        current: currentWeather.data,
        forecast: forecast.data.list.slice(0, 10), // Next 10 forecasts (3-hour intervals)
        location: {
          name: currentWeather.data.name,
          country: currentWeather.data.sys.country,
          coordinates: { lat, lon }
        }
      };

    } catch (error) {
      console.error('Weather service error:', error);
      throw new Error('Failed to fetch weather data');
    }
  }

  async geocodeLocation(locationName) {
    try {
      const response = await axios.get(`${this.baseUrl}/geocode/direct`, {
        params: {
          q: locationName,
          limit: 1,
          appid: this.apiKey
        }
      });

      if (response.data.length === 0) {
        throw new Error('Location not found');
      }

      return {
        lat: response.data[0].lat,
        lon: response.data[0].lon
      };
    } catch (error) {
      throw new Error('Failed to geocode location');
    }
  }
}

module.exports = new WeatherService();