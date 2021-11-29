import { editHabit } from "../controllers/habits-controller.js";
import { retrieveTemplate, render } from "../utils.js";

const options = {};

let editHabitModal;
let habitForm;
let nameField;
let iconField;
let descriptionField;
let timeField;

let currentHabit;

retrieveTemplate("edit-habit-modal.mustache").then((template) => {
  const modalHtml = render(template);
  document.body.append(modalHtml);
  editHabitModal = new bootstrap.Modal(modalHtml, options);
  habitForm = document.getElementById("edit-habit-form");

  nameField = document.getElementById("formName");
  iconField = document.getElementById("formIcon");
  descriptionField = document.getElementById("formDescription");
  timeField = document.getElementById("formTime");
});

function saveHabit(event) {
  const description = descriptionField.value.trim();
  const time = parseInt(timeField.value);

  // show form validation
  habitForm.classList.add("was-validated");

  if (habitForm.checkValidity()) {
    // form validates, submit
    currentHabit.description = description;
    currentHabit.time = time;
    editHabit(currentHabit);
    editHabitModal.hide();
  }
}

function editExistingHabit(habit) {
  currentHabit = habit;
  // clear form
  habitForm.reset();
  // reset warnings
  habitForm.classList.remove("was-validated");
  // populate fields
  nameField.innerText = habit.name;
  iconField.innerText = habit.icon;
  descriptionField.value = habit.description;
  timeField.value = habit.time;
  // display modal
  editHabitModal.show();

  document.querySelector(".save-editing").addEventListener("click", saveHabit);
}

export { editExistingHabit };
