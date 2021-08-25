import { root } from "./settings.js";
import { stringToHTML } from "./utils.js";
import { addEventListener } from "./renderers.js";
import * as db from "./db.js";
import Habit from "./classes/habit.js";

const options = {};

let createHabitModel;
let existingRecordMessage;
let habitForm;

function showExistingRecordWarning(isShown = true) {
  if (isShown) {
    existingRecordMessage.classList.remove("d-none");
  } else {
    existingRecordMessage.classList.add("d-none");
  }
}

function endHabitCreation(habitKey) {
  const event = new CustomEvent("habitAdded", { detail: { habitKey: habitKey } });
  document.dispatchEvent(event);
  createHabitModel.hide();
}

fetch(root + "templates/new-habit-modal.mustache")
  .then((response) => response.text())
  .then((template) => {
    const modalHtml = stringToHTML(template);
    document.body.append(modalHtml);
    createHabitModel = new bootstrap.Modal(modalHtml, options);
    existingRecordMessage = document.getElementById("existing-record-message");
    habitForm = document.getElementById("create-new-habit-form");
  });

function beginHabitCreation(event) {
  const name = document.getElementById("formName").value.trim();
  const icon = document.getElementById("formIcon").value.trim();
  const description = document.getElementById("formDescription").value.trim();
  const time = parseInt(document.getElementById("formTime").value);

  // hide warning so that it may be reshown
  showExistingRecordWarning(false);

  // show form validation
  habitForm.classList.add("was-validated");

  if (habitForm.checkValidity()) {
    // form validates, submit
    const newHabit = new Habit(name, icon, description, time);
    db.addHabits([newHabit])
      .then(endHabitCreation)
      .catch((err) => {
        // only catch BulkErrors
        if (err.name == "BulkError") {
          // add small time-delay before showing message to make it obvious that it is still applicable
          setTimeout(() => {
            showExistingRecordWarning();
          }, 100);
        } else {
          return Promise.reject(err);
        }
      });
  }
}

document.querySelector(".create-new-habit").addEventListener("click", (event) => {
  // reset warnings
  habitForm.classList.remove("was-validated");
  showExistingRecordWarning(false);
  // display modal
  createHabitModel.show();
});

addEventListener("click", ".begin-creation", beginHabitCreation);
