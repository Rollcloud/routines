"use strict";

import * as db from "../db.js";
import { sendCustomEvent } from "../utils.js";

function retrieveRoutine(routineUid) {
  return db.getRoutineByUid(routineUid).then((routine) => {
    sendCustomEvent("routineRetrieved", { routine: routine });
    return routine;
  });
}

function addHabitToRoutine(routine, habitUid) {
  db.getHabitByUid(habitUid, (habit) => {
    routine.habits.push(habit);
    routine.save();
    sendCustomEvent("habitAddedToRoutine", { habit: habit, routine: routine });
  });
}

function removeHabitFromRoutine(routine, habitIdx) {
  routine.habits.splice(habitIdx, 1);
  routine.save();
  sendCustomEvent("habitRemovedFromRoutine", { habitIdx: habitIdx, routine: routine });
}

function moveUpHabitInRoutine(routine, habitIdx) {
  routine.habits.move(habitIdx, habitIdx - 1);
  routine.save();
  sendCustomEvent("habitMovedUpInRoutine", { habitIdx: habitIdx, routine: routine });
}

export { retrieveRoutine, addHabitToRoutine, removeHabitFromRoutine, moveUpHabitInRoutine };
