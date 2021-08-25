"use strict";

import * as db from "./db.js";
import { routines } from "./provided.js";
import {
  renderHabitListItems,
  removeIndexFromList,
  moveItemUpInList,
  deleteHabitFromList,
  addEventListener,
} from "./renderers.js";

// Components
const routineName = document.getElementById("routine-name");
const allHabitsList = document.getElementById("all-habits");
const routineHabitsList = document.getElementById("routine-habits");

// Variables
var selectedRoutine;

// Functions

// Model
function habitModel_deleteHabit(habitUid) {
  db.deleteHabitByUid(habitUid);
  deleteHabitFromList(habitUid, allHabitsList, true);
}

// Model
function addHabitToRoutine(habit, routine) {
  routine.habits.push(habit);
  routine.save();
  renderHabitListItems([habit], routineHabitsList);
}

// Model
function removeHabitFromRoutine(habitIdx, routine) {
  routine.habits.splice(habitIdx, 1);
  routine.save();
  removeIndexFromList(habitIdx, routineHabitsList);
}

// Model
function moveHabitUpInRoutine(habitIdx, routine) {
  routine.habits.move(habitIdx, habitIdx - 1);
  routine.save();
  moveItemUpInList(habitIdx, routineHabitsList, true);
}

// Controller
function loadRoutine(routineUid) {
  db.getRoutineByUid(routineUid).then((routine) => {
    selectedRoutine = routine;
    routineName.textContent = routine.name;
    renderHabitListItems(routine.habits, routineHabitsList);
  });
}

// Controller
function addHabit(target, event) {
  const habitUid = target.parentNode.dataset.uid;
  db.getHabitByUid(habitUid, function (habit) {
    addHabitToRoutine(habit, selectedRoutine);
  });
}

// Controller
function removeHabit(target, event) {
  const habitListItem = target.parentNode;
  const habitIdx = [...habitListItem.parentNode.children].indexOf(habitListItem);
  removeHabitFromRoutine(habitIdx, selectedRoutine);
}

// Controller
function moveUpHabit(target, event) {
  const habitListItem = target.parentNode;
  const habitIdx = [...habitListItem.parentNode.children].indexOf(habitListItem);
  moveHabitUpInRoutine(habitIdx, selectedRoutine);
}

// Controller
function habitController_deleteHabit(target, event) {
  const habitUid = target.parentNode.dataset.uid;
  habitModel_deleteHabit(habitUid);
}

// Page setup
// get routine uid
let routineUid = window.location.hash.substr(1);

// Controller
// load all habits
db.getHabits().then((habits) => {
  renderHabitListItems(habits, allHabitsList);
});
// load routine habits
loadRoutine(routineUid);

// Event listeners - Controller
addEventListener("click", ".add-to-routine", addHabit);
addEventListener("click", ".remove-from-routine", removeHabit);
addEventListener("click", ".reorder-in-routine", moveUpHabit);
addEventListener("click", ".delete-habit", habitController_deleteHabit);
