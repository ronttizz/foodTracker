// import { FetchWrapper } from "./fetch-wrapper.js";

const foodDetails = document.querySelector("#food");
const totalCalories = document.querySelector("#total");
const foodName = document.querySelector("#foodName");
const carbs = document.querySelector("#carbs");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");

const clear = document.querySelector("#clear");

const addFood = (e) => {
  e.preventDefault();
  const foodNameString = foodName.value;
  const carbsValue = carbs.value;
  const proteinValue = protein.value;
  const fatValue = fat.value;
};

foodDetails.addEventListener("submit", addFood);
