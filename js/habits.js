"use strict";

import * as db from "./db.js";
import { renderHabitListItems, renderHabitCards, removeAllChildren } from "./renderers.js";

// Components
const habitScrollerList = document.getElementById("habit-scroller-list");
const habitScroller = document.getElementById("habit-scroller");

function renderHabits(habits) {
  renderHabitListItems(habits, habitScrollerList);
  renderHabitCards(habits, habitScroller);
}

// Controller
function addHabit(event) {
  db.getHabit(event.detail.habitKey).then((habit) => {
    removeAllChildren(habitScrollerList);
    removeAllChildren(habitScroller);
    db.getHabits(renderHabits);
  });
}

// display all habits in db
db.getHabits(renderHabits);

// Event listeners - Controller
document.addEventListener("habitAdded", addHabit);
// addEventListener("click", ".delete-habit", habitController_deleteHabit);
