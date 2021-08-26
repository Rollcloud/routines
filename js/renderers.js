function removeIndexFromList(idx, list) {
  let listItem = list.children[idx];
  list.removeChild(listItem);
}

function removeAllChildren(node) {
  while (node.lastElementChild) {
    node.removeChild(node.lastElementChild);
  }
}

export { removeIndexFromList, removeAllChildren };
