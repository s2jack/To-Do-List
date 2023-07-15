// Task constructor class
export default class Task {
  constructor(description, index) {
    this.completed = false;
    this.description = description;
    this.index = index;
    this.id = (Math.floor(Math.random() * 10000) + 1).toString(); // unique id
  }
}
