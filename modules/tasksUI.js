import Task from './taskClass.js';

export default class TasksUI {
  static checkData = () => {
    if (localStorage.getItem('tasksDB') === null) {
      // console.log(localStorage.getItem('tasksDB'));
      return false;
    }
    return true;
  };

  static loadTasksUI = () => {
    // console.log(this.checkData())
    if (this.checkData() === false || this.checkData() === null) {
      // console.log('database is empty');
      const tasksUIelement = document.querySelector('#taskUI');
      tasksUIelement.style = 'height: 10%;';
      tasksUIelement.innerText = 'Please add some tasks to display';
      tasksUIelement.className = 'warn-message';
    } else {
      const tasksUIelement = document.querySelector('#taskUI');
      tasksUIelement.style = 'height: 80%;';
      tasksUIelement.innerText = '';
      tasksUIelement.className = '';
      // console.log('you have data on your LcStr');
      const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB'));
      // console.log(`taskDBInstance: ${tasksDbInstance}`);
      /* tasksDbInstance.forEach((obj) => {
        console.log(obj);
      }); */
      tasksDbInstance
        .filter((task) => task.completed !== true)
        .forEach((task) => {
          // console.log(task);
          const taskContainer = document.createElement('div');
          taskContainer.className = 'list-element';
          taskContainer.id = 'task-container';
          tasksUIelement.appendChild(taskContainer);
          const taskToogle = document.createElement('input');
          taskToogle.type = 'checkbox';
          taskToogle.className = 'task';
          taskContainer.appendChild(taskToogle);
          const taskTitle = document.createElement('p');
          taskTitle.className = 'task-title-text';
          taskTitle.id = `task${task.index};`;
          taskTitle.innerHTML = task.description;
          taskContainer.appendChild(taskTitle);
        });
    }
  };

  static addTask() {
    // console.log('event works');
    const dB = JSON.parse(localStorage.getItem('tasksDB')) || [];
    // console.log(dB);
    const addTaskInput = document.querySelector('#task-input');
    if (addTaskInput.value) {
      // console.log('input filled');
      // console.log(addTaskInput.value);
      // if (localStorage.getItem('tasksDB') === null) {
        // console.log('database empty');
        const index = dB.length + 1;
        const task = new Task(addTaskInput.value, index);
        const newDB = [...dB, task];
        localStorage.setItem('tasksDB', JSON.stringify(newDB));
        TasksUI.checkData();
        TasksUI.loadTasksUI();
      /* } else {
         console.log('database has value');
        const task = new Task(addTaskInput.value, dB.length);
        const newDB = [...dB, task];
        localStorage.setItem('tasksDB', JSON.stringify(newDB));
        TasksUI.checkData();
        TasksUI.loadTasksUI();
       } */
    }
  }
}
