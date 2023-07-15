import TasksUI from './tasksUI.js';
import AddTask from './addTask.js';
import RemoveTask from './removeTask.js';

const section = document.querySelector('#appUI');

export default class PageLoader {
  loadDefault = () => {
    // Add heading
    const listHeading = document.createElement('h2');
    listHeading.className = 'headingUI flex';
    listHeading.innerText = `Here's your ani-friends`; // eslint-disable-line quotes
    section.appendChild(listHeading);
    // Add Task Input Elements
    const addTaskInputContainer = document.createElement('div');
    addTaskInputContainer.className = 'addTaskBar';
    section.appendChild(addTaskInputContainer);
    const addTaskInput = document.createElement('input');
    addTaskInput.id = 'task-input';
    addTaskInput.type = 'text';
    addTaskInput.placeholder = 'Add any Ani to your list';
    addTaskInputContainer.appendChild(addTaskInput);
    addTaskInput.addEventListener('keypress', (event) => {
      if (event.key === 'Enter') {
        event.preventDefault();
        AddTask.addThis();
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

    clearButton.addEventListener('click', (event) => {
      event.preventDefault();
      RemoveTask.removeThis();
    });
  };
}
