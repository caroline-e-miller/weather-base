
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
var currentUV = document.getElementById("current-uv");
var latitude = null;
var longitude = null;
var city = "";
var cities = [];
const dayRange = "&cnt=5&units=imperial&appid=2cef2d7cae052715188e701df4ab1db7";
const fahrenheit = "&units=imperial&appid=2cef2d7cae052715188e701df4ab1db7";
const lonComponent = "&lon="
const uvAPI = "&appid2cef2d7cae052715188e701df4ab1db7"
var uvURL = "https://api.openweathermap.org/data/2.5/weather?lat=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/?q="
// var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/daily?q=";
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

// var forecastUvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=2cef2d7cae052715188e701df4ab1db7"



function getCurrentWeather() {
    fetch(currentWeatherURL + city + fahrenheit)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            currentCity.textContent = data.name;
            currentTemp.textContent = data.main.temp + "°";
            currentHumidity.textContent = data.main.humidity + "%";
            currentWindSpeed.textContent = data.wind.speed + "mph";
            console.log(data);
            getUVIndex(data.coord.lat, data.coord.lon);
            // get5DayForecast()
        })
}

function get5DayForecast() {
    // var forecastUvURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=hourly,minutely&appid=2cef2d7cae052715188e701df4ab1db7"
    fetch(forecastURL + city + dayRange)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            console.log(data);
            //render 5 day forecast
            for (var i = 0; i < 6; i++) {
                var forecastArea = document.getElementById("forecast")
                var futureDays = document.createElement("div");
                var futureTemp = document.createElement("p");
                var futureHumidity = document.createElement("p");
                futureDays.setAttribute("class", "col card");
                futureTemp.textContent = "Temperature: " + data.list[i].main.temp + "°";
                futureHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";
                futureDays.appendChild(futureTemp);
                futureDays.appendChild(futureHumidity);
                forecastArea.appendChild(futureDays);
            }

        })
}

// put this inside the getCurrentWeather function?
function getUVIndex(lat, lon) {
    var uvURL = "http://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=2cef2d7cae052715188e701df4ab1db7";
    fetch(uvURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            currentUV.textContent = data[0].value;
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
    get5DayForecast();
    if (!cities.includes(city)) {
        saveCity()
    }
})

loadSavedCities()


// search.addEventListener('click', getApi);