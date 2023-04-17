const todoForm = document.querySelector(".task-form") as HTMLFormElement
const todoList = document.querySelector("ol")
const completeAllBtn = document.getElementById("complete-all-btn") as HTMLButtonElement
const clearCompletedBtn = document.querySelector("#clear-completed-btn") as HTMLButtonElement

const TODO_ARRAY = "TODO_ARRAY"

let todos: TaskTodo[] = []

todoForm.addEventListener("submit", function (e:SubmitEvent) {
    e.preventDefault()

    if (this.taskName.value !== "") {
        const todo: TaskTodo = {
            id: new Date().getTime() % Math.pow(10, 4) ,
            name: this.taskName.value,
            completed: false
        }

        todos.push(todo)

        localStorage.setItem(TODO_ARRAY, JSON.stringify(todos))

        renderTodo(todo)

        todoForm.reset()

    }
})

const renderTodo = (todo: TaskTodo) => {
    const li = document.createElement('li')
    li.setAttribute('id', todo.id.toString())

    li.classList.add("task-container")

    const todoHTML = `
    <input type="checkbox" id="todo-${todo.id}" ${todo.completed ? "checked" : ""}>
    <label for="todo-${todo.id}">
        ${todo.name}
    </label>
    `
    li.innerHTML = todoHTML
    todoList?.appendChild(li)
}

todoList?.addEventListener("input", (e) => {
    let id = 0

    if (e.target) {
        id = Number(e.target.closest("li").id)
        completeTodo(id, e.target)
    }
})

const completeTodo = (id: number, element: any) => {
    todos.forEach((todo, i) => {
        if (todo.id === id) {
            todos[i].completed = element.checked
        }
    })

    localStorage.setItem(TODO_ARRAY, JSON.stringify(todos))
}

completeAllBtn.addEventListener("click", (e) => {
    e.preventDefault()

    todoList!.innerHTML = ''
    
    todos.forEach((todo) => {
        if(!todo.completed) {
            todo.completed = true
        }
        renderTodo(todo)
    })
    

    console.log(todos);

    localStorage.setItem(TODO_ARRAY, JSON.stringify(todos))
})

clearCompletedBtn.addEventListener("click", e => {
    e.preventDefault()

    todoList!.innerHTML = ''

    todos = todos.filter(todos => todos.completed !== true)
    
    todos.filter(todos => todos.completed !== true).forEach(todo => renderTodo(todo))
    
    localStorage.setItem(TODO_ARRAY, JSON.stringify(todos))

})


if (localStorage.length > 0) {
    todos = JSON.parse(localStorage.getItem(TODO_ARRAY) || "")
    todos.forEach(todo => renderTodo(todo))
}