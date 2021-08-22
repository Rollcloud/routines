"use strict";

import * as db from "./db.js";
import { routines } from "./provided.js";
import {
  renderHabitListItems,
  removeIndexFromList,
  moveItemUpInList,
  renderHabitCards,
  addEventListener,
} from "./renderers.js";

// Components
const habitListLabel = document.getElementById("routine-name");
const habitScroller = document.getElementById("habit-scroller");
const habitList = document.getElementById("habit-list");

// Variables
var selectedRoutine;

// Functions

// Model
function addHabitToRoutine(habit, routine) {
  routine.habits.push(habit);
  routine.save();
  renderHabitListItems([habit], habitList);
}

// Model
function removeHabitFromRoutine(habitIdx, routine) {
  routine.habits.splice(habitIdx, 1);
  routine.save();
  removeIndexFromList(habitIdx, habitList);
}

// Model
function moveHabitUpInRoutine(habitIdx, routine) {
  routine.habits.move(habitIdx, habitIdx - 1);
  routine.save();
  moveItemUpInList(habitIdx, habitList, true);
}

// Controller
function loadRoutine(routineUid) {
  db.getRoutineByUid(routineUid).then((routine) => {
    selectedRoutine = routine;
    habitListLabel.textContent = routine.name;
    renderHabitListItems(routine.habits, habitList);
  });
}

// Controller
function addHabit(target, event) {
  const habitUid = target.parentNode.parentNode.id;
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

// Page setup
// get routine uid
let routineUid = window.location.hash.substr(1);

// Controller
// load routine into sidebar
loadRoutine(routineUid);
// load all habits into scroller
db.getHabits().then((habits) => {
  renderHabitCards(habits, habitScroller);
});

// Event listeners - Controller
addEventListener("click", ".add-to-routine", addHabit);
addEventListener("click", ".remove-from-routine", removeHabit);
addEventListener("click", ".reorder-in-routine", moveUpHabit);
