// HTML Elements
const inputTaskEl = document.querySelector(".inputTask");
const addTaskBtn = document.querySelector(".addTaskBtn");
const remainingEl = document.querySelector(".remaining");
const completedEl = document.querySelector(".completed");
const totalEl = document.querySelector(".total");
const taskListEl = document.querySelector(".taskList");

const tasks = [];

// Display tasks in UI
const displayTasks = function () {
  // Clear container
  taskListEl.innerHTML = "";

  // Generate the HTML for each task
  tasks.forEach((task) => {
    const html = `<div class="flex items-center bg-slate-200 justify-between px-10 py-5 rounded-md w-3/4 mb-5 taskItem ">
      <div class="flex gap-3 items-center">
        <input
          type="checkbox"
          name="taskCheck"
          class="appearance-none w-8 h-8 rounded-full text-blue-300 focus:ring-0 taskCheckbox"
          data-id="${task.id}"
        />
        <p class="text-lg text-slate-900 ${
          task.completed ? "line-through" : ""
        } taskDescription">${task.description}</p>
      </div>
      <button>
        <ion-icon
          name="close-outline"
          class="text-2xl block text-slate-500 taskClose"
          data-id="${task.id}"
        ></ion-icon>
      </button>
    </div>`;

    taskListEl.insertAdjacentHTML("beforeend", html);
  });

  // Update remaining label
  const updateRemaining = function () {
    const remainingTasks = tasks.filter(
      (task) => task.completed === false
    ).length;
    remainingEl.textContent = remainingTasks;
  };

  // Update completed label
  const updateCompleted = function () {
    const completedTasks = tasks.filter((task) => task.completed).length;
    completedEl.textContent = completedTasks;
  };

  // Update total label
  const updateTotal = function () {
    const totalTasks = tasks.length;
    totalEl.textContent = totalTasks;
  };

  // Update all
  const updateLabels = function () {
    updateRemaining();
    updateCompleted();
    updateTotal();
  };

  // Add event listeners to task close buttons
  document.querySelectorAll(".taskClose").forEach((icon) => {
    const taskId = icon.getAttribute("data-id");
    icon.addEventListener("click", () => {
      const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
      if (taskIndex !== -1) {
        tasks[taskIndex].deleteTask();
      }
    });
  });

  // Add event listeners to task complete checkboxes
  document.querySelectorAll(".taskCheckbox").forEach((task) => {
    const taskId = task.getAttribute("data-id");
    task.addEventListener("change", () => {
      const taskIndex = tasks.findIndex((task) => task.id === Number(taskId));
      if (task.checked) {
        tasks[taskIndex].completed = true;
        task.parentElement
          .querySelector(".taskDescription")
          .classList.add("line-through");
        updateLabels();
      } else {
        tasks[taskIndex].completed = false;
        task.parentElement
          .querySelector(".taskDescription")
          .classList.remove("line-through");
        updateLabels();
      }
    });
  });

  // Update labeles (remaining, completed, total)
  updateLabels();
};

displayTasks();

// Add task
addTaskBtn.addEventListener("click", (e) => {
  e.preventDefault();

  if (inputTaskEl.value !== "") {
    // Add task to list
    const task = {
      id: Date.now(),
      description: inputTaskEl.value,
      completed: false,
      deleteTask() {
        const taskIndex = tasks.indexOf(this);
        tasks.splice(taskIndex, 1);
        displayTasks();
      },
    };
    tasks.push(task);

    // Clear input field
    inputTaskEl.value = "";

    // Clear taskListEl & Update UI
    taskListEl.innerHTML = "";

    // Display task in the UI
    displayTasks();
  }
});
