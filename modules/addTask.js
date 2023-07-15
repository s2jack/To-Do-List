import Task from './taskClass.js';
import TasksUI from './tasksUI.js';

export default class AddTask {
  // console.log('event works');
  static addThis() {
    // console.log('event works');
    const dB = JSON.parse(localStorage.getItem('tasksDB')) || [];
    // console.log(dB);
    const addTaskInput = document.querySelector('#task-input');
    if (addTaskInput.value) {
      // console.log('input filled');
      // console.log(addTaskInput.value);
      // console.log('database empty');
      const index = dB.length + 1;
      const task = new Task(addTaskInput.value, index);
      const newDB = [...dB, task];
      localStorage.setItem('tasksDB', JSON.stringify(newDB));
      TasksUI.checkData();
      TasksUI.loadTasksUI();
    }
  }
}
