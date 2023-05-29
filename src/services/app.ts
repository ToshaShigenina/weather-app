import sendGet from "./http";

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
    appid: process.env.VUE_APP_API_ID
  }
};

const api = {
  getCity(params: Record<string, unknown>) {
    return sendGet(URL.CITY, {
      ...options.CITY,
      ...params
    });
  },
  getWeather(params: Record<string, unknown>) {
    return sendGet(URL.WEATHER, {
      ...options.WEATHER,
      ...params
    });
  }
}

export default api