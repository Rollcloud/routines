"use strict";

import { addCustomListener } from "../utils.js";
import { renderHabitListItems } from "./habits-artist.js";

// Components
const routineName = document.getElementById("routine-name");
const allHabitsList = document.getElementById("all-habits");
const routineHabitsList = document.getElementById("routine-habits");

function renderRoutine(detail) {
  routineName.textContent = detail.routine.name;
  renderHabitListItems(detail.routine.habits, routineHabitsList);
}

// removeIndexFromList(habitIdx, routineHabitsList);
// moveItemUpInList(habitIdx, routineHabitsList, true);

addCustomListener("routineRetrieved", renderRoutine);
addCustomListener("habitAddedToRoutine", renderRoutine);
