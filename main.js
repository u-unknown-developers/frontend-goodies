"use strict";
import "./assets/css/style.css";
import "./assets/css/queries.css";
import data from "./data/data.json";

const { goodies, topics, stacks } = data;

const goodiesContainer = document.querySelector(".cards-container ul");
const searchInput = document.querySelector("#search");
const topicSelect = document.querySelector("#topic");
const stackSelect = document.querySelector("#stack");
const navModeMoonIcon = document.querySelector(".dark");
const navModeSunIcon = document.querySelector(".light");
const navModeBtn = document.querySelector(".nav-mode");

window.addEventListener("DOMContentLoaded", displayGoodies);
window.addEventListener("DOMContentLoaded", addTopics);
window.addEventListener("DOMContentLoaded", addStacks);
window.addEventListener("DOMContentLoaded", setCurrentTheme);

searchInput.addEventListener("input", handleSearch);
topicSelect.addEventListener("change", handleTopicSelect);
stackSelect.addEventListener("change", handleStackSelect);
navModeBtn.addEventListener("click", toggleTheme);
navModeSunIcon.addEventListener("click", toggleTheme);

function displayGoodies() {
  goodiesContainer.innerHTML = goodies
    .map((item) => {
      return `
      <li class="card">
        <a href="${item.link}" target="_blank" rel="noopener noreferrer">
          <div class="card-img">
            <img src="${item.img}" alt="${item.title} thumbnail" width="300px" loading="lazy">
          </div>
          <div class="card-data">
            <h2 class="card-title">${item.title}</h2>
            <p class="card-description">${item.description}</p>
          </div>
        </a>
      </li>
      `;
    })
    .join("");
}

// creates option in specific select element
function createOption(value, parentSelect) {
  const option = document.createElement("option");
  option.value = value;
  option.textContent = value;
  parentSelect.appendChild(option);
}

function addTopics() {
  topics.forEach((topic) => {
    createOption(topic, topicSelect);
  });
}

function addStacks() {
  stacks.forEach((stack) => {
    createOption(stack, stackSelect);
  });
}

function handleSearch() {
  const searchTerm = searchInput.value.trim().toLowerCase();
  const goodiesCards = document.querySelectorAll(".card");
  const goodiesSearchStrings = goodies.map((item) => {
    return [
      item.title,
      item.description,
      item.topic,
      item.stack,
      item.keywords.join(""),
    ]
      .join("")
      .toLowerCase();
  });

  goodiesSearchStrings.forEach((item, index) => {
    if (item.includes(searchTerm)) {
      goodiesCards[index].style.display = "";
    } else {
      goodiesCards[index].style.display = "none";
    }
  });
}

function handleTopicSelect() {
  const goodiesTopic = goodies.map((item) => item.topic);
  const goodiesCards = document.querySelectorAll(".card");
  const topicSelectValue = topicSelect.value.toLowerCase();

  goodiesTopic.forEach((item, index) => {
    if (item === topicSelectValue || topicSelectValue === "all") {
      goodiesCards[index].style.display = "";
    } else {
      goodiesCards[index].style.display = "none";
    }
  });
}

function handleStackSelect() {
  const goodiesStack = goodies.map((item) => item.stack);
  const goodiesCards = document.querySelectorAll(".card");
  const stackSelectValue = stackSelect.value.toLowerCase();

  goodiesStack.forEach((item, index) => {
    if (item === stackSelectValue || stackSelectValue === "all") {
      goodiesCards[index].style.display = "";
    } else {
      goodiesCards[index].style.display = "none";
    }
  });
}

function toggleTheme(e) {
  const iconName = e.target.classList[0];
  document.documentElement.setAttribute("data-theme", iconName);
  localStorage.setItem("theme", iconName);
}

//sets the theme to the local storage theme or default system theme
function setCurrentTheme() {
  const storedTheme =
    localStorage.getItem("theme") ||
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light");

  if (storedTheme === "dark") {
    document.documentElement.setAttribute("data-theme", "dark");
  }
}
