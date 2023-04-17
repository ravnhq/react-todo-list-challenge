const form = document.querySelector(".taskForm");
const list = document.querySelector(".taskColumn");
const clear = () => {
  form.elements.taskName.value = "";
  form.elements.taskHours.value = "";
  form.elements.taskDescription.value = "";
};
const submit = (e) => {
  e.preventDefault();
  let formData = {
    name: form.elements.taskName.value,
    hours: form.elements.taskHours.value,
    description: form.elements.taskDescription.value,
  };
  clear();

  if (localStorage.length > 0) {
    const newEvent = new Event("inserted");
    localStorage.setItem(localStorage.length + 1, JSON.stringify(formData));
    document.dispatchEvent(newEvent);
    return;
  }
  const newEvent = new Event("inserted");
  localStorage.setItem(1, JSON.stringify(formData));
  document.dispatchEvent(newEvent);
  return;
};
const done = (id) => {
  let key = id;
  localStorage.removeItem(key);
  const deleteElement = new Event("deleted");
  document.dispatchEvent(deleteElement);
};

const newtask = (params) => {
  let key = localStorage.length;
  let newTask = JSON.parse(localStorage.getItem(key));
  let div = `<div class="task">
                    <div>
                        <p class="taskHeader">${newTask.name}</p>
                        <hr/>
                    </div>
                    <p class="taskID">${key}</p>
                    <p class="taskHour">The number of hours to complete the task is: ${newTask.hours}</p>
                    <p class="taskDescription">The description of the task is: ${newTask.description}</p>
                    <hr/>
                    <div>
                        <button class="taskDone" name="taskDone" data-id="${key}">Hecho</button>
                    </div>
                    
            </div>`;
  list.insertAdjacentHTML("beforeend", div);
};

const tasks = () => {
  if (localStorage.length < 0) {
    return;
  }
  list.innerHTML = ``;
  for (let i = 0; i < localStorage.length; i++) {
    let task = JSON.parse(localStorage.getItem(i + 1));
    let div = `<div class="task">
                    <div>
                        <h3 class="taskHeader">${task.name}</h3>
                        <hr/>
                    </div>
                    <p class="taskHour">The number of hours to complete the task is: ${
                      task.hours
                    }</p>
                    <p class="taskDescription">The description of the task is: ${
                      task.description
                    }</p>
                    <hr/>
                    <div>
                        <button class="button" name="taskDone" data-id="${
                          i + 1
                        }"">Hecho</button>
                    </div>
                </div>`;
    list.insertAdjacentHTML("beforeend", div);
    console.log(task);
  }
  const doneButtons = document.querySelectorAll(".taskDone");
  doneButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      console.log("click", button);
      done(e.target.dataset.id);
    })
  );
  const clearButton = document.querySelector(".clearButton");
  console.log(clearButton, "button");

  clearButton.addEventListener("click", (e) => {
    localStorage.clear();
    const deleteElement = new Event("deleted");
    document.dispatchEvent(deleteElement);
  });
};

form.addEventListener("submit", submit);
document.addEventListener("inserted", newtask);
window.addEventListener("load", tasks);
document.addEventListener("deleted", tasks);
