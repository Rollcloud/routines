import { crc32 } from "./utils.js";

class Habit {
  constructor(name, icon, description, time) {
    this.name = name;
    this.icon = icon;
    this.description = description;
    this.time = time;

    this.uid = `h${crc32(this.name + this.icon).toURL()}`;
  }
}

export default Habit;
