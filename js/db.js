import Dexie from "https://unpkg.com/dexie@3.0.3/dist/dexie.mjs";
import Habit from "./classes/habit.js";
import Routine from "./classes/routine.js";

//
// Declare Database
//
const db = new Dexie("RoutinesDatabase");
db.version(1).stores({
  habits: "++id,&uid,name",
  routines: "++id,&uid,name",
});

Habit.prototype.save = function () {
  return db.habits.put(this);
};

Routine.prototype.save = function () {
  return db.routines.put(this);
};

db.habits.mapToClass(Habit);
db.routines.mapToClass(Routine);

async function addMissingHabits(habits) {
  return await db.habits.bulkPut(habits);
}

async function addMissingRoutines(routines) {
  return await db.routines.bulkPut(routines);
}

async function getHabits(callback) {
  return await db.habits.orderBy("name").toArray(callback);
}

async function getHabitByUid(habitUid, callback) {
  return await db.habits.where("uid").equals(habitUid).first(callback);
}

async function getRoutineByUid(routineName, callback) {
  return await db.routines.where("uid").equals(routineName).first(callback);
}

async function getRoutines(callback) {
  return await db.routines.orderBy("name").toArray(callback);
}

export {
  addMissingHabits,
  addMissingRoutines,
  getHabits,
  getHabitByUid,
  getRoutineByUid,
  getRoutines,
};
