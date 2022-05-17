import {
  createStore
} from 'vuex'
import api from '../services/api'
import dateformat from '../plugins/dateformat'

export default createStore({
  state: {
    city: 'Москва', // location.address.city
    history: [
      'Москва'
    ],
    location: {
      lat: null,
      lon: null
    },
    current: {
      date: null,
      temp: null,
      feel: null,
      description: null,
      icon: null,
      wind_speed: null,
      wind_deg: null,
      pressure: null,
      humidity: null,
      visibility: null,
    },
    daily: [],
    hourly: []
  },
  mutations: {
    changeCity(state, city) {
      state.city = city;
    },
    setLocation(state, data) {
      state.location.lat = data.lat;
      state.location.lon = data.lon;
    },
    setCurrent(state, current) {
      state.current = {
        date: dateformat(new Date(current.dt * 1000)),
        temp: Math.trunc(current.temp),
        feel: Math.trunc(current.feels_like),
        description: current.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`,
        wind_speed: current.wind_speed,
        wind_deg: current.wind_deg,
        pressure: current.pressure,
        humidity: current.humidity,
        visibility: current.visibility
      }
    },
    setDaily(state, daily) {
      state.daily = daily.slice(1).map(item => {
        return {
          date: dateformat(new Date(item.dt * 1000)),
          tempMax: Math.trunc(item.temp.max),
          tempMin: Math.trunc(item.temp.min),
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }
      });
    },
    setHourly(state, hourly) {
      state.hourly = hourly.slice(0, 12).map(item => {
        return {
          time: new Date(item.dt * 1000).getHours(),
          temp: Math.trunc(item.temp),
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }
      });
    }
  },
  actions: {
    loadCity({
      state,
      commit
    }) {
      return api.getCity({
          q: state.city
        })
        .then(data => {
          if (data && data[0]) {
            commit('setLocation', data[0]);
            commit('changeCity', data[0].address.city);
          } else throw new Error('Empty data');
        })
    },
    loadWeather({
      state,
      commit
    }) {
      return api.getWeather(state.location)
        .then(data => {
          if (data && typeof data === 'object') {
            commit('setCurrent', data.current)
            commit('setDaily', data.daily)
            commit('setHourly', data.hourly)
          } else throw new Error('Empty data');
        })
    },
    loadData({
      dispatch
    }) {
      dispatch('loadCity')
        .then(() => {
          dispatch('loadWeather')
        })
    }
  },
  getters: {},
  modules: {}
})