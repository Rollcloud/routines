"use strict";

import { addCustomListener } from "../utils.js";
import { deleteElementInList, moveUpIndexInList } from "./base-artist.js";
import { renderHabitListItems, renderHabitCards } from "./habits-artist.js";

// Components
const routineNames = document.querySelectorAll(".routine-name");
const routineHabitsLists = document.querySelectorAll(".routine-habits");
const routineHabitsCards = document.getElementById("routine-habits-scroller");

function renderRoutine(detail) {
  routineNames.forEach((routineName) => {
    routineName.textContent = `${detail.routine.icon} ${detail.routine.name}`;
  });
  routineHabitsLists.forEach((routineHabitsList) => {
    renderHabitListItems(detail.routine.habits, routineHabitsList);
  });
  if (routineHabitsCards) renderHabitCards(detail.routine.habits, routineHabitsCards);
}

function moveUpHabitInRoutine(detail) {
  routineHabitsLists.forEach((routineHabitsList) => {
    moveUpIndexInList(detail.habitIdx, routineHabitsList);
  });
}

function removeHabitFromRoutine(detail) {
  routineHabitsLists.forEach((routineHabitsList) => {
    const habitElement = routineHabitsList.children[detail.habitIdx];
    deleteElementInList(habitElement);
  });
}

addCustomListener("routineRetrieved", renderRoutine);
addCustomListener("habitAddedToRoutine", renderRoutine);
addCustomListener("habitMovedUpInRoutine", moveUpHabitInRoutine);
addCustomListener("habitRemovedFromRoutine", removeHabitFromRoutine);
