//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentWeatherBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=current,minutely,hourly";
const flagBaseUrl = `https://countryflagsapi.com/png/`;
let flagUrl = "";
let searchList = [];
//temporary variables and arrays used during development
const tempSearchList = ["london", "madrid", "new york", "paris"];

const alertMessage = `<div class="alert-message w-100 mt-2 mb-2 text-center">
No previous searches.
</div>`;
const clearBtn = `<button
class="btn btn-warning w-100 mt-2 mb-2 clear-btn"
id="clear-btn" type="button"
>
Clear searches
</button>`;
let currentWeatherFromApi;
let forecastWeatherFromApi;
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
    country: "FR",
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

const emptyContainer = (containerId) => {
  $(`#${containerId}`).empty();
};

const toCelsius = (fahrenheit) => {
  return (((fahrenheit - 32) * 5) / 9).toFixed(3);
};
//END UTILITY FUNCTIONS

//Functions to get info from API
const getCurrentWeatherFromApi = async (cityName) => {
  //build url
  const fullUrl = `${currentWeatherBaseUrl}&q=${cityName}&appid=${appid}`;
  //call api and wait for response
  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to get weather data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

const getForecastFromApi = async (coordinates) => {
  //build url
  const fullUrl = `${forecastBaseUrl}&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appid}`;
  //call api and wait for response
  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      return data;
    } else {
      throw new Error("Failed to get forecast data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Functions
const getUviClass = (data) => {
  //checkuvi index with iff statement
  if (data < 3) {
    return "uvi-low";
  } else if (data < 6) {
    return "uvi-moderate";
  } else if (data < 8) {
    return "uvi-high";
  } else if (data < 11) {
    return "uvi-very-high";
  } else if (data >= 11) {
    return "uvi-extreme";
  }
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
      ${currentInfo.name}
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
    <div class="card-icon">
      <img class="img-icon img-fluid" src=https://openweathermap.org/img/wn/${currentInfo.weatherIcon}@2x.png />
    </div>
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
        <div class="card-condition d-flex flex-row justify-content-center">
          <p class="card-text d-flex flex-row align-items-center mb-0">
         ${each.weatherCondition} 
          </p>
          <div><img class="img-fluid" src=https://openweathermap.org/img/wn/${each.weatherIcon}.png />
          </div>
          </div>
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

const renderWeatherData = async (data) => {
  //call api to fetch current weather data
  //get city name
  const cityName = data;
  console.log(cityName);
  //build url
  //call api and wait for response (await)
  const weatherData = await getCurrentWeatherFromApi(cityName);
  console.log(weatherData);

  //extract lon and lat
  const coordinates = {
    lat: weatherData.coord.lat,
    lon: weatherData.coord.lon,
  };
  //call api to fetch forecast data
  //get lon and lat from previous api call

  //build url
  //call api and wait for response (await)
  const forecastData = await getForecastFromApi(coordinates);
  console.log(forecastData);

  //from response, cherry pick relevant data for current weather
  const uviColor = getUviClass(forecastData.daily[0].uvi);
  const temp = toCelsius(weatherData.main.temp);
  const currentInfo = {
    name: cityName.toUpperCase(),
    date: moment.unix(weatherData.dt).format("DD/MM/YYYY"),
    weatherCondition: weatherData.weather[0].main,
    weatherIcon: weatherData.weather[0].icon,
    temperature: temp,
    humidity: weatherData.main.humidity,
    windSpeed: weatherData.wind.speed,
    uvi: forecastData.daily[0].uvi,
    uviClass: uviColor,
  };
  console.log(currentInfo);

  //from response, cherry pick relevant data for forecast
  const gatherForecastInfo = (forecastData) => {
    const forecast = [];
    for (let i = 1; i < 6; i += 1) {
      const temp = toCelsius(forecastData.daily[i].temp.max);
      const forecastItem = {
        date: moment.unix(forecastData.daily[i].dt).format("DD/MM/YYYY"),
        weatherCondition: forecastData.daily[i].weather[0].main,
        weatherIcon: forecastData.daily[i].weather[0].icon,
        temperature: temp,
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
  flagUrl = `${flagBaseUrl}${countryCode}`;
  //empty weather container
  $("#weather-container").empty();
  //render current weather data (weather title and current weather divs)
  renderCurrentData(currentInfo);
  //render forecast data (forecast container)
  renderForecastData(forecastInfo);
};

const addCityToSearchList = () => {
  //get search list from local storage
  //if name is already in array, do nothing
  //else, add name to array
  //set new array into local storage
};

const handleFormClick = (value) => {
  //check input from input field
  console.log("handling submission");
  const input = $("#input-field").val();
  //if empty or invalid, change class/render alert message
  if (!input || !/^[A-Za-z\s]*$/.test(input)) {
    $("#input-field").addClass("is-invalid");
  } else {
    renderWeatherData(value);
    const listCities = getFromLS();
  }
  //else get city name and render Weather data
  //add city name to search list
  //render search list

  //validate technique -> look into it:
  // $("#input-field").validate({
  //   rules: {
  //     inputField: {
  //       required: true,
  //     },
  //   },
  // });
};
const handleCityClick = (value) => {
  //if click from clear button, clear LS + empty search list + render search list
  console.log("handling city click");
  //else get city name from data attribute's value
  //render Weather data
};
const handleClearClick = () => {
  //if click from clear button, clear LS + empty search list + render search list
  console.log("handling clear click");
  clearLS();
  //empty search list container
  const containerId = "search-history";
  emptyContainer(containerId);
  //render search list
  renderSearchList();
};

const handleClick = (event) => {
  event.stopPropagation();
  const target = $(event.target);
  const targetId = $(event.target).attr("id");

  //if click from a button then check which button
  if (target.is("button")) {
    //if button from search form, then go to handleFormSubmit
    if (targetId == "search-btn") {
      handleFormClick(targetId);
    }
    //if button from search list, then go to handleClearClick
    else {
      handleClearClick();
    }
  }
  //if click from cities list, then go to handleCityClick
  else if (target.is("li")) {
    handleCityClick(targetId);
  }
};

const renderSearchList = () => {
  //get search list from local storage
  const search = tempSearchList;
  //if local storage is empty, then render alert message
  if (search.length === 0) {
    $("#search-history").append(alertMessage);
  }
  //else render list items
  else {
    $("#search-history").append(
      `<ul class="search-list p-0" id="search-list"></ul>`
    );
    search.forEach(renderListItem);
    $("#search-history").append(clearBtn);
  }
  //add event listener to search container
  $("#search-container").click(handleClick);
};

const renderWeatherContainer = async () => {
  //get search list from local storage
  const search = tempSearchList;
  //if local storage is empty, then render alert message
  if (search.length === 0) {
    $("#weather-container").append(alertMessage);
  }
  //else extract last city in array
  else {
    const last = search[search.length - 1];
    //render weather data
    await renderWeatherData(last);
  }
};

//Main function
const onReady = async () => {
  //render recent search container
  renderSearchList();
  //render weather container (add function call to test rendering)
  await renderWeatherContainer();
};

//On page load
$("document").ready(onReady);
