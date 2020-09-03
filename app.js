//Days of the week
const days = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
let today = 0;

//Kelvin
const kelvin = 273;

//API KEY
const key = "ecddf095c70c6d2e555941c22085a6be";

//WEATHER OBJECT
const weather = {};
weather.temperature ={
    unit:"celsius"
};

// SELECT ELEMENTS
  //1st day
const dayElement1 = document.querySelector(".today");
const iconElement1 = document.querySelector(".weather-icon1");
const tempElement1 = document.querySelector(".temperature-value1 p");
const descElement1 = document.querySelector(".temperature-description1 p");
  //2nd day
const dayElement2 = document.querySelector(".day2");
const iconElement2 = document.querySelector(".weather-icon2");
const tempElement2 = document.querySelector(".temperature-value2 p");
const descElement2 = document.querySelector(".temperature-description2 p");
  //3rd day
const dayElement3 = document.querySelector(".day3");
const iconElement3 = document.querySelector(".weather-icon3");
const tempElement3 = document.querySelector(".temperature-value3 p");
const descElement3 = document.querySelector(".temperature-description3 p");
  //4th day
const dayElement4 = document.querySelector(".day4");
const iconElement4 = document.querySelector(".weather-icon4");
const tempElement4 = document.querySelector(".temperature-value4 p");
const descElement4 = document.querySelector(".temperature-description4 p");
  //5th day
const dayElement5 = document.querySelector(".day5");
const iconElement5 = document.querySelector(".weather-icon5");
const tempElement5 = document.querySelector(".temperature-value5 p");
const descElement5 = document.querySelector(".temperature-description5 p");
  //6th day
const dayElement6 = document.querySelector(".day6");
const iconElement6 = document.querySelector(".weather-icon6");
const tempElement6 = document.querySelector(".temperature-value6 p");
const descElement6 = document.querySelector(".temperature-description6 p");
  //7th day
const dayElement7 = document.querySelector(".day7");
const iconElement7 = document.querySelector(".weather-icon7");
const tempElement7 = document.querySelector(".temperature-value7 p");
const descElement7 = document.querySelector(".temperature-description7 p");
  //Location and notification
const notificationElement = document.querySelector(".notification");
const locationElement = document.querySelector(".location p");

//FIND DAY
function getToday(){
  today = new Date().getDay();
  return today;
}

//GEOLOCATION
  //Asking user for their geolocation
if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setPosition, showError);
  } else { 
    notificationElement.style.display = "block";
    notificationElement.innerHTML = "<p>Geolocation is not supported or is blocked by this browser</p>";
  }

  //Set lat and long taken from geolocation to callAPI with getWeather
function setPosition(position){
    let latitude = position.coords.latitude;
    let longitude = position.coords.longitude;
    getWeather(latitude,longitude)
  }
  //Show error if there is an error
function showError(error){
  notificationElement.style.display = "block";
  notificationElement.innerHTML = `<p>${error.message}</p>`
}

//CALL API (https://openweathermap.org/current)
function getWeather(latitude,longitude){
let api = `http://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&appid=${key}`;
  fetch(api).then(function(response){
      let data = response.json();
      return data;}).then(function(data){
  //Current weather
    weather.country = data.timezone;
    weather.temperature.value1 = Math.floor(data.current.temp - kelvin);
    weather.description1 = data.current.weather[0].description;
    weather.iconId1 = data.current.weather[0].icon;

  //fix for 7day api
      //2nd day
       weather.temperature.value2 = Math.floor(data.daily[1].temp.night - kelvin);
       weather.description2 = data.daily[1].weather[0].description;
       weather.iconId2 = data.daily[1].weather[0].icon;
     //3nd day
       weather.temperature.value3 = Math.floor(data.daily[2].temp.night - kelvin);
       weather.description3 = data.daily[2].weather[0].description;
       weather.iconId3 = data.daily[2].weather[0].icon;
     //4nd day
       weather.temperature.value4 = Math.floor(data.daily[3].temp.night - kelvin);
       weather.description4 = data.daily[3].weather[0].description;
       weather.iconId4 = data.daily[3].weather[0].icon;
    //5nd day
      weather.temperature.value5 = Math.floor(data.daily[4].temp.night - kelvin);
      weather.description5 = data.daily[4].weather[0].description;
      weather.iconId5 = data.daily[4].weather[0].icon;
    //6nd day
      weather.temperature.value6 = Math.floor(data.daily[5].temp.night - kelvin);
      weather.description6 = data.daily[5].weather[0].description;
      weather.iconId6 = data.daily[5].weather[0].icon;
    //7nd day
      weather.temperature.value7 = Math.floor(data.daily[6].temp.night - kelvin);
      weather.description7 = data.daily[6].weather[0].description;
      weather.iconId7 = data.daily[6].weather[0].icon;

  }).then(function(){
    displayWeather();
  });
};
function displayWeather(){
  locationElement.innerHTML = `<p>Location: ${weather.country}</p>`;

//TEST 1

// var iconElements = [iconElement1,iconElement2,iconElement3,iconElement4,iconElement5,iconElement6,iconElement7];
// var tempElements = [tempElement1,tempElement2,tempElement3,tempElement4,tempElement5,tempElement6,tempElement7];
// var descElements = [descElement1,descElement2,descElement3,descElement4,descElement5,descElement6,descElement7];

// for(var i=0;i<7;i++){
//   iconElements[i].innerHTML = `<img src="icons/${weather.iconId1}.png">`;
//   tempElements[i].innerHTML = `${weather.temperature.value1}°<span>C</span>`;
//   descElements[i].innerHTML = weather.description1;
// }
//1st day
  iconElement1.innerHTML = `<img src="icons/${weather.iconId1}.png">`;
  tempElement1.innerHTML = `${weather.temperature.value1}°<span>C</span>`;
  descElement1.innerHTML = weather.description1;
//2nd day
  iconElement2.innerHTML = `<img src="icons/${weather.iconId2}.png">`;
  tempElement2.innerHTML = `${weather.temperature.value2}°<span>C</span>`;
  descElement2.innerHTML = weather.description2;
//3rd day
  iconElement3.innerHTML = `<img src="icons/${weather.iconId3}.png">`;
  tempElement3.innerHTML = `${weather.temperature.value3}°<span>C</span>`;
  descElement3.innerHTML = weather.description3;
//4th day
  iconElement4.innerHTML = `<img src="icons/${weather.iconId4}.png">`;
  tempElement4.innerHTML = `${weather.temperature.value4}°<span>C</span>`;
  descElement4.innerHTML = weather.description4;
//5th day
  iconElement5.innerHTML = `<img src="icons/${weather.iconId5}.png">`;
  tempElement5.innerHTML = `${weather.temperature.value5}°<span>C</span>`;
  descElement5.innerHTML = weather.description5;
//6th day
  iconElement6.innerHTML = `<img src="icons/${weather.iconId6}.png">`;
  tempElement6.innerHTML = `${weather.temperature.value6}°<span>C</span>`;
  descElement6.innerHTML = weather.description6;  
//7th day
  iconElement7.innerHTML = `<img src="icons/${weather.iconId7}.png">`;
  tempElement7.innerHTML = `${weather.temperature.value7}°<span>C</span>`;
  descElement7.innerHTML = weather.description7; 

//Get days
  getToday();
  var dayElement = [dayElement2,dayElement3,dayElement4,dayElement5,dayElement6,dayElement7];
  dayElement1.innerHTML = days[today-1];
  for (var i = 0; i<6; i++){
    dayElement[i].innerHTML = days[today+i];
  }
};

console.log("test");