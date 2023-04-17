let storedTodos;
function validateTodoForm(values) {
    const errors = {};
    if (values.description.length === 0) {
        errors.description = 'TODO name is required';
    }
    return errors;
}
const refreshLocalStorage = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
    storedTodos = JSON.stringify(todos);
};
const removeTodo = (item) => {
    const savedTodos = JSON.parse(storedTodos);
    const index = savedTodos.findIndex(obj => String(obj.id) === item.target.id);
    savedTodos.splice(index, 1);
    refreshLocalStorage(savedTodos);
    loadAllTodos();
};
const processCheckbox = (item) => {
    const savedTodos = JSON.parse(storedTodos);
    const updateTodo = savedTodos.find((obj) => String(obj.id) === item.target.id);
    updateTodo.status = item.target.checked;
    refreshLocalStorage(savedTodos);
    loadAllTodos();
};
const configureEvents = () => {
    const checkBoxes = document.querySelectorAll('ul > li > input[type="checkbox"');
    const removeButtons = document.querySelectorAll('ul > li > button');
    checkBoxes.forEach((item) => {
        item.addEventListener('click', (element) => {
            processCheckbox(element);
        });
    });
    removeButtons.forEach((item) => {
        item.addEventListener('click', (element) => {
            removeTodo(element);
        });
    });
};
const loadAllTodos = () => {
    const pendingTodoList = document.querySelector('#pending-todo-list');
    const doneTodoList = document.querySelector('#done-todo-list');
    const doneCounter = document.querySelector('#done-span');
    const allCounter = document.querySelector('#all-span');
    if (pendingTodoList != undefined)
        pendingTodoList.innerHTML = '';
    if (doneTodoList != undefined)
        doneTodoList.innerHTML = '';
    storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
        const savedTodos = JSON.parse(storedTodos);
        let done = 0;
        savedTodos.forEach(item => {
            const newTodo = document.createElement('li');
            const checkBoxTodo = document.createElement('input');
            const labelTodo = document.createElement('label');
            const removeTodo = document.createElement('button');
            labelTodo.textContent = item.description;
            removeTodo.textContent = 'X';
            removeTodo.className = 'remove-todo';
            removeTodo.id = String(item.id);
            checkBoxTodo.type = 'checkbox';
            checkBoxTodo.id = String(item.id);
            checkBoxTodo.checked = item.status;
            newTodo.appendChild(checkBoxTodo);
            newTodo.appendChild(labelTodo);
            newTodo.appendChild(removeTodo);
            if (item.status) {
                doneTodoList.appendChild(newTodo);
                done++;
            }
            else {
                pendingTodoList.appendChild(newTodo);
            }
        });
        doneCounter.textContent = String(done);
        allCounter.textContent = String(savedTodos.length);
        configureEvents();
    }
};
const removeAllTodos = () => {
    localStorage.clear();
    localStorage.setItem("todos", JSON.stringify([]));
    loadAllTodos();
};
const removeDoneTodos = () => {
    const savedTodos = JSON.parse(storedTodos);
    const updateTodos = savedTodos.filter((obj) => String(obj.status) === 'false');
    refreshLocalStorage(updateTodos);
    loadAllTodos();
};
const configureDeleteButtons = () => {
    const removeDoneBtn = document.querySelector('#remove-done-btn');
    const removeAllBtn = document.querySelector('#remove-all-btn');
    removeDoneBtn.addEventListener('click', function () {
        removeDoneTodos();
    });
    removeAllBtn.addEventListener('click', function () {
        removeAllTodos();
    });
};
const formLoader = () => {
    const form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const savedTodos = JSON.parse(storedTodos);
        const nameTodo = document.querySelector('#todo-name');
        const formData = {
            description: nameTodo.value,
            id: savedTodos.length + 1,
            status: false
        };
        const errors = validateTodoForm(formData);
        if (Object.keys(errors).length === 0) {
            savedTodos.push(formData);
            nameTodo.value = '';
            refreshLocalStorage(savedTodos);
            loadAllTodos();
        }
        else {
            alert(errors.description);
        }
    });
};
const init = () => {
    if (localStorage.length === 0)
        refreshLocalStorage([]);
    formLoader();
    loadAllTodos();
    configureDeleteButtons();
};
init();
