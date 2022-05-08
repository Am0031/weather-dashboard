//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units={imperial}&q={city name}&appid={API key}";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units={imperial}&lat={lat}&lon={lon}&exclude={part}&appid={API key}";
const flagBaseUrl = `https://countryflagsapi.com/png/`;
let flagUrl = "";
let searchList = [];
//temporary variables and arrays used during development
const tempSearchList = ["london", "madrid", "new york", "paris"];
const tempEmptyList = [];
const alertMessage = `<div class="alert-message w-100 mt-2 mb-2 text-center">
No previous searches.
</div>`;
const clearBtn = `<button
class="btn btn-warning w-100 mt-2 mb-2 clear-btn"
id="clear-btn"
>
Clear searches
</button>`;
const tempCurrentWeatherFromApi = {
  coord: {
    lon: -0.13,
    lat: 51.51,
  },
  weather: [
    {
      id: 300,
      main: "Drizzle",
      description: "light intensity drizzle",
      icon: "09d",
    },
  ],
  base: "stations",
  main: {
    temp: 44.906,
    pressure: 1012,
    humidity: 81,
    temp_min: 42.8,
    temp_max: 46.4,
  },
  visibility: 10000,
  wind: {
    speed: 9.17,
    deg: 80,
  },
  clouds: {
    all: 90,
  },
  dt: 1652000400,
  sys: {
    type: 1,
    id: 5091,
    message: 0.0103,
    country: "GB",
    sunrise: 1485762037,
    sunset: 1485794875,
  },
  id: 2643743,
  name: "London",
  cod: 200,
};

const tempForecastFromApi = {
  lat: 33.44,
  lon: -94.04,
  timezone: "America/Chicago",
  timezone_offset: -21600,
  daily: [
    {
      dt: 1652000400,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Clouds",
          description: "few clouds",
          icon: "02d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652086800,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Clear",
          description: "clear sky",
          icon: "01d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652173200,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Drizzle",
          description: "light intensity drizzle",
          icon: "09d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652259600,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Clouds",
          description: "scattered clouds",
          icon: "03n",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652346000,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "02d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652432400,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652518800,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
    {
      dt: 1652605200,
      sunrise: 1618282134,
      sunset: 1618333901,
      moonrise: 1618284960,
      moonset: 1618339740,
      moon_phase: 0.04,
      temp: {
        day: 43.952,
        min: 35.492,
        max: 51.656,
        night: 35.492,
        eve: 42.908,
        morn: 41.612,
      },
      feels_like: {
        day: 39.938,
        night: 37.616,
        eve: 38.012,
        morn: 37.616,
      },
      pressure: 1020,
      humidity: 81,
      dew_point: 276.77,
      wind_speed: 3.06,
      wind_deg: 294,
      weather: [
        {
          id: 500,
          main: "Rain",
          description: "light rain",
          icon: "10d",
        },
      ],
      clouds: 56,
      pop: 0.2,
      rain: 0.62,
      uvi: 1.93,
    },
  ],
};

//UTILITY FUNCTIONS

const getFromLS = (data) => {
  return JSON.parse(localStorage.getItem(data));
};

const writeToLS = (key, data) => {
  localStorage.setItem(key, JSON.stringify(data));
};

const clearLS = () => {
  localStorage.clear();
};
//END UTILITY FUNCTIONS

//Function...
const getUviClass = () => {
  //checkuvi index with iff statement
  return "uvi-extreme";
};

const renderListItem = (each) => {
  const display = each.toUpperCase();
  $("#search-list").append(`<li
  class="btn btn-outline-info w-100 mt-2 mb-2 text-center"
  id="${each}"
  >
  ${display}
  </li>`);
};
const renderCurrentData = (currentInfo) => {
  //empty Current section
  //render current data with info passed
  $("#weather-container").append(`<div
  class="weather-title d-flex ml-1 mr-1 mt-3 mb-3"
  id="weather-title"
>
  <div class="flag d-flex flex-row align-items-center">
    <img src="${flagUrl}" />
    <h2 class="town pl-3 pr-3 text-uppercase font-weight-bold mb-0">
      ${currentInfo.cityName}
    </h2>
  </div>

  <h2 class="weather-text pl-3 pr-3 mb-0">
    Today's weather conditions
  </h2>
</div>
<div
  class="current-weather text-white bg-dark ml-1 mr-1 mt-3 mb-3"
  id="current-weather"
>
  <div class="card-header d-flex">
    <h3 class="card-info">${currentInfo.date}</h3>
    <h3 class="card-text icon-text">${currentInfo.weatherCondition}</h3>
  </div>
  <div class="card-body d-flex">
    <h3 class="card-icon">
    ${currentInfo.weatherIcon}
    </h3>
    <div class="card-info d-flex flex-column">
      <p class="card-text">Temperature : ${currentInfo.temperature} <span>&#8451;</span></p>
      <p class="card-text">Humidity : ${currentInfo.humidity}%</p>
      <p class="card-text">Wind speed : ${currentInfo.windSpeed} MPH</p>
      <p class="card-text">
        UV Index :
        <span class="uvIndex ${currentInfo.uviClass} pl-3 pr-3">${currentInfo.uvi}</span>
      </p>
    </div>
  </div>
</div>`);
};

const renderForecastData = (forecastInfo) => {
  //empty forecast section
  //render forecast data with info passed
  $("#weather-container")
    .append(`<div class="forecast-container" id="forecast-container">
  <h2 class="forecast-title pl-3 pr-3">5-Day Forecast</h2> <div
  class="forecast d-flex flex-row flex-wrap pt-3 pb-3 justify-content-between" id="forecast-cards"></div>`);

  const renderForecastCard = (each) => {
    $("#forecast-cards").append(`<div
      class="forecast-card d-flex flex-column align-items-center text-white bg-dark m-1"
    >
      <h4 class="card-header w-100 text-center">${each.date}</h4>
      <div class="card-body">
        <p class="card-text text-center">
        ${each.weatherCondition} ${each.weatherIcon}
        </p>
        <p class="card-text text-center">
          Temp : ${each.temperature} <span>&#8451;</span>
        </p>
        <p class="card-text text-center">Humidity : ${each.humidity}%</p>
        <p class="card-text text-center">Wind : ${each.windSpeed} MPH</p>
      </div>
    </div>`);
  };
  forecastInfo.forEach(renderForecastCard);
};

const renderWeatherData = (data) => {
  //call api to fetch current weather data
  //get city name
  const cityName = data;
  //build url
  //call api and wait for response
  const weatherData = tempCurrentWeatherFromApi;

  //extract lon and lat
  const lat = weatherData.coord.lat;
  const lon = weatherData.coord.lon;
  //call api to fetch forecast data
  //get lon and lat from previous api call

  //build url
  //call api and wait for response
  const forecastData = tempForecastFromApi;

  //from response, cherry pick relevant data for current weather
  const uviColor = getUviClass(forecastData.daily[0].uvi);
  const currentInfo = {
    cityName: weatherData.name.toUpperCase(),
    date: moment(weatherData.dt).format("DD/MM/YYYY"),
    weatherCondition: weatherData.weather.main,
    weatherIcon: weatherData.weather.icon,
    temperature: ((weatherData.main.temp + 32) * 5) / 9,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
    uvi: forecastData.daily[0].uvi,
    uviClass: uviColor,
  };

  //from response, cherry pick relevant data for forecast
  const gatherForecastInfo = (forecastData) => {
    const forecast = [];
    for (let i = 1; i < forecastData.daily.length; i += 1) {
      const forecastItem = {
        date: forecastData.daily[i].dt,
        weatherCondition: forecastData.daily[i].weather.main,
        weatherIcon: forecastData.daily[i].weather.icon,
        temperature: forecastData.daily[i].temp.max,
        humidity: forecastData.daily[i].humidity,
        windSpeed: forecastData.daily[i].wind_speed,
      };
      forecast.push(forecastItem);
    }
    return forecast;
  };

  const forecastInfo = gatherForecastInfo(forecastData);

  //extract country code
  const countryCode = weatherData.sys.country;
  //build url
  flagUrl = `flagBaseUrl${countryCode}`;
  //empty weather container
  $("#weather-container").empty();
  //render current weather data (weather title and current weather divs)
  renderCurrentData(currentInfo);
  //render forecast data (forecast container)
  renderForecastData(forecastInfo);
};

const renderCities = () => {
  //render clear button (maybe)
  //render ul and li from cities list
  //add event listener on search list container
};
const renderSearchList = () => {
  //get search list from local storage
  const search = searchList;
  console.log(search);
  console.log(search.length);
  //if local storage is empty, then render alert message
  if (search.length === 0) {
    $("#search-history").append(alertMessage);
  } else {
    $("#search-history").append(
      `<ul class="search-list p-0" id="search-list"></ul>`
    );
    search.forEach(renderListItem);
    $("#search-history").append(clearBtn);
  }

  //else render cities
};

const addCityToSearchList = () => {
  //get search list from local storage
  //if name is already in array, do nothing
  //else, add name to array
  //set new array into local storage
};

const handleFormSubmit = () => {
  //check input from input field
  //if empty, change class/render alert message
  //else get city name and render Weather data
  //add city name to search list
  //render search list
};
const handleCityClick = () => {
  //if click from clear button, clear LS + empty search list + render search list
  //else get city name from data attribute's value
  //render Weather data
};

const handleClick = () => {
  //if click from search form, then go to handleFormSubmit
  //if click from cities list, then go to handleCityClick
};

const renderWeatherContainer = () => {
  //get search list from local storage
  const search = searchList;
  //if local storage is empty, then render alert message
  if (search.length === 0) {
    $("#weather-container").append(alertMessage);
  }
  //else extract last city in array
  else {
    const last = search[search.length - 1];
    //render weather data
    renderWeatherData(last);
  }
};

//Main function
const onReady = () => {
  console.log("start");
  //render recent search container
  renderSearchList();
  //render weather container (add function call to test rendering)
};

//On page load
$("document").ready(onReady);
