"use strict";

import * as db from "../db.js";
import { sendCustomEvent } from "../utils.js";

function retrieveHabits() {
  return db.getHabits((habits) => sendCustomEvent("habitsRetrieved", { habits: habits }));
}

function addHabit(habit) {
  return db.addHabits([habit]).then(
    // sendCustomEvent("habitAdded", { habit: habit })
    retrieveHabits()
  );
}

function deleteHabit(uid) {
  return db.deleteHabitByUid(uid).then(sendCustomEvent("habitDeleted", { uid: uid }));
}

export { retrieveHabits, addHabit, deleteHabit };
