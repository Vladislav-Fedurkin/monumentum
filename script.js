class Quote {
  index = 0;
  quotes = [
    {
      "text": "Пишите код так, как будто сопровождать его будет склонный к насилию психопат, который знает, где вы живете",
      "author": "Стив Макконнелл"
    },
    {
      "text": "Сложность программы растет до тех пор, пока не превысит способности программиста",
      "author": "Артур Блох. Законы Мэрфи"
    },
      {
      "text": "Lisp — это не язык, а строительный материал.",
      "author": "Alan Kay"
    },
    {
      "text": "Низкоуровневый язык — это когда требуется внимание к вещам, которые никак не связаны с программами на этом языке.",
      "author": "Alan J. Perlis"
    },
    {
      "text": "В хорошем дизайне добавление вещи стоит дешевле, чем сама эта вещь.",
      "author": "Thomas C. Gale"
    },
    {
      "text": "Болтовня ничего не стоит. Покажите мне код.",
      "author": "Linus Torvalds"
    }
  ];
  getQuote(){
    if(this.index > this.quotes.length-1) {
      this.index = 0;
    }
    return this.quotes[this.index++]
  }
}

class Music {
  index = 0;
  playList = [
    {
    'nameMusic': 'Aqua-Caelestis'
    },
    {
      'nameMusic': 'Ennio-Morricone',
    },
    {
      'nameMusic': 'River-Flows-In-You',
    },  
    {
      'nameMusic': 'Summer-Wind'
    }
  ];
  btnNxt(){
    if(this.index > this.playList.length-1) {
      this.index = 0;
    }
    return (this.playList[this.index++])
  }
  btnPrv(){
    this.index--;
    if(this.index < 0) {
      this.index = this.playList.length-1;
    }
    return this.playList[this.index];
  }
}

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
const cityInput = document.querySelector('.city');
const changeQuote = document.querySelector('.change-quote');
const quoteContainer = document.querySelector('.quote');
const authorContainer = document.querySelector('.author');
const playPrevBtn = document.querySelector('.play-prev');
const playMusic = document.querySelector('.play');
const audio = document.querySelector('.audio');
const playNextBtn = document.querySelector('.play-next');
const songs = document.querySelector('.play-list');
cityInput.value = 'Minsk';
const quote = new Quote();
const music = new Music();

function playSong() {
  audio.src = './assets/sounds/Aqua-Caelestis.mp3'
  audio.play();
}

function pauseSong() {
  audio.pause()
}

playMusic.addEventListener('click', () => {
  if(music.isPlaying) {
    playMusic.classList.remove('play');
    playMusic.classList.add('pause');
    playSong()
  } else {
    playMusic.classList.remove('pause');
    playMusic.classList.add('play');
    pauseSong()
  }
  music.isPlaying = !music.isPlaying
});

playNextBtn.addEventListener('click', () => {
  const musicChange = music.btnNxt();
  const nameMusic = musicChange.nameMusic;
  audio.src = `./assets/sounds/${nameMusic}.mp3`;
  audio.play();
});

playPrevBtn.addEventListener('click', () => {
  const musicChange = music.btnPrv();
  const nameMusic = musicChange.nameMusic;
  audio.src = `./assets/sounds/${nameMusic}.mp3`;
  audio.play();
});

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
  let max = 19;
  let min = 1;
  return num =  Math.ceil(Math.random() * (max - min)) + min;
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
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput.value}&lang=ru&appid=b3b50f00d9a2c5d1c6c0c92622466732&units=metric`;
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

document.addEventListener('DOMContentLoaded', () => {
  getWeather()
  const quoteConfig = quote.getQuote();
  quoteContainer.textContent = quoteConfig.text
  authorContainer.textContent = quoteConfig.author
});
cityInput.addEventListener('keypress', (e) => setCity(e));

changeQuote.addEventListener('click', () => {
  const quoteConfig = quote.getQuote();
  quoteContainer.textContent = quoteConfig.text
  authorContainer.textContent = quoteConfig.author
});
