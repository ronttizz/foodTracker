import { FetchWrapper } from "./fetch-wrapper.js";
import snackbar from "snackbar";
import "snackbar/dist/snackbar.min.css";
import Chart from "chart.js/auto";

const foodDetails = document.querySelector("#food");
let totalCalories = document.querySelector("#totalCalories");
const foodList = document.querySelector("#foodsList");
const foodName = document.querySelector("#foodName");
const carbs = document.querySelector("#carbs");
const protein = document.querySelector("#protein");
const fat = document.querySelector("#fat");
const FoodAPI = new FetchWrapper(
  "https://firestore.googleapis.com/v1/projects/programmingjs-90a13/databases/(default)/documents/"
);
const clear = document.querySelector("#clear");
const chartCanvas = document.querySelector("#chart");
let chart;
const macroArray = [0, 0, 0];
const labels = ["Carbs", "Protein", "Fats"];

const addFood = (e) => {
  e.preventDefault();
  const foodNameString = foodName.value;
  const carbsValue = carbs.value;
  const proteinValue = protein.value;
  const fatValue = fat.value;
  const calories = carbsValue * 4 + proteinValue * 4 + fatValue * 9;

  if (foodNameString !== "Please select" && carbsValue && proteinValue && fatValue) {
    const body = {
      fields: {
        foodName: {
          stringValue: foodNameString,
        },
        carbs: {
          integerValue: carbsValue,
        },
        protein: {
          integerValue: proteinValue,
        },
        fat: {
          integerValue: fatValue,
        },
        calories: {
          integerValue: calories,
        },
      },
    };
    addFoodToList(foodNameString, carbsValue, proteinValue, fatValue, calories);
    updateChart(carbsValue, proteinValue, fatValue);
    snackbar.show(`${foodNameString} added to database.`);
    totalCalories.textContent = Number(totalCalories.textContent) + Number(calories);
    FoodAPI.post("toni112", body);
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  } else {
    snackbar.show("Please check your input");
  }
};

const clearAPI = () => {
  FoodAPI.get("toni112").then((data) => {
    for (let index in data.documents) {
      FoodAPI.delete(`toni112/${data.documents[index].name.slice(67)}`);
    }
  });
  snackbar.show("Database cleared!");
  foodList.innerHTML = "";
  totalCalories.textContent = 0;
  macroArray[0] = 0;
  macroArray[1] = 0;
  macroArray[2] = 0;
  chart.destroy();
};

const updateFoodsList = () => {
  FoodAPI.get("toni112").then((data) => {
    for (let i = 0; i < data?.documents?.length; i++) {
      const fats = data.documents[i].fields.fat.integerValue;
      const carbs = data.documents[i].fields.carbs.integerValue;
      const name = data.documents[i].fields.foodName.stringValue;
      const protein = data.documents[i].fields.protein.integerValue;
      const calories = data.documents[i].fields.calories.integerValue;
      addFoodToList(name, carbs, protein, fats, calories);
      updateChart(carbs, protein, fats);
      totalCalories.textContent = Number(totalCalories.textContent) + Number(calories);
    }
  });
};

const updateChart = (carbs, proteins, fats) => {
  macroArray[0] = macroArray[0] + Number(carbs);
  macroArray[1] = macroArray[1] + Number(proteins);
  macroArray[2] = macroArray[2] + Number(fats);
  const data = {
    labels: labels,
    datasets: [
      {
        label: "grams",
        backgroundColor: "rgb(61, 85, 12)",
        borderColor: "rgb(255, 99, 132)",
        data: macroArray,
      },
    ],
  };

  const config = {
    type: "bar",
    data: data,
    options: {},
  };
  if (chart) {
    chart.destroy();
  }
  chart = new Chart(chartCanvas, config);
  return chart;
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

updateFoodsList();
clear.addEventListener("click", clearAPI);
foodDetails.addEventListener("submit", addFood);
