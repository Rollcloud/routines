function renderTemplateForObjectsInElement(templateName, objects, element) {
  retrieveTemplate(templateName).then((template) => {
    removeAllChildren(element);
    objects.forEach((item) => {
      element.append(render(template, item));
    });
  });
}

function moveUpIndexInList(idx, list, animate = false) {
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

function deleteElementInList(element, animate = true) {
  if (animate == true) {
    // apply animation
    const timeout = 300;
    const itemHeight = getComputedStyle(element).height;
    const transition = `${timeout / 1000}s`;

    element.style.zIndex = "-100";
    // target animations
    element.style.transition = transition;
    element.style.opacity = 0;
    element.style.marginBottom = `-${itemHeight}`;

    setTimeout(() => {
      // after animations
      element.remove();
    }, timeout);
  } else {
    // remove immediately
    element.remove();
  }
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

export {
  renderTemplateForObjectsInElement,
  moveUpIndexInList,
  deleteElementInList,
  removeIndexFromList,
  removeAllChildren,
};
