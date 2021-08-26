"use strict";

import * as db from "../db.js";
import { habits, routines } from "../provided.js";
import { retrieveHabits } from "../controllers/habits-controller.js";
import {} from "../artists/habits-artist.js";

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

  retrieveHabits();
}

main();
