"use strict";

import { retrieveTemplate, render, addCustomListener } from "../utils.js";
import { removeAllChildren, deleteElementInList } from "./base-artist.js";

// Components
const habitList = document.getElementById("all-habits-list");
const habitCards = document.getElementById("habit-scroller");

// Functions

function renderHabitListItems(habits, habitList) {
  retrieveTemplate("habit-list-item.mustache").then((template) => {
    removeAllChildren(habitList);
    habits.forEach((habit) => {
      habitList.append(render(template, habit));
    });
  });
}

function renderHabitCards(habits, habitScroller) {
  retrieveTemplate("habit-card.mustache").then((template) => {
    removeAllChildren(habitScroller);
    habits.forEach((habit) => {
      habitScroller.append(render(template, habit));
    });
  });
}

function renderHabits(details) {
  renderHabitListItems(details.habits, habitList);
  if (habitCards) renderHabitCards(details.habits, habitCards);
}

function replaceHabit(detail) {
  const oldHabitCard = habitCards.querySelector(`[data-uid=${detail.habit.uid}]`);
  retrieveTemplate("habit-card.mustache").then((template) => {
    const newHabitCard = render(template, detail.habit);
    habitCards.replaceChild(newHabitCard, oldHabitCard);
  });
}

function deleteHabitFromList(habitUid, list, animate = true) {
  const listItem = list.querySelector(`[data-uid=${habitUid}]`);
  console.log(listItem, list, animate);
  deleteElementInList(listItem, animate);
}

function deleteHabit(detail) {
  deleteHabitFromList(detail.uid, habitList);
  deleteHabitFromList(detail.uid, habitCards);
}

addCustomListener("habitsRetrieved", renderHabits);
addCustomListener("habitEdited", replaceHabit);
addCustomListener("habitDeleted", deleteHabit);

export { renderHabitListItems, renderHabitCards };
