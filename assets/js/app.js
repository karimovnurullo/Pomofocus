const timeDiv = document.querySelector('.main-time');
const startBtn = document.querySelector('.main-buttons-startBtn');
const menuItems = document.querySelectorAll('.main-menu span');
const soundClick = new Audio("./assets/music/clicked.wav");
const soundPassed = new Audio("./assets/music/passed.wav");


let remainingTime = 25 * 60;
let countdownInterval;

const min = Math.floor(remainingTime / 60);
const sec = remainingTime % 60;

timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;

function changeBackground(color) {
  document.body.style.background = color;
  startBtn.style.color = color;
  document.body.style.transition = "all 0.5s";
}

function stopCountdown() {
  timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  pauseCountdown();
}

function activeStartBtn(el, elName, time) {
  if (startBtn.textContent == "PAUSE" && el.classList.contains(`${elName}`)) {
    console.log("Clicked");
    let confirmAlert = confirm("The timer is still running, are you sure you want to switch?");
    if (confirmAlert) {
      startBtn.textContent = "START";
      startBtn.classList.remove("active");
      stopCountdown();
      changeCountdown(elName);
    }
    // else {
    //   startCountdown();
    //   startBtn.classList.add("active");
    //   startBtn.textContent = "PAUSE";
    //   elName.classList.remove("active"); 
    // }
  }
}



function changeCountdown(elementName) {
  if (elementName === "shortBreak") {
    let remainingTime = 5 * 60;
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  } else if (elementName === "longBreak") {
    let remainingTime = 15 * 60;
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  } else if (elementName === "pomodoro") {
    let remainingTime = 25 * 60;
    const min = Math.floor(remainingTime / 60);
    const sec = remainingTime % 60;
    timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
  }
}


menuItems.forEach(element => {
  element.addEventListener('click', () => {
    document.querySelector("span.active").classList.remove("active");
    element.classList.add("active");
    if (element.classList.contains("shortBreak")) {
      remainingTime = 5 * 60;
      changeCountdown("shortBreak");
      changeBackground("#38858A");
      activeStartBtn(element, "shortBreak", remainingTime);
    } else if (element.classList.contains("longBreak")) {
      remainingTime = 15 * 60;
      changeCountdown("longBreak");
      changeBackground("#397097");
      activeStartBtn(element, "longBreak");
    } else if (element.classList.contains("pomodoro")) {
      remainingTime = 25 * 60;
      changeCountdown("pomodoro");
      changeBackground("#C15C5C");
      activeStartBtn(element, "pomodoro");
    }
  })
});

startBtn.addEventListener("click", () => {
  startBtn.classList.toggle("active");
  if (startBtn.classList.contains("active")) {
    startBtn.textContent = "PAUSE";
    startCountdown();
    timeProgress(remainingTime);
    soundClick.play();
  } else {
    startBtn.textContent = "START";
    pauseCountdown();
    soundClick.play();
  }
});


function startCountdown() {
  countdownInterval = setInterval(() => {
    remainingTime--;
    if (remainingTime < 0) {
      clearInterval(countdownInterval);
      startBtn.textContent = "START";
      timeDiv.textContent = `${min}:${sec < 10 ? '0' : ''}${sec}`;
      soundPassed.play();
      setTimeout(() => {
        soundPassed.pause();
      }, 5000);
    } else {
      const minutes = Math.floor(remainingTime / 60);
      const seconds = remainingTime % 60;
      timeDiv.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }
  }, 1000);
}

function pauseCountdown() {
  clearInterval(countdownInterval);
}

// ===================================== Progress BAR ==========================  //


function timeProgress(remainingTime) {
  const countdownProgress = document.querySelector('.nav-prog');

  remainingTime = remainingTime; // in seconds
  const initialTime = remainingTime;
  const intervalTime = 1000; // in milliseconds

  function updateCountdown() {
    const percentage = (remainingTime / initialTime) * 100;
    countdownProgress.style.width = `${percentage}%`;
    remainingTime--;

    if (remainingTime < 0) {
      clearInterval(intervalId);
    }
  }

  let intervalId = setInterval(updateCountdown, intervalTime);
}