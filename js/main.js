"use strict";

import * as db from "./db.js";
import { habits, routines } from "./provided.js";
import { renderHabitListItems, renderHabitCards } from "./renderers.js";

// Components
const habitScrollerList = document.getElementById("habit-scroller-list");
const habitScroller = document.getElementById("habit-scroller");

function renderHabits(habits) {
  renderHabitListItems(habits, habitScrollerList);
  renderHabitCards(habits, habitScroller);
}

function main() {
  // add missing habits to db
  db.addHabits(Object.values(habits)).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
  // add missing routines to db
  db.addRoutines(routines).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
  // display all habits in db
  db.getHabits(renderHabits);
}

main();
