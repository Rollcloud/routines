"use strict";

import * as db from "../db.js";
import { sendCustomEvent } from "../utils.js";

function retrieveHabits() {
  return db.getHabits((habits) => sendCustomEvent("habitsRetrieved", { habits: habits }));
}

function getHabit(habitUid, callback) {
  return db.getHabitByUid(habitUid, (habit) => callback(habit));
}

function addHabit(habit) {
  return db.addHabits([habit]).then(
    // sendCustomEvent("habitAdded", { habit: habit })
    retrieveHabits()
  );
}

function editHabit(habit) {
  habit.save();
  sendCustomEvent("habitEdited", { habit: habit });
}

function deleteHabit(uid) {
  return db.deleteHabitByUid(uid).then(sendCustomEvent("habitDeleted", { uid: uid }));
}

export { retrieveHabits, getHabit, addHabit, editHabit, deleteHabit };
