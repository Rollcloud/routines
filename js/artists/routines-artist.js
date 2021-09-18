"use strict";

import { retrieveTemplate, render, addCustomListener } from "../utils.js";
import { removeAllChildren, deleteElementInList } from "./base-artist.js";

// Components
const routineCards = document.querySelector(".routine-cards");

// Functions

function renderRoutineCards(routines, routineCards) {
  retrieveTemplate("routine-card.mustache").then((template) => {
    removeAllChildren(routineCards);
    if (routineCards.classList.contains("new-routine")) {
      // add create-routine
      routineCards.append(
        render(template, {
          uid: "new",
          name: "New Routine",
          icon: "*️⃣",
          habits: [],
          time: "Unknown",
        })
      );
    }
    // add routines
    routines.forEach((routine) => {
      routineCards.append(render(template, routine));
    });
  });
}

function renderRoutines(details) {
  if (routineCards) renderRoutineCards(details.routines, routineCards);
}

function deleteRoutine(detail, animate = true) {
  if (routineCards) {
    const listItem = routineCards.querySelector(`[data-uid=${detail.uid}]`);
    deleteElementInList(listItem, animate);
  }
}

addCustomListener("routinesRetrieved", renderRoutines);
addCustomListener("routineDeleted", deleteRoutine);

export { renderRoutineCards };
