import { sendGet } from "./http";

const URL = {
  CITY: 'https://nominatim.openstreetmap.org',
  WEATHER: 'https://api.openweathermap.org/data/2.5/onecall'
};
const options = {
  CITY: {
    format: 'json',
    addressdetails: 1,
    limit: 1,
  },
  WEATHER: {
    units: 'metric',
    lang: 'ru',
    appid: process.env.REACT_APP_API_ID
  }
};

export const API = {
  async getCity(params: Record<string, unknown>) {
    return sendGet(URL.CITY, {
      ...options.CITY,
      ...params
    });
  },
  async getWeather(params: Record<string, unknown>) {
    return sendGet(URL.WEATHER, {
      ...options.WEATHER,
      ...params
    });
  }
}
