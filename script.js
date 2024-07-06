document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("new-task");
  const addTaskButton = document.getElementById("add-task");
  const taskList = document.getElementById("task-list");

  addTaskButton.addEventListener("click", addTask);
  taskList.addEventListener("click", handleTaskAction);
  taskList.addEventListener("keypress", handleSubTaskInput);

  function addTask() {
    const taskText = taskInput.value.trim();

    if (taskText === "") {
      alert("Please enter a task.");
      return;
    }

    const li = document.createElement("li");
    li.classList.add("to-do");
    li.innerHTML = `
            <div class="task-group">
                <div class="title-container">
                    <span class="task-title">${taskText}</span>
                    <button class="delete-task">Delete</button>
                </div>
                <ul class="sub-task-list">
                    <li>
                        <input type="text" class="sub-task-input" placeholder="Add sub-task">
                    </li>
                </ul>
            </div>
        `;

    taskList.appendChild(li);
    taskInput.value = "";
  }

  function handleTaskAction(e) {
    if (e.target.classList.contains("delete-task")) {
      const taskItem = e.target.closest("li");
      taskList.removeChild(taskItem);
    } else if (e.target.classList.contains("sub-task-checkbox")) {
      const subTaskItem = e.target.closest("li");
      subTaskItem.classList.toggle("completed");
    }
  }

  function handleSubTaskInput(e) {
    if (e.target.classList.contains("sub-task-input") && e.key === "Enter") {
      const subTaskText = e.target.value.trim();
      if (subTaskText) {
        const subTaskLi = document.createElement("li");
        subTaskLi.innerHTML = `
                    <label>
                        <input type="checkbox" class="sub-task-checkbox">
                        <span>${subTaskText}</span>
                    </label>
                `;
        e.target.closest("ul").insertBefore(subTaskLi, e.target.closest("li"));
        e.target.value = "";
      }
    }
  }
});
