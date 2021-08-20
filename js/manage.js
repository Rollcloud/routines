"use strict";

import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import Routine from "./routine.js";
import * as db from "./db.js";
import { stringToHTML } from "./utils.js";

// Templates
const routineOptionTemplate = document.getElementById("template-routine-option").innerHTML;

// Components
const routineSelect = document.getElementById("routine-select");
const continueBtn = document.getElementById("continue");

// Variables
var selectedRoutine;

// Functions

// View
function renderRoutineOptions(routines) {
  routines.forEach((routine) => {
    routineSelect.append(stringToHTML(Mustache.render(routineOptionTemplate, routine)));
  });
}

// Page setup

// Controller
db.getRoutines(renderRoutineOptions);

// View
// Submit button
continueBtn.addEventListener("click", (event) => {
  let routineUid = routineSelect.value;
  if (routineUid == "create-new") {
    let newName = prompt("Please enter routine name");
    let routine = new Routine(newName.trim(), []);
    routine.save();
    routineUid = routine.uid;
  }
  window.location += "edit#" + routineUid;
});
