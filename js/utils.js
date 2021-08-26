import Mustache from "https://cdnjs.cloudflare.com/ajax/libs/mustache.js/4.2.0/mustache.min.js";

import * as settings from "./settings.js";

/**
 * Convert a template string into HTML DOM nodes
 * @param  {String} str The template string
 * @return {Node}       The template HTML
 */
function stringToHTML(str) {
  let parser = new DOMParser();
  let doc = parser.parseFromString(str, "text/html");
  return doc.body.firstChild;
}

/**
 * Create a hash of the provided input using CRC-32
 * Source: https://stackoverflow.com/a/50579690
 * @param {*} r         The provided input
 * @returns {Number}    The hashed result
 */
function crc32(r) {
  for (var a, o = [], c = 0; c < 256; c++) {
    a = c;
    for (let f = 0; f < 8; f++) a = 1 & a ? 3988292384 ^ (a >>> 1) : a >>> 1;
    o[c] = a;
  }
  for (var n = -1, t = 0; t < r.length; t++) n = (n >>> 8) ^ o[255 & (n ^ r.charCodeAt(t))];
  return (-1 ^ n) >>> 0;
}

Number.prototype.toURL = function () {
  const nolookalikes = "346789ABCDEFGHJKLMNPQRTUVWXYabcdefghijkmnpqrtwxyz";
  let num = this;
  let base = nolookalikes.length;
  let result = "";

  while (num > 0) {
    let bit = num % base;
    result = nolookalikes[bit] + result; // put bit to the left of any previous bits in the bitstring
    num = Math.floor(num / base);
  }
  return result;
};

/**
 * Move location of items in an array
 * Source: https://stackoverflow.com/a/49874250
 * @param {Number} from   The initial position
 * @param {Number} to     The final position
 * @param {Number} on     The number of items to move, default = 1
 * @returns {Array}       The final array
 */
if (typeof Array.prototype.move === "undefined") {
  Array.prototype.move = function (from, to, on = 1) {
    return this.splice(to, 0, ...this.splice(from, on)), this;
  };
}

/**
 * Listen for an event from a future element
 * @param  {String} eventType The event type
 * @param  {String} element   The querystring for a future element
 * @param  {Function} handle  The callback on event occurrence: passes `target`, `event`
 */
function addEventListener(eventType, element, handle) {
  document.addEventListener(
    eventType,
    (event) => {
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

/**
 * Listen for a custom event from sendCustomEvent
 * @param  {String} eventName The event name
 * @param  {Function} handle  The callback on event occurrence: passes `detail`
 */
function addCustomListener(eventName, handle) {
  document.addEventListener(eventName, (event) => {
    handle.call(this, event.detail);
  });
}

/**
 * Send a custom event to an addCustomListener
 * @param  {String} eventName The event name
 * @param  {Object} detail    The data payload
 */
function sendCustomEvent(eventName, detail) {
  const event = new CustomEvent(eventName, { detail: detail });
  document.dispatchEvent(event);
}

async function retrieveTemplate(templateName) {
  const response = await fetch(settings.root + "templates/" + templateName);
  return await response.text();
}

function render(template, values) {
  return stringToHTML(Mustache.render(template, values));
}

export { crc32, addEventListener, addCustomListener, sendCustomEvent, retrieveTemplate, render };
