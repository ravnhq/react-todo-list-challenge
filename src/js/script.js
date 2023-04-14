function action(x) {
  console.log("Action: ", x);
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks") === null) {
    localStorage.setItem("tasks", JSON.stringify([]));
  }
});

const renderTasksOnElementId = (tasks, elementId) => {
  const taskContainerElement = document.getElementById(elementId);
  const tasksHTML = tasks.reduce(
    (acc, curr, idx) =>
      acc +
      `
  <div class="task ${curr.priority}-priority">
    <div class="task-title">
      <h3>${curr.title}</h3>
    </div>
    <div class="task-content">
      <span
        >${curr.description}</span
      >
    </div>
    <div class="task-footer">
      <div class="task-action tooltip" onclick="action('edit')">
        ✏️
      </div>
      <div class="vl"></div>
      <div class="task-action tooltip" onclick="action('delete')">
        ✅
      </div>
    </div>
  </div>
  `,
    ""
  );
  console.log(tasksHTML)
  taskContainerElement.innerHTML = tasksHTML;
};

document
  .getElementById("task-create-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    let formElements = event.target.elements;

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    let task = {
      title: formElements["task-title"].value,
      description: formElements["task-description"].value,
      priority: formElements["task-priority"].value,
    };

    tasks.push(task);

    localStorage.setItem("tasks", JSON.stringify(tasks))

    renderTasksOnElementId(tasks, "tasks-container");
  });
