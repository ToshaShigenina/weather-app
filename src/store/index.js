import {
  createStore
} from 'vuex'
import api from '../services/api'
import dateformat from '../plugins/dateformat'

export default createStore({
  state: {
    isLoad: false,
    city: '',
    search: '',
    history: [],
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
      wind_direction: null,
      pressure: null,
      humidity: null,
      visibility: null,
    },
    daily: [{
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
    ],
    hourly: [{
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
      {
        date: ''
      },
    ],
    errors: {
      search: "Упс! Город не найден, попробуйте другой",
      load: "Что-то пошло не так! Перезагрузите страницу.",
    },
    errorType: null
  },
  mutations: {
    setIsLoad(state, load) {
      state.isLoad = load;
    },
    changeCity(state, city) {
      state.city = city;
    },
    setSearch(state, search) {
      state.search = search;
    },
    setLocation(state, data) {
      state.location.lat = data.lat;
      state.location.lon = data.lon;
    },
    setCurrent(state, current) {
      state.current = {
        date: dateformat(new Date(current.dt * 1000)),
        temp: Math.floor(current.temp),
        feel: Math.floor(current.feels_like),
        description: current.weather[0].description,
        icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`,
        wind_speed: Math.floor(current.wind_speed),
        wind_deg: current.wind_deg,
        pressure: Math.floor((current.pressure * 100) / 133.3),
        humidity: current.humidity,
        visibility: Math.floor(current.visibility / 1000)
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
          date: `${new Date(item.dt * 1000).getHours()}:00`,
          temp: Math.trunc(item.temp),
          icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
        }
      });
    },
    setErrorType(state, type) {
      state.errorType = type;
    },
    setHistory(state, history) {
      state.history = history;
    },
    setHistoryItem(state, item) {
      if (state.history.length) {
        const lastCity = state.history[state.history.length - 1];
        if (lastCity !== item) state.history.push(item);
      } else {
        state.history.push(item);
      }
      localStorage.setItem('history', state.history.join());
    }
  },
  actions: {
    initHistory({
      commit
    }) {
      const history = localStorage.getItem('history') ? localStorage.getItem('history').split(',') : [];
      if (history.length) {
        commit('changeCity', history[history.length - 1]);
        commit('setSearch', history[history.length - 1]);
        commit('setHistory', history);
      } else {
        commit('changeCity', 'Москва');
        commit('setSearch', 'Москва');
        commit('setHistoryItem', 'Москва');
      }
    },
    loadCity({
      state,
      commit
    }) {
      return api.getCity({
          q: state.search
        })
        .then(data => {
          if (data && data[0]) {
            commit('setLocation', data[0]);
            commit('changeCity', data[0].address.city);
          } else {
            commit('setErrorType', 'search');
          }
        })
    },
    loadWeather({
      state,
      commit
    }) {
      return api.getWeather(state.location)
        .then(data => {
          if (data && typeof data === 'object') {
            commit('setCurrent', data.current);
            commit('setDaily', data.daily);
            commit('setHourly', data.hourly);
            commit('setIsLoad', false);
          } else {
            commit('setErrorType', 'search');
          }
        })
    },
    loadData({
      dispatch,
      commit,
      state
    }) {
      commit('setIsLoad', true);
      commit('setErrorType', null);
      dispatch('loadCity')
        .then(() => {
          dispatch('loadWeather')
            .then(() => {
              commit('setHistoryItem', state.city);
            })
            .catch(() => {
              commit('setErrorType', 'load');
            })
        })
        .catch(() => {
          commit('setErrorType', 'load');
        })
    }
  },
  getters: {
    getWindDirection(state) {
      const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
      if (state.current.wind_deg >= 345 || state.current.wind_deg <= 15) return directions[0];
      if (state.current.wind_deg > 15 && state.current.wind_deg < 75) return directions[1];
      if (state.current.wind_deg >= 75 && state.current.wind_deg <= 105) return directions[2];
      if (state.current.wind_deg > 105 && state.current.wind_deg < 165) return directions[3];
      if (state.current.wind_deg >= 165 && state.current.wind_deg <= 195) return directions[4];
      if (state.current.wind_deg > 195 && state.current.wind_deg < 255) return directions[5];
      if (state.current.wind_deg >= 255 && state.current.wind_deg <= 285) return directions[6];
      return directions[7];
    },
    getError(state) {
      if (state.errorType) return state.errors[state.errorType];
      return null;
    },
    getSearch(state) {
      return state.search;
    },
    getHistoryReverse(state) {
      return [].concat(state.history).reverse();
    }
  },
})