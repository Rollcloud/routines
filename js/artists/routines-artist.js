"use strict";

import { retrieveTemplate, render, addCustomListener } from "../utils.js";
import { removeAllChildren } from "./base-artist.js";

// Components
const routineCards = document.querySelector(".routine-cards");

// Functions

function renderRoutineCards(routines, routineCards) {
  retrieveTemplate("routine-card.mustache").then((template) => {
    removeAllChildren(routineCards);
    // add create-routine
    routineCards.append(
      render(template, { name: "New Routine", icon: "*️⃣", habits: [], time: "Unknown" })
    );
    // add routines
    routines.forEach((routine) => {
      routineCards.append(render(template, routine));
    });
  });
}

function renderRoutines(details) {
  if (routineCards) renderRoutineCards(details.routines, routineCards);
}

addCustomListener("routinesRetrieved", renderRoutines);

export { renderRoutineCards };
