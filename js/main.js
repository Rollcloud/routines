"use strict";

import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import * as db from "./db.js";
import { stringToHTML } from "./utils.js";
import { habits, routines } from "./provided.js";

let habitListItemTemplate = document.getElementById("template-habit-list-item").innerHTML;
let habitCardTemplate = document.getElementById("template-habit").innerHTML;

function renderToScrollSpy(habit) {
  // add content before links
  document
    .getElementById("habit-scroller")
    .append(stringToHTML(Mustache.render(habitCardTemplate, habit)));
  document
    .getElementById("habit-scroller-list")
    .append(stringToHTML(Mustache.render(habitListItemTemplate, habit)));
}

function renderHabits(habits) {
  habits.forEach((habit) => {
    renderToScrollSpy(habit);
  });
  // refresh scroll spy
  let scrollSpyContentEl = document.getElementById("habit-scroller");
  bootstrap.ScrollSpy.getOrCreateInstance(scrollSpyContentEl).refresh();
}

function main() {
  // add missing habits to db
  db.addMissingHabits(Object.values(habits)).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
  // add missing routines to db
  db.addMissingRoutines(routines).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
  // display all habits in db
  db.getHabits(renderHabits);
}

main();
