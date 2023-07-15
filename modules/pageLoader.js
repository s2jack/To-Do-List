import TasksUI from './tasksUI.js';

const section = document.querySelector('#appUI');

export default class PageLoader {
  loadDefault = () => {
    // Add heading
    const listHeading = document.createElement('h2');
    listHeading.className = 'headingUI';
    listHeading.innerText = `Today's To Do Task List`; // eslint-disable-line quotes
    section.appendChild(listHeading);
    // Add Task Input Elements
    const addTaskInputContainer = document.createElement('div');
    addTaskInputContainer.className = 'addTaskBar';
    section.appendChild(addTaskInputContainer);
    const addTaskInput = document.createElement('input');
    addTaskInput.id = 'task-input';
    addTaskInput.type = 'text';
    addTaskInput.placeholder = 'Add your task...';
    addTaskInputContainer.appendChild(addTaskInput);
    addTaskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        // console.log('pressed Enter');
        // TasksUI.addTask();
      }
    });
    const tasksUI = document.createElement('div');
    tasksUI.id = 'taskUI';
    section.appendChild(tasksUI);
    TasksUI.checkData();
    TasksUI.loadTasksUI();
    // Clear button
    const clearButton = document.createElement('button');
    clearButton.id = 'clear-button';
    clearButton.className = 'clear-button';
    clearButton.innerText = 'Clear all completed';
    section.appendChild(clearButton);
  };
}
