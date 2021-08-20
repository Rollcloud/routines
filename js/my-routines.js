"use strict";

import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import * as db from "./db.js";
import { stringToHTML } from "./utils.js";

// Templates
const habitListItemTemplate = document.getElementById("template-habit-list-item").innerHTML;
const habitCardTemplate = document.getElementById("template-habit").innerHTML;
const routineOptionTemplate = document.getElementById("template-routine-option").innerHTML;

// Components
const habitList = document.getElementById("habit-list");
const habitScroller = document.getElementById("habit-scroller");
const routineSelect = document.getElementById("routine-select");

// Variables
var selectedRoutine;

// Functions

// View
function renderToList(habit) {
  habitList.append(stringToHTML(Mustache.render(habitListItemTemplate, habit)));
}

// Model
function addHabitToRoutine(habit, routine) {
  routine.habits.push(habit);
  routine.save();
  renderToList(habit);
}

// Controller
function addHabit(target, event) {
  const habitUid = target.parentNode.parentNode.id;
  db.getHabitByUid(habitUid, function (habit) {
    addHabitToRoutine(habit, selectedRoutine);
  });
}

// Controller
function loadRoutine(routineName) {
  db.getRoutine(routineName, function (routine) {
    selectedRoutine = routine;
    routine.habits.forEach((habit) => {
      renderToList(habit);
    });
  });
}

// View
function renderHabits(habits) {
  habits.forEach((habit) => {
    habitScroller.append(stringToHTML(Mustache.render(habitCardTemplate, habit)));
  });
}

// View
function renderRoutineOptions(routines) {
  routines.forEach((routine) => {
    routineSelect.append(stringToHTML(Mustache.render(routineOptionTemplate, routine)));
  });
}

// Page setup

// Controller
db.getHabits(renderHabits);
db.getRoutines(renderRoutineOptions);

// View
routineSelect.addEventListener("change", (event) => {
  // clear habits in habitList
  while (habitList.firstChild) {
    habitList.removeChild(habitList.lastChild);
  }
  loadRoutine(event.target.value);
});

// View
document.addEventListener(
  "click",
  function (event) {
    // loop parent nodes from the target to the delegation node
    for (var target = event.target; target && target != this; target = target.parentNode) {
      if (target.matches(".add-to-routine")) {
        addHabit.call(this, target, event);
        break;
      }
    }
  },
  false
);
