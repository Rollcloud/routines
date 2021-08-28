import { addHabit } from "../controllers/habits-controller.js";
import { retrieveTemplate, render, addEventListener } from "../utils.js";
import Habit from "../classes/habit.js";

const options = {};

let createHabitModal;
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
  createHabitModal.hide();
}

retrieveTemplate("new-habit-modal.mustache").then((template) => {
  const modalHtml = render(template);
  document.body.append(modalHtml);
  createHabitModal = new bootstrap.Modal(modalHtml, options);
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
    addHabit(newHabit)
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
  // clear form
  habitForm.reset();
  // reset warnings
  habitForm.classList.remove("was-validated");
  showExistingRecordWarning(false);
  // display modal
  createHabitModal.show();

  document.querySelector(".begin-creation").addEventListener("click", beginHabitCreation);
});
