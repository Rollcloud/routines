"use strict";

import { root } from "./settings.js";
import { render } from "./utils.js";

const links = [
  ["Home", root],
  ["Start", root + "start/"],
  ["My Routines", root + "edit/"],
  ["My Habits", root + "edit/habits/"],
];

const pathname = window.location.pathname;
const linkFragment = new DocumentFragment();
const navbarNav = document.querySelector(".navbar-nav");
const navLinkTemplate = document.getElementById("nav-link-template").innerHTML;

for (const [idx, [text, url]] of Object.entries(links)) {
  let active = "";
  if (pathname === url) active = "active";
  const link = { title: text, destination: url, active: active };
  linkFragment.append(render(navLinkTemplate, link));
}

navbarNav.append(linkFragment);
