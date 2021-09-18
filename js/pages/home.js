"use strict";

import * as db from "../db.js";
import { habits, routines } from "../provided.js";

function addDefaultData() {
  // add missing habits to db
  db.addHabits(Object.values(habits)).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
  // add missing routines to db
  db.addRoutines(routines).catch((error) => {
    return; // Makes sure the promise is resolved, so the chain continues
  });
}

const addDataButton = document.getElementById("add-default-routines-btn");
addDataButton.addEventListener("click", (event) => {
  addDefaultData();
  addDataButton.classList.replace("btn-primary", "btn-success");
});
