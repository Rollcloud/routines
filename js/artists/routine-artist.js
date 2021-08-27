"use strict";

import { addCustomListener } from "../utils.js";
import { deleteElementInList, moveUpIndexInList } from "./base-artist.js";
import { renderHabitListItems } from "./habits-artist.js";

// Components
const routineName = document.getElementById("routine-name");
const routineHabitsList = document.getElementById("routine-habits");

function renderRoutine(detail) {
  routineName.textContent = detail.routine.name;
  renderHabitListItems(detail.routine.habits, routineHabitsList);
}

function moveUpHabitInRoutine(detail) {
  moveUpIndexInList(detail.habitIdx, routineHabitsList);
}

function removeHabitFromRoutine(detail) {
  const habitElement = routineHabitsList.children[detail.habitIdx];
  deleteElementInList(habitElement);
}

addCustomListener("routineRetrieved", renderRoutine);
addCustomListener("habitAddedToRoutine", renderRoutine);
addCustomListener("habitMovedUpInRoutine", moveUpHabitInRoutine);
addCustomListener("habitRemovedFromRoutine", removeHabitFromRoutine);
