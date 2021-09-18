// A bank or pre-defined habits and routines

import Habit from "./classes/habit.js";
import Routine from "./classes/routine.js";

const habits = {
  tidy_bedroom: new Habit("Put things in place", "🧺", "A tidy bedroom is a calm bedroom.", 5),
  shower: new Habit(
    "Shower",
    "🚿",
    "There's nothing like a long hot shower to sooth and relax...",
    15
  ),
  brush_teeth: new Habit(
    "Brush teeth",
    "🦷",
    "You're gonna need those pearly whites in the years to come.",
    3
  ),
  toilet_night: new Habit("Toilet", "🚽", "An empty bladder is the way to a restful night.", 3),
  pyjamas: new Habit("Put on pyjamas", "👘", "Wrap up warm and cozy before going to bed.", 3),
  read_night: new Habit("Reading", "📖", "There's nothing like a story before bedtime.", 15),
  light_off: new Habit("Light off", "🛌", "It's sleepy time now...", 1),
  drink_water: new Habit(
    "Drink water",
    "💧",
    "Good for you and super refreshing, what's there to lose?",
    1
  ),
  change_clothes: new Habit(
    "Change clothes",
    "👕",
    "Wearing the right clothes for the job makes all the difference.",
    10
  ),
  brush_hair: new Habit("Brush hair", "🧑", "It pays to look your best.", 2),
  take_meds: new Habit(
    "Take meds",
    "💊",
    "They say “an apple a day keeps the doctor away”, but sometimes a little bit more is required.",
    1
  ),
  wash_face: new Habit(
    "Wash face",
    "🧼",
    "“Age should not have its face lifted, but it should rather teach the world to admire wrinkles as the etchings of experience and the firm line of character.” ― Clarence Day",
    2
  ),
};

const routines = [
  new Routine("Morning Routine", "🌅", [
    habits.drink_water,
    habits.brush_teeth,
    habits.change_clothes,
  ]),
  new Routine("Evening Routine", "🎑", [
    habits.tidy_bedroom,
    habits.shower,
    habits.brush_teeth,
    habits.toilet_night,
    habits.pyjamas,
    habits.read_night,
    habits.light_off,
  ]),
];

export { habits, routines };
