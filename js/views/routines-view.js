"use strict";

import Routine from "../classes/routine.js";
import * as db from "../db.js";
import { render } from "../utils.js";

// Templates
const routineOptionTemplate = document.getElementById("template-routine-option").innerHTML;

// Components
const routineSelect = document.getElementById("routine-select");
const continueBtn = document.getElementById("continue");

// View
function renderRoutineOptions(routines) {
  routines.forEach((routine) => {
    routineSelect.append(render(routineOptionTemplate, routine));
  });
}

// View
function loadRoutineEditor(routineUid) {
  window.location += "edit#" + routineUid;
}

// Controller
function loadRoutines() {
  db.getRoutines(renderRoutineOptions);
}

// Controller
function createRoutine(name) {
  const routine = new Routine(name.trim(), []);
  routine.save();
  loadRoutineEditor(routine.uid);
}

loadRoutines();

// View
// Submit button
continueBtn.addEventListener("click", (event) => {
  const selectedValue = routineSelect.value;
  if (selectedValue == "create-new") {
    const newName = prompt("Please enter routine name");
    if (newName !== null) createRoutine(newName);
  } else {
    const routineUid = selectedValue;
    loadRoutineEditor(routineUid);
  }
});
