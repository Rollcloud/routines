"use strict";

import Routine from "../classes/routine.js";
import { render } from "../utils.js";

// Controller
function createRoutine(name, icon) {
  const routine = new Routine(name.trim(), icon.trim(), []);
  routine.save();
  loadRoutineEditor(routine.uid);
}

function createRoutineDialog() {
  const newName = prompt("Please enter routine name");
  const newIcon = prompt("Please enter routine icon");
  if (newName !== null && newIcon !== null) createRoutine(newName, newIcon);
}
