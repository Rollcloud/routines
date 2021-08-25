import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";
import { root } from "./settings.js";
import { stringToHTML } from "./utils.js";

function renderHabitListItems(habits, habitList) {
  fetch(root + "templates/habit-list-item.mustache")
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

function removeAllChildren(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
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

function renderHabitCards(habits, habitScroller) {
  fetch(root + "/templates/habit-card.mustache")
    .then((response) => response.text())
    .then((template) => {
      habits.forEach((habit) => {
        habitScroller.append(stringToHTML(Mustache.render(template, habit)));
      });
    });
}

function addEventListener(eventType, element, handle) {
  document.addEventListener(
    eventType,
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
  removeAllChildren,
  moveItemUpInList,
  deleteHabitFromList,
  renderHabitCards,
  addEventListener,
};
