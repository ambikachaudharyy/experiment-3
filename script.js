let input = document.querySelector("#taskInput");
let addBtn = document.querySelector("#addBtn");
let taskList = document.querySelector("#taskList");
let message = document.querySelector("#message");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function displayTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");
        li.textContent = task.text;

        if (task.completed) {
            li.classList.add("completed");
        }

        let completeBtn = document.createElement("button");
        completeBtn.textContent = "Complete";

        completeBtn.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "Delete";

        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.append(completeBtn, deleteBtn);
        taskList.appendChild(li);
    });
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    displayTasks();
}

addBtn.addEventListener("click", function () {
    let value = input.value.trim();

    if (value === "") {
        message.textContent = "Please enter a task!";
        return;
    }

    message.textContent = "";

    tasks.push({
        text: value,
        completed: false
    });

    input.value = "";
    saveTasks();
});

displayTasks();