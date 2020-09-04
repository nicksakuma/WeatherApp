//Days of the week
const daysOfTheWeek = 7;
const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
let country = "";
const kelvin = 273;

//API KEY
const key = "ecddf095c70c6d2e555941c22085a6be";

// SELECT ELEMENTS
var day1 = {
  day: document.querySelector(".day1"),
  temperature: document.querySelector(".temperature-value1 p"),
  icon: document.querySelector(".weather-icon1"),
  description: document.querySelector(".temperature-description1 p")
};

var day2 = {
  day: document.querySelector(".day2"),
  temperature: document.querySelector(".temperature-value2 p"),
  icon: document.querySelector(".weather-icon2"),
  description: document.querySelector(".temperature-description2 p")
};

var day3 = {
  day: document.querySelector(".day3"),
  temperature: document.querySelector(".temperature-value3 p"),
  icon: document.querySelector(".weather-icon3"),
  description: document.querySelector(".temperature-description3 p")
};

var day4 = {
  day: document.querySelector(".day4"),
  temperature: document.querySelector(".temperature-value4 p"),
  icon: document.querySelector(".weather-icon4"),
  description: document.querySelector(".temperature-description4 p")
};

var day5 = {
  day: document.querySelector(".day5"),
  temperature: document.querySelector(".temperature-value5 p"),
  icon: document.querySelector(".weather-icon5"),
  description: document.querySelector(".temperature-description5 p")
};

var day6 = {
  day: document.querySelector(".day6"),
  temperature: document.querySelector(".temperature-value6 p"),
  icon: document.querySelector(".weather-icon6"),
  description: document.querySelector(".temperature-description6 p")
};

var day7 = {
  day: document.querySelector(".day7"),
  temperature: document.querySelector(".temperature-value7 p"),
  icon: document.querySelector(".weather-icon7"),
  description: document.querySelector(".temperature-description7 p")
};

var weekdays = [day1, day2, day3, day4, day5, day6, day7];

//Location and notification
const notificationElement = document.querySelector(".notification");
const locationElement = document.querySelector(".location p");

//GEOLOCATION
//Asking user for their geolocation
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(setPosition, showError);
} else {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = "<p>Geolocation is not supported or is blocked by this browser</p>";
}

//Set lat and long taken from geolocation to callAPI with getWeather
function setPosition(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  getWeather(latitude, longitude)
}
//Show error if there is an error
function showError(error) {
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

//CALL API (https://openweathermap.org/current)
function getWeather(latitude, longitude) {
  let api = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api).then(function (response) {
    let data = response.json();
    return data;
  }).then(function (data) {
    //fix for 7day api
    country = data.timezone;
    for (var i = 0; i < daysOfTheWeek; i++) {
      var temperature = Math.floor(data.daily[i].temp.night - kelvin);
      var description = data.daily[i].weather[0].description;
      var icon = data.daily[i].weather[0].icon;
      weekdays[i].data = dayData = {
        temperature: temperature,
        description: description,
        icon: icon
      };
    }
  }).then(function () {
    displayWeather();
  });
};

function displayWeather() {
  locationElement.innerHTML = `<p>Location: ${country}</p>`;
  var today = getToday() - 1;
  for (var i = 0; i < daysOfTheWeek; i++) {
    var day = weekdays[i];
    day.temperature.innerHTML = `${day.data.temperature}°<span>C</span>`;
    day.description.innerHTML = day.data.description;
    day.icon.innerHTML = `<img src="icons/${day.data.icon}.png">`;

    if (i === 0) {
      day.day.innerHTML = `<p>Current day: ${getWeekday(today,i)}</p>`;
    } else {
      day.day.innerHTML = `<p>${getWeekday(today,i)}</p>`
    };
  };
};

//FIND DAY
function getToday() {
  today = new Date().getDay();
  return today;
};

function getWeekday(today, i) {
  var daysIndex = today + i;
  return days[daysIndex%daysOfTheWeek]
};