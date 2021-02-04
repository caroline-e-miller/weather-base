
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
// var currentIcon = document.getElementById("weather-icon");
var currentTemp = document.getElementById("current-temp");
var currentHumidity = document.getElementById("current-humidity");
var currentWindSpeed = document.getElementById("current-wind");
var currentUV = document.getElementById("current-uv");
var forecastArea = document.getElementById("forecast")
var latitude = null;
var longitude = null;
var city = "";
var cities = [];
var pastSearchesArea = document.getElementById("pastSearches")
const dayRange = "&cnt=5&units=imperial&appid=2cef2d7cae052715188e701df4ab1db7";
const fahrenheit = "&units=imperial&appid=2cef2d7cae052715188e701df4ab1db7";
const lonComponent = "&lon="
const uvAPI = "&appid2cef2d7cae052715188e701df4ab1db7"
var uvURL = "https://api.openweathermap.org/data/2.5/weather?lat=";
var forecastURL = "https://api.openweathermap.org/data/2.5/forecast/?q="
var currentWeatherURL = "https://api.openweathermap.org/data/2.5/weather?q=";

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

            var currentIcon = document.getElementById("weather-icon");
            var iconData = data.weather[0].icon;
            var iconURL = "http://openweathermap.org/img/w/" + iconData + ".png";
            currentIcon.setAttribute('src', iconURL);
            console.log(data);
            getUVIndex(data.coord.lat, data.coord.lon);
            // get5DayForecast()
        })
}

function get5DayForecast() {
    fetch(forecastURL + city + dayRange)
        .then(function (response) {

            if (response.ok)

                return response.json();
        })
        .then(function (data) {
            forecastArea.innerHTML = "";
            console.log(data);
            //render 5 day forecast
            for (var i = 0; i < 5; i++) {

                var futureDays = document.createElement("div");
                var futureIcon = document.createElement("img");
                var futureTemp = document.createElement("p");
                var futureHumidity = document.createElement("p");

                futureDays.setAttribute("class", "col card");
                futureTemp.textContent = "Temperature: " + data.list[i].main.temp + "°";
                futureHumidity.textContent = "Humidity: " + data.list[i].main.humidity + "%";


                var futureIconData = data.list[0].weather[0].icon;
                var futureIconURL = "http://openweathermap.org/img/w/" + futureIconData + ".png";
                futureIcon.setAttribute('src', futureIconURL);

                futureDays.appendChild(futureIcon);
                futureDays.appendChild(futureTemp);
                futureDays.appendChild(futureHumidity);
                forecastArea.appendChild(futureDays);
            }

        })

}

function getUVIndex(lat, lon) {
    var uvURL = "https://api.openweathermap.org/data/2.5/uvi/forecast?lat=" + lat + "&lon=" + lon + "&appid=2cef2d7cae052715188e701df4ab1db7";
    fetch(uvURL)
        .then(function (response) {
            if (response.ok)
                return response.json();
        })
        .then(function (data) {
            var UVvalue = data[0].value;
            currentUV.textContent = UVvalue;
            console.log(data);
            console.log(data[0].value);
            if (UVvalue <= 2) {
                // set color
                currentUV.classList.add("uv-safe")
                console.log("safe")
            }
            if (UVvalue > 2 & UVvalue <= 5) {
                currentUV.classList.add("uv-medium")
                console.log("medium")
            }
            if (UVvalue > 5 & UVvalue <= 7) {
                currentUV.classList.add("uv-danger")
                console.log("danger")
            }
            if (UVvalue > 7) {
                currentUV.classList.add("uv-go-home")
                console.log("go-home")
            }
        })
}

function loadSavedCities() {

    cities = localStorage.getItem('weather-cities')
    cities = cities ? cities.split(',') : []
    // render city buttons

    for (var i = 0; i < 5; i++) {
        var cityButton = document.createElement('button');
        cityButton.textContent = cities[i];
        pastSearchesArea.appendChild(cityButton);

        cityButton.addEventListener("click", function () {
            city = this.textContent;
            console.log(city);
            // currentWeatherEl.innerHTML = "";
            getCurrentWeather();
            get5DayForecast();
        })
    }
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

function render() {
    var storedCities = localStorage.getItem('weather-cities');
    if (storedCities === null) {
        return;
    }
    var splitCities = storedCities.split(",");
    if (splitCities.length === 0) {
        return;
    }
    city = splitCities[0];
    getCurrentWeather();
    get5DayForecast();

    console.log(city);
}
render();

// search.addEventListener('click', getApi);