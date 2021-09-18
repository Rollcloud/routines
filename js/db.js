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
  // remove undefined habits
  this.habits = this.habits.filter((item) => item !== undefined && item !== null);
  return db.routines.put(this);
};

db.habits.mapToClass(Habit);
db.routines.mapToClass(Routine);

async function addHabits(habits) {
  return await db.habits.bulkPut(habits);
}

async function addRoutines(routines) {
  return await db.routines.bulkPut(routines);
}

async function getHabits(callback) {
  return await db.habits.orderBy("name").toArray(callback);
}

async function getHabit(habitKey) {
  return await db.habits.get(habitKey);
}

async function getHabitByUid(habitUid, callback) {
  return await db.habits.where("uid").equals(habitUid).first(callback);
}

async function getRoutine(routineKey) {
  return await db.habits.get(routineKey);
}

async function getRoutineByUid(routineUid, callback) {
  const result = await db.routines.where("uid").equals(routineUid).first(callback);
  if (result === undefined) throw `Routine not found for UID '${routineUid}'`;
  else return result;
}

async function getRoutines(callback) {
  return await db.routines.orderBy("name").toArray(callback);
}

async function deleteHabitByUid(habitUid) {
  return await getHabitByUid(habitUid)
    .then((habit) => {
      return habit.id;
    })
    .then((id) => {
      return db.habits.delete(id);
    });
}

async function deleteRoutineByUid(routineUid) {
  return await getRoutineByUid(routineUid)
    .then((routine) => {
      return routine.id;
    })
    .then((id) => {
      return db.routines.delete(id);
    });
}

export {
  addHabits,
  addRoutines,
  getHabits,
  getHabit,
  getHabitByUid,
  getRoutine,
  getRoutineByUid,
  getRoutines,
  deleteHabitByUid,
  deleteRoutineByUid,
};
