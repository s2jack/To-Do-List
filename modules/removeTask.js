import TasksUI from './tasksUI.js';

export default class RemoveTask {
  static removeThis() {
    // console.log('remove starting...')
    const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB')) || [];
    const newDB = tasksDbInstance.filter((task) => !task.completed);
    // console.log(newDB)
    for (let i = 0; i < newDB.length; i += 1) {
      newDB[i].index = i + 1;
    }
    localStorage.setItem('tasksDB', JSON.stringify(newDB));
    TasksUI.loadTasksUI();
  }
}
