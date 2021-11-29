"use strict";

import { addEventListener } from "../utils.js";
import { editExistingHabit } from "../views/habit-edit-view.js";
import * as HabitController from "../controllers/habits-controller.js";

function deleteHabit(target) {
  const habitUid = target.parentNode.dataset.uid;
  HabitController.deleteHabit(habitUid);
}

function editHabit(target) {
  const habitUid = target.parentNode.dataset.uid;
  HabitController.getHabit(habitUid, (habit) => {
    editExistingHabit(habit);
  });
}

// Event listeners
addEventListener("click", ".delete-habit", deleteHabit);
addEventListener("click", ".edit-habit", editHabit);
