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
const chartCanvas = document.querySelector("chart");
const clear = document.querySelector("#clear");

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
    snackbar.show(`${foodNameString} added to database.`);
    totalCalories.textContent = Number(totalCalories.textContent) + Number(calories);
    FoodAPI.post("toni112", body);
    carbs.value = "";
    protein.value = "";
    fat.value = "";
  }
};

const clearAPI = () => {
  FoodAPI.get("toni112").then((data) => {
    for (let index in data.documents) {
      FoodAPI.delete(`toni112/${data.documents[index].name.slice(67)}`);
    }
  });
  snackbar.show("Data base cleared!");
  foodList.innerHTML = "";
  totalCalories.textContent = 0;
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
      totalCalories.textContent = Number(totalCalories.textContent) + Number(calories);
    }
  });
};

const foodData = [5, 3, 5];

const myChart = new Chart(ctx, {
  type: "bar",
  data: {
    labels: ["Carbs", "Proteins", "Fats"],
    datasets: [
      {
        label: "g",
        data: foodData,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
        ],
        borderWidth: 1,
      },
    ],
  },
  options: {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  },
});

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
