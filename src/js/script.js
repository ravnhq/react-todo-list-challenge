const CREATE_MODE = 'create';
const EDIT_MODE = 'edit';

let mode = CREATE_MODE;

const modeStorage = new StorageWrapper('mode');

const selectedTaskStorage = new StorageWrapper('selected_task', true);

const taskStorage = new StorageWrapper('tasks', true);

const tasksDoneStorage = new StorageWrapper('tasks_done');

const updateElements = (task = null) => {
  let modeTitleElement = document.getElementById('mode-title');
  let arrowElement = document.getElementById('arrow-content');
  let formButtonElement = document.getElementById('form-button');
  let cancelLinkElement = document.getElementById('cancel-link');
  let modeStatusElement = document.getElementById('mode-status');

  if (modeStorage.getValue() === EDIT_MODE) {
    modeTitleElement.innerText = `Editing Task: ${task.title}`;
    arrowElement.innerText = '<';
    fillTaskForm(task);
    formButtonElement.value = 'Edit';
    cancelLinkElement.classList.remove('hide');
    modeStatusElement.innerText = 'EDIT_MODE';
  } else {
    modeTitleElement.innerText = 'Add Task';
    arrowElement.innerText = '>';
    formButtonElement.value = 'Add';
    cancelLinkElement.classList.add('hide');
    modeStatusElement.innerText = 'CREATE_MODE';
  }
};

const updateTasksDoneMessage = (doneTasks, allTasks) => {
  let taskDoneMessageElement = document.getElementById('tasks-done-msg');
  taskDoneMessageElement.innerText = `${doneTasks}/${allTasks} tasks done`;
};

const editTask = (id) => {
  const task = getTaskById(id);

  if (!task) return;

  modeStorage.setValue(EDIT_MODE, updateElements, task);
  selectedTaskStorage.setValue(task);
};

const deleteTask = (id) => {
  let tasks = taskStorage.getValue();
  let taskIndex = tasks.findIndex((item) => item.id === id);

  let tasksDone = tasksDoneStorage.getValue();

  tasks[taskIndex].done = true;
  taskStorage.setValue(tasks, renderTasks, tasks);

  tasksDoneStorage.setValue(tasksDone + 1);
};

document.addEventListener('DOMContentLoaded', () => {
  const selectedTaskId = selectedTaskStorage.getValue();
  updateElements(selectedTaskId);
  if (taskStorage.getValue() === null) {
    taskStorage.setValue([]);
  } else {
    fetchAndRenderTasks();
  }

  if (tasksDoneStorage.getValue() === null) {
    tasksDoneStorage.setValue(0);
  }
});

const priorityMap = {
  1: 'low',
  2: 'medium',
  3: 'high',
};

const fillTaskForm = (task) => {
  let formInnerElements = document.getElementById('task-create-form').elements;
  formInnerElements['task-title'].value = task.title;
  formInnerElements['task-description'].value = task.description;
  formInnerElements['task-priority'].value = task.priority;
};

const renderTasksOnElementId = (tasks, elementId) => {
  const taskContainerElement = document.getElementById(elementId);
  const tasksHTML = tasks
    .sort((a, b) => b.priority - a.priority)
    .filter((item) => !item.done)
    .reduce(
      (taskString, task) =>
        taskString +
        `
  <div class="task ${priorityMap[task.priority]}-priority">
    <div class="task-title">
      <h3>${task.title}</h3>
    </div>
    <div class="task-content">
      <span
        >${task.description}</span
      >
    </div>
    <div class="task-footer">
      <div class="task-action tooltip" onclick="editTask(${task.id})">
        ✏️
      </div>
      <div class="vl"></div>
      <div class="task-action tooltip" onclick="deleteTask(${task.id})">
        ✅
      </div>
    </div>
  </div>
  `,
      ''
    );
  taskContainerElement.innerHTML = tasksHTML;
};

const fetchTasks = () => {
  return taskStorage.getValue();
};

const getTasksDone = (tasks) => {
  return tasks.filter((task) => task.done).length;
};

const renderTasks = (tasks) => {
  renderTasksOnElementId(tasks, 'tasks-container');
  let tasksDone = getTasksDone(tasks);
  updateTasksDoneMessage(tasksDone, tasks.length);
};

const fetchAndRenderTasks = () => {
  let tasks = fetchTasks();
  renderTasks(tasks);
};

const getTaskById = (id) => {
  let tasks = fetchTasks();
  return tasks.find((item) => item.id === id);
};

const getNewTaskId = () => {
  return Date.now();
};

const submitEditTask = (tasks, task) => {
  let selectedTask = selectedTaskStorage.getValue();

  let index = tasks.findIndex((item) => item.id === selectedTask.id);

  if (index === -1) return;

  Object.assign(tasks[index], task);
  modeStorage.setValue(CREATE_MODE, updateElements);
};

const submitCreateTask = (tasks, task) => {
  const newTaskId = getNewTaskId();

  let existTask = !!tasks.find((item) => item.title === task.title && !item.done);
  if (existTask) {
    let stillCreate = confirm(
      "There's a task with the same title. Do you still want to create it?"
    );

    if (!stillCreate) return;
  }
  task.id = newTaskId;
  tasks.unshift(task);
};

document
  .getElementById('task-create-form')
  .addEventListener('submit', (event) => {
    event.preventDefault();

    const formElement = event.target;
    const formInnerElements = formElement.elements;
    const currentMode = modeStorage.getValue();

    let tasks = fetchTasks();

    let task = {
      title: formInnerElements['task-title'].value,
      description: formInnerElements['task-description'].value,
      priority: parseInt(formInnerElements['task-priority'].value),
    };

    if (Number.isNaN(task.priority)) {
      alert('Please assign the priority to the task.');
      return;
    }
    console.log('Sbumit mode', tasks, task);

    if (currentMode === EDIT_MODE) {
      // edit
      submitEditTask(tasks, task);
    } else {
      // create
      submitCreateTask(tasks, task);
    }

    // save
    taskStorage.setValue(tasks);
    renderTasks(tasks);

    formElement.reset();
  });

document.getElementById('clear-button').addEventListener('click', (event) => {
  taskStorage.setValue([]);
  fetchAndRenderTasks();
});

document.getElementById('cancel-link').addEventListener('click', (event) => {
  let formElement = document.getElementById('task-create-form');
  formElement.reset();
  modeStorage.setValue(CREATE_MODE, updateElements);
});
