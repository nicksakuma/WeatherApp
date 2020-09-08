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
  let api = `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api).then(function (response) {
    let data = response.json();
    return data;
  }).then(function (data) {
    //fix for 7day api
    country = data.timezone;
    for (var i = 0; i < daysOfTheWeek; i++) {
      var temperature = Math.floor(data.daily[i].temp.day - kelvin);
      var lowercaseDescription = data.daily[i].weather[0].description;
      var description =  uppercaseFirst(lowercaseDescription);
      var icon = data.daily[i].weather[0].icon;
      weekdays[i].data = dayData = {
        temperature: temperature,
        description: description,
        icon: getLottieIcon(icon)
      };
    }
  }).then(function () {
    document.getElementById("loading").classList.add("hide");
    displayWeather();
  });
};

function displayWeather() {
  locationElement.innerHTML = `<p>Location: ${country}</p>`;
  var today = getToday() - 1;
  for (var i = 0; i < daysOfTheWeek; i++) {
    var day = weekdays[i];
    day.temperature.innerHTML = `${day.data.temperature}°<span>C</span><br>${day.data.description}`;
    day.icon.innerHTML = `<lottie-player src="${day.data.icon}"  background="transparent"  speed="1"    loop autoplay></lottie-player>`;
    if (i === 0) {
      day.day.innerHTML = `<p>Today</p>`;
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
  return days[daysIndex % daysOfTheWeek]
};


//THIS GUY -> https://lottiefiles.com/user/26177  REMEMBER TO ADD THE LICENCE
function getLottieIcon(iconID) {
  switch (iconID) {
    case "01d":
      return "https://assets8.lottiefiles.com/temp/lf20_Stdaec.json"
      break;
    case "01n":
      return "https://assets8.lottiefiles.com/temp/lf20_y6mY2A.json"
      break;
    case "02d":
      return "https://assets5.lottiefiles.com/temp/lf20_dgjK9i.json"
      break;
    case "02n":
      return "https://assets5.lottiefiles.com/temp/lf20_Jj2Qzq.json"
      break;
    case "03d":
      return "https://assets5.lottiefiles.com/temp/lf20_dgjK9i.json"
      break;
    case "03n":
      return "https://assets5.lottiefiles.com/temp/lf20_Jj2Qzq.json"
      break;
    case "04d":
      return "https://assets5.lottiefiles.com/temp/lf20_VAmWRg.json"
      break;
    case "04n":
      return "https://assets7.lottiefiles.com/temp/lf20_I5XMi9.json"
      break;
    case "09d":
      return "https://assets7.lottiefiles.com/temp/lf20_rpC1Rd.json"
      break;
    case "09n":
      return "https://assets7.lottiefiles.com/temp/lf20_rpC1Rd.json"
      break;
    case "10d":
      return "https://assets7.lottiefiles.com/temp/lf20_rpC1Rd.json"
      break;
    case "10n":
      return "https://assets7.lottiefiles.com/temp/lf20_rpC1Rd.json"
      break;
    case "11d":
      return "https://assets7.lottiefiles.com/temp/lf20_JA7Fsb.json"
      break;
    case "11n":
      return "https://assets7.lottiefiles.com/temp/lf20_XkF78Y.json"
      break;
    case "13d":
      return "https://assets7.lottiefiles.com/temp/lf20_BSVgyt.json"
      break;
    case "13n":
      return "https://assets7.lottiefiles.com/temp/lf20_RHbbn6.json"
      break;
    case "50d":
      return "https://assets7.lottiefiles.com/temp/lf20_HflU56.json"
      break;
    case "50n":
      return "https://assets7.lottiefiles.com/temp/lf20_kOfPKE.json"
      break;
    default:
      return "https://assets7.lottiefiles.com/temp/lf20_VAmWRg.json"
  }
};

//Uppercase first letter
function uppercaseFirst(string) 
{
    return string.charAt(0).toUpperCase() + string.slice(1);
};