"use strict";

import { deleteHabit } from "../controllers/habits-controller.js";

// Event listeners
addEventListener("click", ".delete-habit", deleteHabit);
