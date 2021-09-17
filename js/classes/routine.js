import { crc32, sumAttr } from "../utils.js";

class Routine {
  constructor(name, icon, habits) {
    this.name = name;
    this.icon = icon;
    this.habits = habits;

    this.uid = `r${crc32(this.name + this.icon).toURL()}`;
  }

  get time() {
    // add the time taken to perform each habit
    const minutes = sumAttr(this.habits, "time");
    return `${minutes} minutes`;
  }
}

export default Routine;
