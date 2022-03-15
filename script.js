// import { FetchWrapper } from "./fetch-wrapper.js";

const foodDetails = document.querySelector("#food");
const totalCalories = document.querySelector("#total");
const foodList = document.querySelector("#foodsList");
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
  const calories = carbsValue * 4 + proteinValue * 4 + fatValue * 9;

  addFoodToList(foodNameString, carbsValue, proteinValue, fatValue);
};

const addFoodToList = (foodNameString, carbsValue, proteinValue, fatValue) => {
  let element = `<div class="foodListItem">
    <div>
      <h3>${foodNameString}</h2>
    </div>
    <div>
      <p>Carbs: <span id="foodCarbs">${carbsValue}</span>g</p>
    </div>
    <div>
      <p>Protein: <span id="foodProtein">${proteinValue}</span>g</p>
    </div>
    <div>
      <p>Fat: <span id="foodFat">${fatValue}</span>g</p>
    </div>`;
  foodList.insertAdjacentHTML("beforeend", element);
};

foodDetails.addEventListener("submit", addFood);
