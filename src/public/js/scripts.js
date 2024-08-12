// Get elements from the DOM
const todoInput = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");

const API_URL = "http://localhost:3000/todos";

// Fetch tasks from the database
async function fetchTasks() {
  const response = await fetch(API_URL);
  const tasks = await response.json();
  tasks.forEach((task) => addTaskToDOM(task));
}

// Add task function
async function addTask() {
  const taskText = todoInput.value.trim();

  if (taskText !== "") {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text: taskText }),
    });

    const newTask = await response.json();
    addTaskToDOM(newTask);

    todoInput.value = "";
  }
}

// Delete task function
async function deleteTask(taskId, li) {
  await fetch(`${API_URL}/${taskId}`, {
    method: "DELETE",
  });

  todoList.removeChild(li);
}

// Helper function to add a task to the DOM
function addTaskToDOM(task) {
  const li = document.createElement("li");
  li.textContent = task.text;

  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";
  deleteBtn.onclick = () => deleteTask(task._id, li);

  li.appendChild(deleteBtn);
  todoList.appendChild(li);
}

// Initial fetch of tasks
fetchTasks();

addBtn.addEventListener("click", addTask);
todoInput.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    addTask();
  }
});
