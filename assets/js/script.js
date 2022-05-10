//Global variables

const appid = "e5cd5aafaf451f96b10b7a70a90ea75b";
const currentWeatherBaseUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=imperial";
const forecastBaseUrl =
  "https://api.openweathermap.org/data/2.5/onecall?units=imperial&exclude=minutely,hourly";
const flagBaseUrl = `https://countryflagsapi.com/png/`;
let flagUrl = "";
let searchList = [];
let letterInput = true;
//temporary variables and arrays used during development
const tempSearchList = ["london", "madrid", "new york", "paris"];

const searchAlertMessage = `<form class="search-form d-flex flex-column" id="search-form">
<label class="input-label h2" for="input">Search for a city</label>
<input
  class="search-input"
  type="text"
  name="inputField"
  id="input-field"
  placeholder="Enter a city"
  aria-label="Enter a city"
/>
<p class="invalid-input-message w-100 mt-2 mb-2 text-center invisible" id="invalid-input">
Please enter a valid city name.
</p>
<button
  class="btn btn-info mt-2 mb-2 search-btn"
  id="search-btn"
  type="button"
>
  Search
</button>
</form>
<div class="search-history mt-3" id="search-history">
<h2>Recent searches</h2>
<div class="alert-message w-100 mt-2 mb-2 text-center">
No previous searches.
</div>
</div>`;

const searchContainerBase = `<form class="search-form d-flex flex-column" id="search-form">
<label class="input-label h2" for="input">Search for a city</label>
<input
  class="search-input"
  type="text"
  name="inputField"
  id="input-field"
  placeholder="Enter a city"
  aria-label="Enter a city"
/>
<p class="invalid-input-message w-100 mt-2 mb-2 text-center invisible" id="invalid-input">
Please enter a valid city name.
</p>
<button
  class="btn btn-info mt-2 mb-2 search-btn"
  id="search-btn"
  type="button"
>
  Search
</button>
</form>
<div class="search-history mt-3" id="search-history">
<h2>Recent searches</h2>
<ul class="search-list p-0" id="search-list">
</ul>
</div>`;

const clearBtn = `<button
class="btn btn-warning w-100 mt-2 mb-2 clear-btn"
id="clear-btn" type="button"
>
Clear searches
</button>`;

const weatherAlertMessage = `<div class="alert-message w-100 mt-2 mb-2 text-center">
No previous searches.
</div>`;

const invalidInputMessage = `<div class="alert-message w-100 mt-2 mb-2 text-center" id="invalid-input">
Please enter a valid city name.
</div>`;

let currentWeatherFromApi;
let forecastWeatherFromApi;

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
  $(`#${containerId}`).off("click");
};

const toCelsius = (fahrenheit) => {
  return (((fahrenheit - 32) * 5) / 9).toFixed(3);
};
//END UTILITY FUNCTIONS

//Async Function - call api to fetch current weather data (with city name from input field)
const getCurrentWeatherFromApi = async (cityName) => {
  debugger;
  //build url
  const fullUrl = `${currentWeatherBaseUrl}&q=${cityName}&appid=${appid}`;
  console.log(fullUrl);
  //call api and wait for response
  try {
    const response = await fetch(fullUrl);
    console.log(response);
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
  debugger;
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
    date: moment.unix(data.current.dt).format("DD/MM/YYYY"),
    weatherCondition: data.current.weather[0].main,
    weatherIcon: data.current.weather[0].icon,
    temperature: toCelsius(data.current.temp),
    humidity: data.current.humidity,
    windSpeed: data.current.wind_speed,
    uvi: data.current.uvi,
  };
  return currentInfo;
};

const gatherForecastInfo = (forecastData) => {
  const forecast = [];
  for (let i = 1; i < 6; i += 1) {
    const forecastItem = {
      date: moment.unix(forecastData.daily[i].dt).format("DD/MM/YYYY"),
      weatherCondition: forecastData.daily[i].weather[0].main,
      weatherIcon: forecastData.daily[i].weather[0].icon,
      temperature: toCelsius(forecastData.daily[i].temp.day),
      humidity: forecastData.daily[i].humidity,
      windSpeed: forecastData.daily[i].wind_speed,
      uvi: forecastData.daily[i].uvi,
    };
    forecast.push(forecastItem);
  }
  return forecast;
};

const getCountryFlag = (countryCode) => {
  //pass country code to build url
  flagUrl = `${flagBaseUrl}${countryCode}`;
};

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
    getCountryFlag(weatherData.sys.country);

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

const addCityToSearchList = (value) => {
  //get search list from local storage

  const listCitiesFromLS = getFromLS("listCities");

  if (listCitiesFromLS) {
    //if name is not already in array, push it in array and set to local storage
    if (listCitiesFromLS.indexOf(value) == -1) {
      listCitiesFromLS.push(value);
      writeToLS("listCities", listCitiesFromLS);
      //empty search list container
      const containerId = "search-container";
      emptyContainer(containerId);
      //render search list
      renderSearchList();
    } else {
      console.log("City is already in saved list");
    }
  }
  //set up new array, push value in array and set into local storage
  else {
    const newListCities = [];
    newListCities.push(value);
    writeToLS("listCities", newListCities);
  }
};

const handleInputChange = () => {
  const target = $(event.target);
  if (target.hasClass("is-invalid")) {
    target.removeClass("is-invalid");
    $("#invalid-input").addClass("invisible");
  }
};

const handleFormClick = async () => {
  //check input from input field
  const input = $("#input-field").val().toLowerCase();
  console.log(input);
  //if empty or invalid, change class/render alert message
  if (!input || !/^[A-Za-z\s]*$/.test(input)) {
    alert("Please enter a city");
    $("#invalid-input").removeClass("invisible");
    $("#input-field").addClass("is-invalid");
    $("#input-field").keyup(handleInputChange);
  } else {
    const result = await renderWeatherData(input);
    //add city name to search list only iof rendering went well
    if (result) {
      addCityToSearchList(input);
    }
  }
};
const handleCityClick = (value) => {
  //if click if from city in saved list
  console.log("handling city click");
  //render Weather data
  renderWeatherData(value);
};

const handleClearClick = () => {
  //if click from clear button, clear LS + empty search list + render search list
  console.log("handling clear click");
  clearLS();
  //empty search list container
  const containerId = "search-container";
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
      handleFormClick();
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

const renderSearchList = (search) => {
  //if local storage is empty, then render alert message
  if (!search) {
    $("#search-container").append(searchAlertMessage);
  }
  //else render list items
  else {
    $("#search-container").append(searchContainerBase);
    search.forEach(renderListItem);
    $("#search-history").append(clearBtn);
  }
  //add event listener to search container
  $("#search-container").click(handleClick);
};

const renderWeatherContainer = async (search) => {
  //if local storage is empty, then render alert message
  if (!search) {
    $("#weather-container").append(weatherAlertMessage);
  }
  //else extract last city in array
  else {
    const last = search[search.length - 1];
    //render weather data for last city in list
    await renderWeatherData(last);
  }
};

//Main function
const onReady = async () => {
  //check local storage
  const existingLS = getFromLS("listCities");
  //render recent search container
  renderSearchList(existingLS);
  //render weather container (add function call to test rendering)
  await renderWeatherContainer(existingLS);
};

//On page load
$("document").ready(onReady);
