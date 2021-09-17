"use strict";

import * as db from "../db.js";
import { sendCustomEvent } from "../utils.js";

function retrieveRoutines() {
  return db.getRoutines((routines) => sendCustomEvent("routinesRetrieved", { routines: routines }));
}

function addRoutine(routine) {
  return db.addRoutines([routine]).then(
    // sendCustomEvent("routineAdded", { routine: routine })
    retrieveRoutines()
  );
}

function deleteRoutine(uid) {
  return db.deleteRoutineByUid(uid).then(sendCustomEvent("routineDeleted", { uid: uid }));
}

export { retrieveRoutines, addRoutine, deleteRoutine };
