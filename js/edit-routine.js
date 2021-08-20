"use strict";

import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import * as db from "./db.js";
import { routines } from "./provided.js";
import { stringToHTML } from "./utils.js";

// Templates
const habitListItemTemplate = document.getElementById("template-habit-list-item").innerHTML;
const habitCardTemplate = document.getElementById("template-habit").innerHTML;

// Components
const habitListLabel = document.getElementById("routine-name");
const habitScroller = document.getElementById("habit-scroller");
const habitList = document.getElementById("habit-list");

// Variables
var selectedRoutine;

// Functions

// View
function renderToList(habit) {
  habitList.append(stringToHTML(Mustache.render(habitListItemTemplate, habit)));
}

// View
function removeFromList(habitIdx) {
  let removeHabit = habitList.children[habitIdx];
  habitList.removeChild(removeHabit);
}

// Model
function addHabitToRoutine(habit, routine) {
  routine.habits.push(habit);
  routine.save();
  renderToList(habit);
}

//Model
function removeHabitFromRoutine(habitIdx, routine) {
  routine.habits.splice(habitIdx, 1);
  routine.save();
  removeFromList(habitIdx);
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
function loadRoutine(routineUid) {
  db.getRoutineByUid(routineUid, function (routine) {
    selectedRoutine = routine;
    habitListLabel.textContent = routine.name;
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

// Page setup
// get routine uid
let routineUid = window.location.hash.substr(1);

// Controller
// load routine into sidebar
loadRoutine(routineUid);
// load all habits into scroller
db.getHabits(renderHabits);

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

// View
document.addEventListener(
  "click",
  function (event) {
    // loop parent nodes from the target to the delegation node
    for (var target = event.target; target && target != this; target = target.parentNode) {
      if (target.matches(".remove-from-routine")) {
        removeHabit.call(this, target, event);
        break;
      }
    }
  },
  false
);
