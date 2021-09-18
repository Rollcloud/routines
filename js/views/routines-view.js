"use strict";

import { addEventListener } from "../utils.js";
import * as RoutineController from "../controllers/routines-controller.js";

function deleteRoutine(target) {
  const routineUid = target.parentNode.parentNode.dataset.uid;
  RoutineController.deleteRoutine(routineUid);
}

// Event listeners
addEventListener("click", ".delete-routine", deleteRoutine);
