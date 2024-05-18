const taskInput = document.getElementById("add_task");
const inputArrow = document.getElementById("input_arrow");
const closeBtn = document.getElementById("modal_close");
const modalBody = document.getElementById("modal_body");
const taskForm = document.getElementById("task_form");
const taskContainer = document.getElementById("task_container");

function toggoleSubmitBtn() {
  if (taskInput.value.trim() !== "") {
    inputArrow.classList.remove("hidden");
  } else {
    inputArrow.classList.add("hidden");
  }
}

function getStoredTasks() {
  const storedTasks = JSON.parse(localStorage.getItem("myTasks")) || [];

  return storedTasks;
}

function displayTasks() {
  const tasks = getStoredTasks();

  if (tasks.length < 1) {
    taskContainer.innerHTML = `<p class="text-center text-white text-2xl font-bold">Please Add you tasks</p>`;
  } else {
    taskContainer.innerHTML = "";
  }

  tasks.map((task) => {
    const div = document.createElement("div");
    div.classList.add(
      "bg-white",
      "p-4",
      "rounded-xl",
      "flex",
      "items-center",
      "gap-8"
    );

    const circleDiv = document.createElement("div");
    circleDiv.classList.add(
      "size-4",
      task.category === "Personal"
        ? "bg-pastel_pink"
        : task.category === "Freelance"
        ? "bg-picton_blue"
        : "bg-sunglow",
      "rounded-full"
    );

    const textContainer = document.createElement("div");
    textContainer.classList.add("flex", "justify-between", "grow");

    const taskText = document.createElement("p");
    taskText.classList.add("text-xl", "text-slate_gray");
    taskText.textContent = task.task;

    const timeText = document.createElement("p");
    timeText.classList.add("text-xl", "text-slate_gray");
    timeText.textContent = task.time;

    textContainer.appendChild(taskText);
    textContainer.appendChild(timeText);

    const span = document.createElement("span");
    span.setAttribute("uniqueId", task.id);
    span.classList.add(
      "text-2xl",
      task.isCompleted ? "text-medium_purple" : "text-gainsboro",
      "cursor-pointer",
      "task_check_btn"
    );

    const icon = document.createElement("i");
    icon.classList.add(
      "fa-regular",
      task.isCompleted ? "fa-circle-check" : "fa-circle",
      "pointer-events-none"
    );

    const deleteBtn = document.createElement("span");
    deleteBtn.setAttribute("uniqueId", task.id);
    deleteBtn.classList.add(
      "text-2xl",
      "cursor-pointer",
      "text-red-400",
      "task_delete_btn"
    );

    deleteBtn.innerHTML = `<i class="fa-solid fa-delete-left pointer-events-none"></i>`;

    span.appendChild(icon);

    div.appendChild(circleDiv);
    div.appendChild(textContainer);
    div.appendChild(span);
    div.appendChild(deleteBtn);

    taskContainer.appendChild(div);

    const checkbox = document.querySelectorAll(".task_check_btn");
    checkbox.forEach((task) => {
      task.addEventListener("click", handleTaskCheck, true);
    });

    const deleteBtns = document.querySelectorAll(".task_delete_btn");
    deleteBtns.forEach((task) => {
      task.addEventListener("click", handleDelete, true);
    });
  });
}

function handleTaskCheck(e) {
  e.stopPropagation();

  const id = e.target.getAttribute("uniqueId");
  const tasks = getStoredTasks();
  const selectedtask = tasks.find((task) => task.id === id);
  selectedtask.isCompleted = !selectedtask.isCompleted;

  const restTasks = tasks.filter((task) => task.id !== id);

  const newTasks = [selectedtask, ...restTasks];
  localStorage.setItem("myTasks", JSON.stringify(newTasks));
  displayTasks();
}

function handleDelete(e) {
  e.stopPropagation();
  const id = e.target.getAttribute("uniqueId");
  const tasks = getStoredTasks();
  const restTasks = tasks.filter((task) => task.id !== id);
  localStorage.setItem("myTasks", JSON.stringify(restTasks));
  displayTasks();
}
