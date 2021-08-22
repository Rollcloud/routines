import { crc32 } from "../utils.js";

class Routine {
  constructor(name, habits) {
    this.name = name;
    this.habits = habits;

    this.uid = `r${crc32(this.name).toURL()}`;
  }
}

export default Routine;
