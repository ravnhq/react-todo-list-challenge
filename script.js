const form = document.querySelector(".taskForm");
const list = document.querySelector(".taskColumn");
const clear = () => {
  form.elements.taskName.value = "";
  form.elements.taskHours.value = "";
  form.elements.taskDescription.value = "";
};
//ready
const submit = (e) => {
  e.preventDefault();
  let formData = {
    name: form.elements.taskName.value,
    hours: form.elements.taskHours.value,
    description: form.elements.taskDescription.value,
  };
  clear();
  let Tasks = localStorage.getItem("Tasks");
  const newEvent = new Event("inserted");
  if (Tasks === null) {
    let tasks = [formData];
    localStorage.setItem("Tasks", [JSON.stringify(tasks)]);
    document.dispatchEvent(newEvent);
    return;
  }
  let tasks = JSON.parse(localStorage.getItem("Tasks"));
  tasks.push(formData);
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  document.dispatchEvent(newEvent);
  return;
};

const done = (id) => {
  const deleteElement = new Event("deleted");
  let key = id;
  let tasks = JSON.parse(localStorage.getItem("Tasks"));
  tasks.splice(id, 1);
  //let result = [...tasks.slice(0, id), ...tasks.slice(id + 1)];
  localStorage.setItem("Tasks", JSON.stringify(tasks));
  document.dispatchEvent(deleteElement);
};

//ready
const newtask = () => {
  let tasks = JSON.parse(localStorage.getItem("Tasks"));
  let newTask = tasks.slice(-1);
  // let div = document.createElement("div");
  // div.classList.add("task");
  // div.innerHTML = `
  //             <div>
  //               <p class="taskHeader">${newTask[0].name}</p>
  //               <hr/>
  //             </div>
  //             <p class="taskHour">The number of hours to complete the task is: ${
  //               newTask[0].hours
  //             }</p>
  //             <p class="taskDescription">The description of the task is: ${
  //               newTask[0].description
  //             }</p>
  //             <hr/>
  //             <div>
  //               <button class="button taskDone" onclick="done(${
  //                 tasks.length - 1
  //               })"  name="taskDone" data-id="${
  //   tasks.length - 1
  // }">Hecho</button>
  //             </div>`;
  list.appendChild(
    makeTask(
      newTask[0].name,
      newTask[0].hours,
      newTask[0].description,
      tasks.length - 1
    )
  );
};

//ready
const tasks = () => {
  let tasks = JSON.parse(localStorage.getItem("Tasks"));
  list.innerHTML = ``;
  if (tasks === null) {
    return;
  }
  const fragment = new DocumentFragment();
  tasks.forEach((task, index) => {
    fragment.appendChild(
      makeTask(task.name, task.hours, task.description, index)
    );
  });
  list.appendChild(fragment);
  const doneButtons = document.querySelectorAll(".taskDone");
  doneButtons.forEach((button) =>
    button.addEventListener("click", (e) => {
      console.log(e.target.dataset.id, "asd");
      done(e.target.dataset.id);
    })
  );
};

const clearButton = document.querySelector(".clearButton");
clearButton.addEventListener("click", (e) => {
  const deleteElement = new Event("deleted");
  localStorage.clear();
  document.dispatchEvent(deleteElement);
});

form.addEventListener("submit", submit);
document.addEventListener("inserted", newtask);
window.addEventListener("load", tasks);
document.addEventListener("deleted", tasks);

const makeTask = (name, hours, description, key) => {
  let div = document.createElement("div");
  div.classList.add("task");
  div.innerHTML = `
                  <div>
                    <h3 class="taskHeader">${name}</h3>
                    <hr/>
                  </div>
                  <p class="taskHour">The number of hours to complete the task is: ${hours}</p>
                 <p class="taskDescription">The description of the task is: ${description}</p>
                  <hr/>
                  <div>
                    <button class="button taskDone" name="taskDone" data-id="${key}"">Hecho</button>
                  </div>`;
  return div;
};
