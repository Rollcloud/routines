"use strict";

import Routine from "../classes/routine.js";
import * as RoutineController from "../controllers/routine-controller.js";
import { addEventListener } from "../utils.js";

// Page setup
// get routine uid
let urlHash = window.location.hash.substr(1);

// load routine habits
let routine = RoutineController.retrieveRoutine(urlHash);

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
// addEventListener("click", ".delete-habit", habitController_deleteHabit);
