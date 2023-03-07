"use strict";
import { timeConvertor } from "./convertor.js";
const timer = document.querySelector(".main-time");
const actionBtns = document.querySelectorAll(".main-menu-item");
const startBtn = document.getElementById("startBtn");
const soundClick = new Audio("./assets/music/clicked.wav");

let time = 1500;
let intervalID;

// ui functions
function handleStart() {
	const isActive = startBtn.classList.contains("active");
	startBtn.classList.toggle("active");
	startBtn.innerText = isActive ? "START" : "PAUSE";
  soundClick.play();

	const value = timeConvertor(time);
	if (isActive) {
		clearInterval(intervalID);
	} else {
		intervalID = setInterval(() => {
			time--;
			timer.innerText = timeConvertor(time);
		}, 1000);
	}
}

function init() {
	startBtn.addEventListener("click", handleStart);

	for (let btn of actionBtns) {
		btn.addEventListener("click", function () {
			const currentTime = +btn.getAttribute("time");
			const isActive = btn.classList.contains("active");

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