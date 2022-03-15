import { FetchWrapper } from "./fetch-wrapper.js";

const foodDetails = document.querySelector("#food");
const totalCalories = document.querySelector("#total");
const foodList = document.querySelector("#foodsList");
const foodName = document.querySelector("#foodName");
const carbs = document.querySelector("#carbs");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");
const FoodAPI = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);

const clear = document.querySelector("#clear");

const addFood = (e) => {
  e.preventDefault();
  const foodNameString = foodName.value;
  const carbsValue = carbs.value;
  const proteinValue = protein.value;
  const fatValue = fat.value;
  const calories = carbsValue * 4 + proteinValue * 4 + fatValue * 9;

  const body = {
    foodName: foodNameString,
    carbs: carbsValue,
    protein: proteinValue,
    fat: fatValue,
    calories: calories,
  };
  addFoodToList(foodNameString, carbsValue, proteinValue, fatValue, calories);
};

const addFoodToList = (foodNameString, carbsValue, proteinValue, fatValue, calories) => {
  let element = `<div class="foodListItem">
  <div>
    <h3>${foodNameString}</h2>
  </div>
  <div>
    <p class="small">Calories: <span id="calories">${calories}</span>kcal</p>
  </div>
  <div class="macro">
      <div>
      <p>Carbs: <span class="foodCarbs">${carbsValue}</span>g</p>
      </div>
      <div>
      <p>Protein: <span class="foodProtein">${proteinValue}</span>g</p>
      </div>
      <div>
      <p>Fat: <span class="foodFat">${fatValue}</span>g</p>
      </div>
  </div>
</div>`;
  foodList.insertAdjacentHTML("beforeend", element);
};

foodDetails.addEventListener("submit", addFood);
