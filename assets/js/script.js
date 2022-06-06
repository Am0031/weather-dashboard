//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentWeatherBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly";
const flagBaseUrl = `https://countryflagsapi.com/png/`;
let flagUrl = "";

let letterInput = true;

//Variables for container and divs rendering

const searchAlertMessage = `<div class="search-history mt-3" id="search-history">
<h2>Recent searches</h2>
<div class="warning-message alert-warning w-100 mt-2 mb-2 text-center">
No previous searches.
</div>
</div>`;

const searchFormBase = `<form class="search-form d-flex flex-column" id="search-form">
<label class="input-label h2" for="input">Search form</label>
<input
  class="search-input"
  type="text"
  minlength="1"
  name="inputField"
  id="input-field"
  placeholder="Enter a city"
  aria-label="Enter a city"
/>
<p class="invalid-input-message w-100 mt-2 mb-2 text-center invisible" id="invalid-input">
Please enter a valid city name.
</p>
<button
  class="btn btn-secondary mt-2 mb-2 search-btn"
  id="search-btn"
  type="submit"
>
  Search
</button>
</form>`;

const searchHistoryBase = `<div class="search-history mt-5" id="search-history">
<h2>Search History</h2>
<ul class="search-list p-0" id="search-list">
</ul>
</div>`;

const clearBtn = `<button
class="btn btn-danger w-100 mt-2 mb-2 clear-btn"
id="clear-btn" type="button"
>
Clear searches
</button>`;

const weatherAlertMessage = `<div class="warning-message alert-warning w-100 mt-2 mb-2 text-center">
The system failed to retrieve the data. Please try another city name.
</div>`;

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

const removeContainer = (containerId) => {
  $(`#${containerId}`).remove();
};

const toCelsius = (fahrenheit) => {
  return (((fahrenheit - 32) * 5) / 9).toFixed(2);
};
//END UTILITY FUNCTIONS

//Async Function - call api to fetch current weather data (with city name from input field)
const getCurrentWeatherFromApi = async (cityName) => {
  //build url
  const fullUrl = `${currentWeatherBaseUrl}&q=${cityName}&appid=${appid}`;
  //call api and wait for response
  try {
    const response = await fetch(fullUrl);

    if (response.ok) {
      const data = await response.json();
      letterInput = true;
      return data;
    } else {
      letterInput = false;
      throw new Error("Failed to get weather data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Async Function - call api to fetch forecast data (with lon and lat from previous api call)
const getForecastFromApi = async (coordinates) => {
  //build url
  const fullUrl = `${forecastBaseUrl}&lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${appid}`;
  //call api and wait for response
  try {
    const response = await fetch(fullUrl);
    if (response.ok) {
      const data = await response.json();

      return data;
    } else {
      throw new Error("Failed to get forecast data");
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

//Function to get uvi class
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

//Functions to render parts on the page
const renderListItem = (each) => {
  //render history list items using template string
  const display = each.toUpperCase();
  $("#search-list").append(`<li
  class="btn btn-outline-info w-100 mt-2 mb-2 text-center"
  id="${each}"
  >
  ${display}
  </li>`);
};

const renderCurrentData = (currentInfo) => {
  //render current data with info passed using template string
  $("#weather-container").append(`<div
  class="weather-title d-flex ml-1 mr-1 mt-3 mb-3"
  id="weather-title"
>
  <div class="flag d-flex flex-row align-items-center my-2">
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
    <h3 class="card-date text-center">${currentInfo.date}</h3>
    <h3 class="card-text icon-text">${currentInfo.weatherCondition}</h3>
  </div>
  <div class="card-body d-flex">
    <div class="card-icon">
      <img class="img-icon img-fluid" src=https://openweathermap.org/img/wn/${
        currentInfo.weatherIcon
      }@2x.png />
    </div>
    <div class="card-info d-flex flex-column">
      <p class="card-text">Temperature : ${
        currentInfo.temperature
      } <span>&#8451;</span></p>
      <p class="card-text">Humidity : ${currentInfo.humidity}%</p>
      <p class="card-text">Wind speed : ${currentInfo.windSpeed} MPH</p>
      <p class="card-text">
        UV Index :
        <span class="uvIndex ${getUviClass(currentInfo.uvi)} pl-3 pr-3">${
    currentInfo.uvi
  }</span>
      </p>
    </div>
  </div>
</div>`);
};

const renderForecastData = (forecastInfo) => {
  //render forecast data with info passed using template string
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
          <div><img class="img-fluid" src=https://openweathermap.org/img/wn/${
            each.weatherIcon
          }.png />
          </div>
          </div>
        <p class="card-text text-center">
          Temp : ${each.temperature} <span>&#8451;</span>
        </p>
        <p class="card-text text-center">Humidity : ${each.humidity}%</p>
        <p class="card-text text-center">Wind : ${each.windSpeed} MPH</p>
        <p class="card-text text-center">
        UV Index :
        <span class="uvIndex ${getUviClass(each.uvi)} pl-3 pr-3">${
      each.uvi
    }</span>
        </p>
      </div>
    </div>`);
  };

  forecastInfo.forEach(renderForecastCard);
};

//Functions to extract information from the API response
const getCoordinates = (weatherData) => {
  const coordinates = {
    lat: weatherData.coord.lat,
    lon: weatherData.coord.lon,
  };
  return coordinates;
};

const getCityName = (weatherData) => {
  return weatherData.name;
};

const gatherCurrentInfo = (cityName, data) => {
  const currentInfo = {
    name: cityName.toUpperCase(),
    date: moment.unix(data.current.dt).format("dddd DD-MM-YYYY"),
    weatherCondition: data.current.weather[0].main,
    weatherIcon: data.current.weather[0].icon,
    temperature: toCelsius(data.current.temp),
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed,
    uvi: data.current.uvi,
  };
  return currentInfo;
};

const gatherForecastInfo = (data) => {
  const forecast = [];
  for (let i = 1; i < 6; i += 1) {
    const forecastItem = {
      date: moment.unix(data.daily[i].dt).format("DD-MM-YYYY"),
      weatherCondition: data.daily[i].weather[0].main,
      weatherIcon: data.daily[i].weather[0].icon,
      temperature: toCelsius(data.daily[i].temp.day),
      humidity: data.daily[i].humidity,
      windSpeed: data.daily[i].wind_speed,
      uvi: data.daily[i].uvi,
    };
    forecast.push(forecastItem);
  }
  return forecast;
};

//Function to build the country flag url
const getCountryFlagUrl = (countryCode) => {
  //pass country code to build url
  flagUrl = `${flagBaseUrl}${countryCode}`;
};

//Async function - Main function to gather and render the weather data inside the weather container
const renderWeatherData = async (data) => {
  try {
    //call api and wait for response (await)
    const weatherData = await getCurrentWeatherFromApi(data);

    //extract lon and lat
    const coordinates = getCoordinates(weatherData);
    const cityName = getCityName(weatherData);

    //call api and wait for response (await)
    const forecastData = await getForecastFromApi(coordinates);

    //from response, cherry pick relevant data for current weather
    const currentInfo = gatherCurrentInfo(cityName, forecastData);

    //from response, cherry pick relevant data for forecast
    const forecastInfo = gatherForecastInfo(forecastData);

    //from response, extract country code for flag
    getCountryFlagUrl(weatherData.sys.country);

    //empty weather container
    $("#weather-container").empty();

    //render current weather data (weather title and current weather divs)
    renderCurrentData(currentInfo);
    //render forecast data (forecast container)
    renderForecastData(forecastInfo);
    return true;
  } catch (error) {
    return false;
  }
  //add true/false return for use in not adding it to the search list if false
};

//Function to add search city to the search history list
const addCityToSearchList = (value) => {
  //get search list from local storage

  const searchCitiesFromLS = getFromLS("searchCities");

  if (searchCitiesFromLS) {
    //if name is not already in array, push it in array and set to local storage
    if (searchCitiesFromLS.indexOf(value) == -1) {
      searchCitiesFromLS.push(value);
      writeToLS("searchCities", searchCitiesFromLS);
      //empty search list container
      const containerId = "search-history";
      removeContainer(containerId);
      //render search list
      renderSearchList(searchCitiesFromLS);
    }
  }
  //set up new array, push value in array and set into local storage
  else {
    const newSearchCities = [];
    newSearchCities.push(value);
    writeToLS("searchCities", newSearchCities);
    //empty search list container
    const containerId = "search-history";
    removeContainer(containerId);
    //render search list
    renderSearchList(newSearchCities);
  }
};

//Functions to handle submission of an empty input field and flag it to the user
const handleInputChange = () => {
  const target = $("#input-field");
  if (target.hasClass("is-invalid")) {
    target.removeClass("is-invalid");
    $("#invalid-input").addClass("invisible");
  }
};

const highlightInputField = () => {
  $("#invalid-input").removeClass("invisible");
  $("#input-field").addClass("is-invalid");
  $("#input-field").keyup(handleInputChange);
};

//Functions to handle the different clicks on the page
const handleFormClick = async (event) => {
  event.stopPropagation();
  event.preventDefault();
  const inputField = $("#input-field");
  //check input from input field
  const input = inputField.val().toLowerCase().trim();
  const validInput = /^[A-Za-z\s]*$/.test(input);
  //if empty or invalid, change class/render alert message
  if (!validInput) {
    highlightInputField(event);
    renderWeatherAlert();
  } else {
    const result = await renderWeatherData(input);
    //add city name to search list only iof rendering went well
    if (result) {
      addCityToSearchList(input);
    } else {
      highlightInputField(event);
      renderWeatherAlert();
    }
  }
  inputField.val("");
};

const handleCityClick = (value) => {
  $("#invalid-input").addClass("invisible");
  $("#input-field").removeClass("is-invalid");
  //render Weather data
  renderWeatherData(value);
};

const handleClearClick = () => {
  //if click from clear button, clear LS + empty search list + render search list
  clearLS();
  //empty search list container
  const containerId = "search-history";
  removeContainer(containerId);
  //render search list
  renderSearchList();
};

const handleClick = (event) => {
  event.stopPropagation();
  const target = $(event.target);
  const targetId = $(event.target).attr("id");

  //if click from a button then check which button
  if (target.is("button")) {
    //if button from search list, then go to handleClearClick
    handleClearClick();
  }
  //if click from cities list, then go to handleCityClick
  else if (target.is("li")) {
    handleCityClick(targetId);
  }
};

//Function to render the search history list
const renderSearchList = (search) => {
  //if local storage is empty, then render alert message
  if (!search) {
    $("#search-container").append(searchAlertMessage);
  }
  //else render list items
  else {
    $("#search-container").append(searchHistoryBase);
    search.forEach(renderListItem);
    $("#search-history").append(clearBtn);
  }
  //add event listener to search container
  $("#search-history").click(handleClick);
};

//Function to render the search form on load of page
const renderSearchForm = () => {
  $("#search-container").append(searchFormBase);
  $("#search-form").submit(handleFormClick);
};

//Async function - Function to render the weather container
const renderWeatherAlert = async () => {
  $("#weather-container").empty();
  $("#weather-container").append(weatherAlertMessage);
};

//Async function - Function to gather and render the user's current location's data in the weather container
const renderUserLocationData = async (userLocation) => {
  try {
    //extract lon and lat from user ip info
    const coordinates = getCoordinates(userLocation);
    const cityName = userLocation.name;

    //call api and wait for response (await)
    const forecastData = await getForecastFromApi(coordinates);

    //from response, cherry pick relevant data for current weather
    const currentInfo = gatherCurrentInfo(cityName, forecastData);

    //from response, cherry pick relevant data for forecast
    const forecastInfo = gatherForecastInfo(forecastData);

    //from response, extract country code for flag
    getCountryFlagUrl(userLocation.country);

    //empty weather container
    $("#weather-container").empty();

    //render current weather data (weather title and current weather divs)
    renderCurrentData(currentInfo);
    //render forecast data (forecast container)
    renderForecastData(forecastInfo);

    return true;
  } catch (error) {
    return false;
  }
};

//Async function - Function to get the user's current location from their IP address and extract lat and lon info
const getUserLocation = async () => {
  const ipAddress = await (
    await fetch("https://geolocation-db.com/json/")
  ).json();
  const userLocation = {
    name: ipAddress.city,
    country: ipAddress.country_code,
    coord: {
      lat: ipAddress.latitude,
      lon: ipAddress.longitude,
    },
  };
  return userLocation;
};

//Async Main function - on load of page
const onReady = async () => {
  //check local storage
  const existingLS = getFromLS("searchCities");

  //render search form
  renderSearchForm();
  //render recent search container
  renderSearchList(existingLS);

  //get ip address info for user location
  const userLocation = await getUserLocation();
  //render weather container based on user current location
  await renderUserLocationData(userLocation);
};

//On page load
$("document").ready(onReady);
