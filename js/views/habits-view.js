"use strict";

import { addEventListener } from "../utils.js";
import * as HabitController from "../controllers/habits-controller.js";

function deleteHabit(target) {
  const habitUid = target.parentNode.dataset.uid;
  HabitController.deleteHabit(habitUid);
}

// Event listeners
addEventListener("click", ".delete-habit", deleteHabit);
