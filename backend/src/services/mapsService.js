// src/services/mapsService.js
const axios = require('axios');

class MapsService {
  constructor() {
    this.apiKey = process.env.GOOGLE_MAPS_API_KEY;
    this.baseUrl = 'https://maps.googleapis.com/maps/api';
  }

  async searchPlaces(query, location = null) {
    try {
      const params = {
        query,
        key: this.apiKey,
        fields: 'name,place_id,geometry,formatted_address,rating,types'
      };

      if (location) {
        params.location = location;
        params.radius = 10000; // 10km radius
      }

      const response = await axios.get(`${this.baseUrl}/place/textsearch/json`, {
        params
      });

      return response.data.results.map(place => ({
        placeId: place.place_id,
        name: place.name,
        address: place.formatted_address,
        location: place.geometry.location,
        rating: place.rating,
        types: place.types
      }));

    } catch (error) {
      console.error('Maps service error:', error);
      throw new Error('Failed to search places');
    }
  }

  async getPlaceDetails(placeId) {
    try {
      const response = await axios.get(`${this.baseUrl}/place/details/json`, {
        params: {
          place_id: placeId,
          key: this.apiKey,
          fields: 'name,formatted_address,geometry,rating,reviews,photos,opening_hours,price_level'
        }
      });

      return response.data.result;

    } catch (error) {
      console.error('Place details error:', error);
      throw new Error('Failed to get place details');
    }
  }

  async geocodeAddress(address) {
    try {
      const response = await axios.get(`${this.baseUrl}/geocode/json`, {
        params: {
          address,
          key: this.apiKey
        }
      });

      if (response.data.results.length === 0) {
        throw new Error('Address not found');
      }

      const result = response.data.results[0];
      return {
        address: result.formatted_address,
        location: result.geometry.location,
        placeId: result.place_id
      };

    } catch (error) {
      console.error('Geocoding error:', error);
      throw new Error('Failed to geocode address');
    }
  }
}

module.exports = new MapsService();