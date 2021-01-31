
// look at previous activities for ideas (namely the mini project)
// link up the weather API
// create search mechanism (look at mini project)
// create onclick events for previously searched cities
// link CSS color to UV values
// create local storage for previous search values
// get most recent search value upon refresh of the page

var search = document.getElementById("submit");
var userInput = document.getElementById("input");
var currentWeatherEl = document.querySelector("currentWeather");
var forecastEl = document.querySelector("forecast");
var forecast = "https://api.openweathermap.org/data/2.5/forecast/hourly?q=" + city + "&appid=2cef2d7cae052715188e701df4ab1db7";
var currentWeather = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=2cef2d7cae052715188e701df4ab1db7";
var city;

search.addEventListener("click", function (event) {
    event.preventDefault();
    var city = userInput.textContent;
    console.log(city)
})


function getCurrentWeather() {

    fetch(currentWeather)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            console.log(data);
        })
}
getCurrentWeather();
// search.addEventListener('click', getApi);