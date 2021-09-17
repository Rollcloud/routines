"use strict";

import Routine from "../classes/routine.js";
import * as RoutineController from "../controllers/routine-controller.js";
import { addEventListener } from "../utils.js";

// Page setup
// get routine uid
let urlHash = window.location.hash.substr(1);
let routine;

// View
function reloadRoutine(routineUid) {
  window.location += routineUid;
  loadRoutine(routineUid);
}

// Controller
function createRoutine(name, icon) {
  const routine = new Routine(name.trim(), icon.trim(), []);
  routine.save();
  reloadRoutine(routine.uid);
}

function createRoutineDialog() {
  const newName = prompt("Please enter routine name");
  const newIcon = prompt("Please enter routine icon");
  if (newName !== null && newIcon !== null) createRoutine(newName, newIcon);
}

function loadRoutine(urlHash) {
  // load routine habits
  RoutineController.retrieveRoutine(urlHash)
    .then((result) => {
      routine = result;
    })
    .catch((err) => {
      createRoutineDialog();
    });
}

loadRoutine(urlHash);

// Event listener functions
function addHabit(target) {
  const habitUid = target.parentNode.dataset.uid;
  RoutineController.addHabitToRoutine(routine, habitUid);
}
function removeHabit(target) {
  const habitListItem = target.parentNode;
  const habitIdx = [...habitListItem.parentNode.children].indexOf(habitListItem);
  RoutineController.removeHabitFromRoutine(routine, habitIdx);
}
function moveUpHabit(target) {
  const habitListItem = target.parentNode;
  const habitIdx = [...habitListItem.parentNode.children].indexOf(habitListItem);
  RoutineController.moveUpHabitInRoutine(routine, habitIdx);
}

// Event listeners - Controller
addEventListener("click", ".add-to-routine", addHabit);
addEventListener("click", ".remove-from-routine", removeHabit);
addEventListener("click", ".reorder-in-routine", moveUpHabit);
