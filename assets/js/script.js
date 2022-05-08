//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key}";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key}";
let searchList = [];

//UTILITY FUNCTIONS

const getFromLS = () => {
  //get from local storage
};

const writeToLS = () => {
  //set into local storage
};

const clearLS = () => {
  //clear local storage
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
  //get city name from input field
  //if empty, change class/render alert message
  //else render Weather data
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
