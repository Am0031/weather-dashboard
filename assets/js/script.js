//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units={imperial}&q={city name}&appid={API key}";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units={imperial}&lat={lat}&lon={lon}&exclude={part}&appid={API key}";
let searchList = [];
//temporary variables and arrays used during development
const tempSearchList = ["london", "madrid", "new york", "paris"];
const tempEmptyList = [];
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
    speed: 4.1,
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
const renderCurrentData = () => {
  //empty Current section
  //render current data with info passed
};

const renderForecastData = () => {
  //empty forecast section
  //render forecast data with info passed
};

const renderWeatherData = () => {
  //call api to fetch current weather data
  //get city name
  //build url
  //call api and wait for response
  //from response, cherry pick relevant data
  //extract lon and lat
  //call api to fetch forecast data
  //get lon and lat from previous api call
  //build url
  //call api and wait for response
  //extract country code
  //build url
  //empty weather container
  //render current weather data (weather title and current weather divs)
  //render forecast data (forecast container)
};

const renderCities = () => {
  //render clear button (maybe)
  //render ul and li from cities list
  //add event listener on search list container
};
const renderSearchList = () => {
  //get search list from local storage
  //if local storage is empty, then render alert message
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
  //if local storage is empty, then render alert message
  //else extract last city in array
  //render current weather data
  //render forecast data
};

//Main function
const onReady = () => {
  console.log("start");
  //render recent search container
  //render weather container
};

//On page load
$("document").ready(onReady);
