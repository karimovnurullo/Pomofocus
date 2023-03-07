"use strict";
import {
	timeConvertor
} from "./convertor.js";
const timer = document.querySelector(".main-time");
const actionBtns = document.querySelectorAll(".main-menu-item");
const startBtn = document.getElementById("startBtn");
const soundClick = new Audio("./assets/music/clicked.wav");
const soundpassed = new Audio("./assets/music/passed.wav");


let time = 3;
let intervalID;

soundpassed.load();

// ui functions
let defaultTime = timeConvertor(time);

function handleStart() {
	const isActive = startBtn.classList.contains("active");
	startBtn.classList.toggle("active");
	startBtn.innerText = isActive ? "START" : "PAUSE";
	soundClick.play();

	const value = timeConvertor(time);
	if (!isActive) {
		intervalID = setInterval(() => {
			time--;
			timer.innerText = timeConvertor(time);

			if(time === 0){
				soundpassed.play();
				clearInterval(intervalID);					
				timer.innerText = defaultTime;
				startBtn.innerText = "START";
				startBtn.classList.remove("active");
				setTimeout(() => {
					soundpassed.pause();
				}, 5000);
			}
		}, 1000);
	} else {
		clearInterval(intervalID);
	}
}

// function end(a) {
// }
// end()


function backgroundChanger(color) {
	document.body.style.backgroundColor = color;
	startBtn.style.color = color;
	document.body.style.transition = "all 0.2s";
}


function init() {
	startBtn.addEventListener("click", handleStart);

	for (let btn of actionBtns) {
		btn.addEventListener("click", function () {
			const currentTime = +btn.getAttribute("time");
			const isActive = btn.classList.contains("active");
			const clickedBtn = btn.classList;
			if (btn.classList.contains("shortBreak")) {
				backgroundChanger("#38858A");
			} else if (btn.classList.contains("longBreak")) {
				backgroundChanger("#397097");
			}


			if (!isActive) {
				const isYes = startBtn.classList.contains("active") ? confirm(`The timer is still running, are you sure you want to switch?`) : true;
				if (isYes) {
					for (let btn of actionBtns) {
						btn.classList.remove("active");
					}

					clearInterval(intervalID);
					time = currentTime;
					timer.innerText = timeConvertor(time);
					startBtn.classList.remove("active");
					startBtn.innerText = "START";
					btn.classList.add("active");
				}
			}
		});
	}
}

init();