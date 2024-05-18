displayTasks();
taskInput.addEventListener("input", toggoleSubmitBtn);
taskInput.addEventListener("focus", toggoleSubmitBtn);

inputArrow.addEventListener("click", () => {
  modalBody.classList.remove("hidden");
});

closeBtn.addEventListener("click", () => {
  modalBody.classList.add("hidden");
});

taskForm.addEventListener("submit", (e) => {
  const uniqueId = Math.ceil(Math.random() * 10000000).toString(16);
  console.log(uniqueId);
  e.preventDefault();
  const taskCategory = document.querySelector(
    `input[name="task_category"]:checked`
  ).value;

  const time = e.target.task_time.value;
  const task = taskInput.value;

  const newTask = {
    id: uniqueId,
    task,
    isCompleted: false,
    time,
    category: taskCategory,
  };

  const storedTask = getStoredTasks();

  storedTask.push(newTask);

  localStorage.setItem("myTasks", JSON.stringify(storedTask));
  modalBody.classList.add("hidden");
  taskInput.value = "";
  displayTasks();
  e.target.reset();
});
