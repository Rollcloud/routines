"use strict";

import { retrieveTemplate, render, addCustomListener } from "../utils.js";
import { removeAllChildren } from "../renderers.js";

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

function moveItemUpInList(idx, list, animate = false) {
  const oldChild = list.children[idx];
  const refChild = list.children[idx - 1];

  if (animate == true) {
    // apply animation
    const timeout = 300;
    const oldHeight = getComputedStyle(oldChild).height;
    const refHeight = getComputedStyle(refChild).height;
    const transition = `margin ${timeout / 1000}s`;
    // target animations
    oldChild.style.transition = transition;
    oldChild.style.marginTop = `-${refHeight}`;
    oldChild.style.marginBottom = `+${refHeight}`;
    // above element animations
    refChild.style.transition = transition;
    refChild.style.marginTop = `+${oldHeight}`;
    refChild.style.marginBottom = `-${oldHeight}`;

    setTimeout(() => {
      // after animations
      oldChild.removeAttribute("style");
      refChild.removeAttribute("style");
      list.insertBefore(oldChild, refChild);
    }, timeout);
  } else {
    // move immediately
    list.insertBefore(oldChild, refChild);
  }
}

function deleteHabitFromList(habitUid, list, animate = true) {
  const listItem = list.querySelector(`[data-uid=${habitUid}]`);

  if (animate == true) {
    // apply animation
    const timeout = 300;
    const itemHeight = getComputedStyle(listItem).height;
    const transition = `${timeout / 1000}s`;

    listItem.style.zIndex = "-100";
    // target animations
    listItem.style.transition = transition;
    listItem.style.opacity = 0;
    listItem.style.marginBottom = `-${itemHeight}`;

    setTimeout(() => {
      // after animations
      listItem.remove();
    }, timeout);
  } else {
    // move immediately
    listItem.remove();
  }
}

addCustomListener("habitsRetrieved", renderHabits);

export { renderHabitListItems };
