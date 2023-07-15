import _ from 'lodash'; // eslint-disable-line no-unused-vars
// import Task from './taskClass.js';

export default class TasksUI {
  static checkData = () => {
    // console.log('checking database')
    // console.log(localStorage.getItem('tasksDB') == '[]')
    if (
      localStorage.getItem('tasksDB') === null
      || localStorage.getItem('tasksDB') === '[]'
    ) {
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
      tasksUIelement.innerText = 'Please add ani friends to interact';
      tasksUIelement.className = 'warn-message flex';
    } else {
      const tasksUIelement = document.querySelector('#taskUI');
      tasksUIelement.style = 'height: 80%;';
      tasksUIelement.innerText = '';
      tasksUIelement.className = '';
      // console.log('you have data on your LcStr');
      const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB'));
      tasksDbInstance
        // .filter((task) => task.completed !== true)
        .forEach((task) => {
          // console.log(task);
          const taskContainer = document.createElement('div');
          taskContainer.className = 'list-element flex';
          taskContainer.id = `${task.id}`;
          tasksUIelement.appendChild(taskContainer);
          const taskToogle = document.createElement('input');
          taskToogle.type = 'checkbox';
          taskToogle.className = 'task';
          taskToogle.checked = false;
          taskToogle.id = `toogle${task.id}`;
          taskContainer.appendChild(taskToogle);
          const taskTitle = document.createElement('input');
          taskTitle.className = 'task-title-text';
          if (task.completed) {
            taskToogle.checked = true;
            taskTitle.style = 'text-decoration-line: line-through;';
          } else {
            taskToogle.checked = false;
            taskTitle.style = '';
          }
          taskTitle.id = `title${task.id}`;
          taskTitle.value = task.description;
          taskContainer.appendChild(taskTitle);

          taskTitle.addEventListener('change', (event) => {
            if (taskTitle.value !== task.description) {
              event.preventDefault();
              // console.log('pressed Enter');
              this.editTask(event);
            }
          });

          taskToogle.addEventListener('change', (event) => {
            // console.log(event);
            // console.log(event.target.id);
            // const order = event.target.id - 1
            const dBInstance = JSON.parse(localStorage.getItem('tasksDB'));
            // console.log(dBInstance);
            const elementID = document.querySelector(`#${event.target.id}`)
              .parentElement.id;
            const taskElement = dBInstance.find(
              (elem) => elem.id === elementID,
            );
            // console.log(taskElement);
            if (taskElement.completed) {
              // console.log('checking task is complete');
              taskToogle.checked = false;
              taskElement.completed = false;
              localStorage.setItem('tasksDB', JSON.stringify(dBInstance));
              TasksUI.loadTasksUI();
            } else {
              taskToogle.checked = true;
              taskElement.completed = true;
              localStorage.setItem('tasksDB', JSON.stringify(dBInstance));
              TasksUI.loadTasksUI();
            }
          });
        });
    }
  };

  // static removeTask(event) {
  //   const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB')) || [];
  //   const order = parseInt(event.target.id, 10) - 1;
  //   tasksDbInstance.splice(order, 1);
  //   localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
  //   tasksDbInstance.forEach((element) => {
  //     // console.log(element)
  //     if (element.index - 1 >= order) {
  //       element.index -= 1;
  //       // console.log(element.index);
  //     }
  //   });
  //   localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
  //   TasksUI.loadTasksUI();
  // }

  static editTask(event) {
    // console.log('edited');
    const tasksDbInstance = JSON.parse(localStorage.getItem('tasksDB')) || [];
    // console.log(tasksDbInstance);
    // console.log(event.target.id);
    // const order = parseInt(event.target.id, 10) - 1;
    // console.log(order);
    // console.log(tasksDbInstance[order]);
    const elementInput = document.querySelector(`#${event.target.id}`);
    const elementID = elementInput.parentElement.id;
    // console.log(elementID);
    const element = tasksDbInstance.find((elem) => elem.id === elementID);
    // console.log(tasksDbInstance[order]);
    element.description = elementInput.value;
    localStorage.setItem('tasksDB', JSON.stringify(tasksDbInstance));
    // console.log(tasksDbInstance);
    TasksUI.loadTasksUI();
  }
}
