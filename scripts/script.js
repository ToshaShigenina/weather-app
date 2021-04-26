const data = {};
const theme = true;

const getError = () => {
  const errMsg = document.querySelector('.search__error');
  errMsg.style.display = 'block';
};

const removeError = () => {
  const errMsg = document.querySelector('.search__error');
  errMsg.removeAttribute('style');
};

const getCity = async (city) => {
  removeError();
  if(city.length !== 0) {
    let response = await fetch(`https://nominatim.openstreetmap.org/search?q=${city}&format=json&addressdetails=1&limit=1`);
    if(response.ok && response) {
      let result = await response.json();
      if(result.length > 0) {
        return result[0];
      }
      else {
        getError();
        return false;
      }
    } else {
      getError();
      return false;
    }
  } else return false;
};

const getWeather = async (location, key) => {
  let response = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${location.lat}&lon=${location.lon}&units=metric&appid=${key}&lang=ru`);
  if(response.ok) {
    let result = await response.json();
    data.city = location.address.city;
    return result;
  } else {
    console.log('error');
  }
};

const generateCurrent = (current) => {
  return {
    date: new Date(+`${current.dt}000`),
    temp: current.temp,
    feel: current.feels_like,
    description: current.weather[0].description,
    icon: `http://openweathermap.org/img/wn/${current.weather[0].icon}@4x.png`,
    wind_speed: current.wind_speed,
    wind_deg: current.wind_deg,
    pressure: current.pressure,
    humidity: current.humidity,
    visibility: current.visibility
  };
};

const generateDaily = (daily) => {
  const result = [];
  daily.slice(0,7).forEach(item => {
    result.push({
      date: new Date(+`${item.dt}000`),
      tempMax: item.temp.max,
      tempMin: item.temp.min,
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    })
  });
  return result;
};

const generateHourly = (hourly) => {
  const result = [];
  hourly.slice(0,12).forEach(item => {
    result.push({
      time: new Date(+`${item.dt}000`).getHours(),
      temp: item.temp,
      icon: `http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`
    });
  });
  return result;
};

const dateformat = (date) => {
  const formatter = new Intl.DateTimeFormat('ru', {
    weekday: "short",
    month: "short",
    day: "numeric"
  });
  return formatter.format(date);
};

const renderCurrent = (data) => {
  const directions = ['С', 'СВ', 'В', 'ЮВ', 'Ю', 'ЮЗ', 'З', 'СЗ'];
  const icon = document.querySelector('.condition__icon');
  const temp = document.querySelector('.condition__temp span');
  const day = document.querySelector('.date .date__item:last-of-type');
  const city = document.querySelector('.location span');
  const desc = document.querySelector('.condition__fallout');
  const feel = document.querySelector('.condition__feel span');

  const speed = document.querySelector('.wind .card__value span');
  const direction = document.querySelector('.wind__value span');
  const arrow = document.querySelector('.wind__icon');
  const humidity = document.querySelector('.humidity .card__value span');
  const visible = document.querySelector('.visibility .card__value span');
  const pressure = document.querySelector('.pressure .card__value span');

  const createWind = (wind_deg, wind, arrow) => {
    if (wind_deg >= 345 || wind_deg <= 15) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[0]
      return 
    } else if(wind_deg > 15 && wind_deg < 75) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[1]
      return 
    } else if(wind_deg >= 75 && wind_deg <= 105) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[2]
      return 
    } else if(wind_deg > 105 && wind_deg < 165) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[3]
      return 
    } else if(wind_deg >= 165 && wind_deg <= 195) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[4]
      return 
    } else if(wind_deg > 195 && wind_deg < 255) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[5]
      return 
    } else if(wind_deg >= 255 && wind_deg <= 285) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[6]
      return 
    } else if(wind_deg > 285) {
      arrow.style.transform = `rotateZ(${wind_deg}deg)`;
      wind.textContent = directions[7]
      return 
    }
  };

  icon.src = data.current.icon;
  temp.textContent = Math.floor(data.current.temp);
  day.textContent = dateformat(data.current.date);
  city.textContent = data.city;
  desc.textContent = data.current.description;
  feel.textContent = Math.floor(data.current.feel);
  speed.textContent = Math.floor(data.current.wind_speed);
  humidity.textContent = data.current.humidity;
  visible.textContent = Math.floor(data.current.visibility / 1000);
  pressure.textContent = Math.floor((data.current.pressure * 100) / 133.3);
  createWind(data.current.wind_deg, direction, arrow);
};

const renderCards = (data) => {
  const dailyCards = document.querySelectorAll('#for-days .card');
  const hourlyCards = document.querySelectorAll('#for-hours .card');

  const cardDaily = ({date, icon, tempMax, tempMin}, card) => {
    card.querySelector('.card__name').textContent = dateformat(date);
    card.querySelector('.card__icon').src = icon;
    card.querySelector('.card__term-min').textContent = Math.floor(tempMin) + '°C';
    card.querySelector('.card__term-max').textContent = Math.floor(tempMax) + '°C';
  };
  const cardHourly = ({time, icon, temp}, card) => {
    card.querySelector('.card__name').textContent = `${time}:00`;
    card.querySelector('.card__icon').src = icon;
    card.querySelector('.card__term-max').textContent = Math.floor(temp) + '°C';
  };

  data.daily.forEach((item, i) => {
    cardDaily(item, dailyCards[i])
  });

  data.hourly.forEach((item, i) => {
    cardHourly(item, hourlyCards[i])
  });
};

const getData = e => {
  if(e) e.preventDefault();
  const city = document.querySelector('.search__input').value.trim();
  getCity(city)
    .then(result => {
      if(result) return getWeather(result, '7375fdc7138355640ba403df8e115fb7')
      return false;
    })
    .then(result => {
      if(result) {
        data.current = generateCurrent(result.current);
        data.daily = generateDaily(result.daily);
        data.hourly = generateHourly(result.hourly);
        return data;
      } else return false
    })
    .then(result => {
      if(result) {
        renderCards(result);
        renderCurrent(result);
      }
    });
};

const switchTabs = e => {
  let target = e.target;

  const removeClass = (selector) => {
    const elems = document.querySelectorAll(selector);
    elems.forEach(item => item.classList.remove('active'));
  };

  if(target.closest('.label__btn:not(.active)')) {
    target = target.closest('.label__btn');
    removeClass('.label__btn');
    removeClass('.tabs__item');
    target.classList.add('active');
    document.getElementById(target.dataset.for).classList.add('active')
  }
};

const searchToggle = e => {
  const searchElem = document.querySelector('.search');
  const target = e.target;
  if(target.closest('#open-search')) {
    searchElem.classList.add('open');
  }
  if(target.closest('#close-search')) {
    searchElem.classList.remove('open');
  }
};

const initSlider = () => {
  const sliderElem = document.querySelectorAll('.slider');

  const swipeSlider = (slider) => {
    const nextBtn = slider.querySelector('.btn_next');
    const prevBtn = slider.querySelector('.btn_prev');
    const slidesContainer = slider.querySelector('.slider__container');
    const slides = slider.querySelectorAll('.card');
    let width = (slides.length * 110 + (slides.length - 1) * 24) - slidesContainer.clientWidth;
    let index = 0;
    
    const observeSlider = (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          width = (slides.length * 110 + (slides.length - 1) * 24) - entry.target.clientWidth;
          observer.unobserve(entry.target);
        }
      })
    };
    const nextSlide = (container) => {
      if((index + 1) * 134 <= width) {
        index++;
        container.style.transform = `translateX(-${index * 134}px)`;
        if(index * 134 === width) nextBtn.disabled = true;
      }
      prevBtn.disabled = false;
    };
    const prevSlide = (container) => {
      if((index - 1) * 134 >= 0) {
        index--;
        container.style.transform = `translateX(-${index * 134}px)`;
        if(index * 134 === 0) prevBtn.disabled = true;
      }
      nextBtn.disabled = false;
    };

    const observer = new IntersectionObserver(observeSlider);

    observer.observe(slidesContainer);
    nextBtn.addEventListener('click', () => {
      nextSlide(slidesContainer);
    });
    prevBtn.addEventListener('click', () => {
      prevSlide(slidesContainer);
    });
  };
  
  sliderElem.forEach(item => {
    swipeSlider(item);
  })
};

const themeChange = e => {
  const target = e.target;
  if (target.closest('.theme__checkbox')) {
    document.body.classList.toggle('theme-dark');
  }
};

const init = () => {
  document.addEventListener('DOMContentLoaded', () => {
    getData();
    initSlider();
    document.addEventListener('click', switchTabs);
    document.addEventListener('submit', getData);
    document.addEventListener('change', themeChange);
    document.addEventListener('click', searchToggle);
  });
}

init();

