const time = document.querySelector(".time");
const dateContainer = document.querySelector(".date");
const greeting = document.querySelector(".greeting");
const name = document.querySelector(".name");
const body = document.body;
const buttonNext = document.querySelector(".slide-next");
const buttonPrev = document.querySelector(".slide-prev");
const weatherIcon = document.querySelector('.weather-icon');
const temperature = document.querySelector('.temperature');
const weatherDescription = document.querySelector('.weather-description');
const city = document.querySelector('.city');

function showTime() {
  const date = new Date();
  const currentTime = date.toLocaleTimeString();
  time.textContent = currentTime;
  setTimeout(showTime, 1000);
}
showTime();

function showDate() {
  const date = new Date();
  const options = {weekday: 'long', month: 'long', day: 'numeric'};
  const currentDate = date.toLocaleDateString('en-US', options);
  dateContainer.textContent = currentDate;
  }
showDate()

function currentTime() {
  let date = new Date();
  let hour = date.getHours();
  if (hour >= 0 && hour < 6) { return "Good night"; }
  if (hour >= 6 && hour < 12) { return "Good morning"; }
  if (hour >= 12 && hour < 18) { return "Good afternoon"; }
  if (hour >= 18 && hour < 24) { return "Good evening"; }
}
const text = currentTime();
greeting.textContent = text;

function setLocalStorage() {
  localStorage.setItem('name', name.value);
}
window.addEventListener('beforeunload', setLocalStorage)

function getLocalStorage() {
  if(localStorage.getItem('name')) {
    name.value = localStorage.getItem('name');
  }
}
window.addEventListener('load', getLocalStorage)

function getRandomNum() {
  let max = 20;
  let min = 1;
  return num =  Math.floor(Math.random() * (max - min + 1)) + min;
}
const randomNum = getRandomNum()

function setBackground() {
  let timeOfDay = text;
  let randomNumber = num;
  let number = `${randomNumber < 10 ? '0' : ''}${randomNumber}`;
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay.slice(5)}/${number}.jpg')`;
}
setBackground()

function getSlidePrev() {
  let timeOfDay = text;
  let randomNumber = getRandomNum();
  randomNumber--;
  const numBackground = `${randomNumber < 10 ? '0' : ''}${randomNumber}`;
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay.slice(5)}/${numBackground}.jpg')`;
}
buttonPrev.addEventListener('click', () => getSlidePrev());

function getSlideNext() {
  let timeOfDay = text;
  let randomNumber = getRandomNum();
  randomNumber++;
  const numBackground = `${randomNumber < 10 ? '0' : ''}${randomNumber}`;
  body.style.backgroundImage = `url('https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay.slice(5)}/${numBackground}.jpg')`;
}
buttonNext.addEventListener('click', () => getSlideNext());



async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=ru&appid=b3b50f00d9a2c5d1c6c0c92622466732&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  
  weatherIcon.className = 'weather-icon owf';
  weatherIcon.classList.add(`owf-${data.weather[0].id}`);
  temperature.textContent = `${data.main.temp.toFixed(0)}°C`;
  weatherDescription.textContent = data.weather[0].description;
}

function setCity(event) {
  if (event.code === 'Enter') {
    return getWeather();
  }
}
document.addEventListener('DOMContentLoaded', getWeather);
city.addEventListener('keypress', setCity);
