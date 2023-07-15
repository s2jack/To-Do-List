import _ from 'lodash'; // eslint-disable-line no-unused-vars
import Task from './taskClass.js';

export default class TasksUI {
  static checkData = () => {
    // console.log('checking database')
    // console.log(localStorage.getItem('tasksDB') == '[]')
    if (localStorage.getItem('tasksDB') === null || localStorage.getItem('tasksDB') === '[]') {
      // console.log(localStorage.getItem('tasksDB'));
      return false;
    }
    return true;
  };

  static loadTasksUI = () => {
    // console.log(this.checkData());
    // console.log('dataBase checking before loading Tasks UI')
    if (this.checkData() === false || this.checkData() === null) {
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
          taskToogle.id = `${task.index}`;
          taskContainer.appendChild(taskToogle);
          const taskTitle = document.createElement('input');
          taskTitle.className = 'task-title-text';
          taskTitle.id = `${task.index}`;
          taskTitle.value = task.description;
          taskContainer.appendChild(taskTitle);

          taskTitle.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') {
              event.preventDefault();
              // console.log('pressed Enter');
              this.editTask(event);
            }
          });
          taskToogle.addEventListener('change', this.removeTask);
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

  static removeTask(event) {
    const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB')) || [];
    const order = parseInt(event.target.id, 10) - 1;
    tasksDbInstance.splice(order, 1);
    localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
    tasksDbInstance.forEach((element) => {
      // console.log(element)
      if (element.index - 1 >= order) {
        element.index -= 1;
        // console.log(element.index);
      }
    });
    localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
  }

  static editTask(event) {
    const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB')) || [];
    // console.log(tasksDbInstance);
    // console.log(event.target);
    const order = parseInt(event.target.id, 10) - 1;
    // console.log(order);
    // console.log(tasksDbInstance[order]);
    const elementInput = document.getElementsByClassName('task-title-text')[order];
    tasksDbInstance[order]['description'] = elementInput.value;
    // console.log(tasksDbInstance[order]);
    localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
    // console.log(tasksDbInstance);
  }
}
