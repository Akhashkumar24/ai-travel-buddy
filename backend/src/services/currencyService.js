// src/services/currencyService.js
const axios = require('axios');

class CurrencyService {
  constructor() {
    this.apiKey = process.env.CURRENCY_API_KEY;
    this.baseUrl = 'https://api.exchangerate-api.com/v4/latest';
  }

  async convertCurrency(from, to, amount) {
    try {
      const response = await axios.get(`${this.baseUrl}/${from}`);
      const rates = response.data.rates;

      if (!rates[to]) {
        throw new Error(`Currency ${to} not supported`);
      }

      const convertedAmount = amount * rates[to];

      return {
        from,
        to,
        originalAmount: amount,
        convertedAmount: parseFloat(convertedAmount.toFixed(2)),
        rate: rates[to],
        timestamp: response.data.date
      };

    } catch (error) {
      console.error('Currency service error:', error);
      throw new Error('Failed to convert currency');
    }
  }

  async getSupportedCurrencies() {
    try {
      const response = await axios.get(`${this.baseUrl}/USD`);
      return Object.keys(response.data.rates);
    } catch (error) {
      throw new Error('Failed to get supported currencies');
    }
  }
}

module.exports = new CurrencyService();