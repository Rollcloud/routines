import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import { stringToHTML } from "./utils.js";

const root = "/routines/";

function renderHabitListItems(habits, habitList) {
  fetch(root + "templates/habit-listitem.mustache")
    .then((response) => response.text())
    .then((template) => {
      habits.forEach((habit) => {
        habitList.append(stringToHTML(Mustache.render(template, habit)));
      });
    });
}

function removeIndexFromList(idx, list) {
  let listItem = list.children[idx];
  list.removeChild(listItem);
}

function moveItemUpInList(idx, list, animate = false) {
  const oldChild = list.children[idx];
  const refChild = list.children[idx - 1];

  if (animate == true) {
    // apply animation
    const timeout = 300;
    const height = getComputedStyle(oldChild).height;
    const transition = `margin ${timeout / 1000}s`;
    // target animations
    oldChild.style.transition = transition;
    oldChild.style.marginTop = `-${height}`;
    oldChild.style.marginBottom = `+${height}`;
    // above element animations
    refChild.style.transition = transition;
    refChild.style.marginTop = `+${height}`;
    refChild.style.marginBottom = `-${height}`;

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

function renderHabitCards(habits, habitScroller) {
  fetch(root + "/templates/habit-card.mustache")
    .then((response) => response.text())
    .then((template) => {
      habits.forEach((habit) => {
        habitScroller.append(stringToHTML(Mustache.render(template, habit)));
      });
    });
}

function addEventListener(eventName, element, handle) {
  document.addEventListener(
    eventName,
    function (event) {
      // loop parent nodes from the target to the delegation node
      for (var target = event.target; target && target != this; target = target.parentNode) {
        if (target.matches(element)) {
          handle.call(this, target, event);
          break;
        }
      }
    },
    false
  );
}

export {
  renderHabitListItems,
  removeIndexFromList,
  moveItemUpInList,
  renderHabitCards,
  addEventListener,
};
