
// look at previous activities for ideas (namely the mini project)
// link up the weather API
// create search mechanism (look at mini project)
// create onclick events for previously searched cities
// link CSS color to UV values (look at day planner hw)
// create local storage for previous search values
// get most recent search value upon refresh of the page

var search = document.getElementById("submit");
var userInput = document.getElementById('input');
var currentWeatherEl = document.getElementById("currentWeather");
var forecastEl = document.getElementById("forecast");
var currentCity = document.getElementById("current-city");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humidity");
var currentWindSpeed = document.getElementById("current-wind");
var currentUV = document.getElementById("current-uv")
var city = "";
var cities = [];
const appID = "&units=imperial&appid=2cef2d7cae052715188e701df4ab1db7";
// var city = userInput.textContent;
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast?q=";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";



function getCurrentWeather() {
    fetch(currentWeatherURL + city + appID)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            currentCity.textContent = data.name;
            currentTemp.textContent = data.main.temp;
            currentHumidity.textContent = data.main.humidity;
            currentWindSpeed.textContent = data.wind.speed;
            console.log(data);
            // getUVIndex()
            // get5DayForecast()
        })
}

function get5DayForecast() {
    fetch(forecastURL + city + appID)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            //render 5 day forecast
            console.log(data);

        })
}

function getUVIndex() {
    fetch('' + city + appID)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            currentUV.textContent = 1000
            console.log(data);

        })
}

function loadSavedCities() {

    cities = localStorage.getItem('weather-cities')
    cities = cities ? cities.split(',') : []
    // render city buttons

    // for 1 i < 5 i++
    // add on click that changes city variable to the city specified by button
}

function saveCity() {
    cities.unshift(city);
    localStorage.setItem('weather-cities', cities.join(','))
}

search.addEventListener("click", function (event) {
    event.preventDefault();
    city = userInput.value;
    getCurrentWeather();
    if (!cities.includes(city)) {
        saveCity()
    }
})

loadSavedCities()


// search.addEventListener('click', getApi);