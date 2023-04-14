function action(x) {
  console.log("Action: ", x);
}

document
  .getElementById("task-create-form")
  .addEventListener("submit", (event) => {
    event.preventDefault();
    console.log(event);
  });
