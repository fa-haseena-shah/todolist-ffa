let tasks = []

const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");

placeDate();

function placeDate(){
    const date = new Date().toDateString();
    const dateElement = document.getElementById("date");
    dateElement.textContent = date;
}

function createElement(task){
    const li = document.createElement('li');
    li.innerHTML = 
    `
    <div class="task">
    <label class="task-line">
        <input type="checkbox">
        <span class="task-text"></span>
        <button class="delete-btn">x</button>
    </label>
    </div>
    `
    li.querySelector(".task-text").textContent = task; // all the innerHTML we coded was within <li> tags so we use li.querySelector
    li.querySelector(".task-text").contentEditable = "true"; // allows to edit the task once its written, only the li tag
    
    li.querySelector(".delete-btn").addEventListener("click", function() {
        deleteTask(li);
    });

    li.querySelector("input[type='checkbox']").addEventListener("change", (event) =>{
        if(event.currentTarget.checked){
            checkTask(li)
        }
        else{
            uncheckTask(li)
        }
    })

    return li;
}

function addTask(){
    const task = taskInput.value.trim();
    if (task === "") {
        alert("Cannot add without task!")
        return;
    }
    const li = createElement(task);
    tasks.unshift(task); // adding task to the array
    taskList.appendChild(li);
    taskInput.value = "";
}

function deleteTask(li) {
    const taskContent = li.querySelector(".task-text").textContent; 
    const taskIndex = tasks.indexOf(taskContent);
    console.log(taskIndex);
    if (taskIndex > -1) {
        tasks.splice(taskIndex, 1);
    }
    li.remove();
}

function checkTask(li){
    const taskLine = li.querySelector(".task-line");
    taskLine.classList.add("checked");
}

function uncheckTask(li) {
    const taskLine = li.querySelector(".task-line");
    taskLine.classList.remove("checked");
}

taskInput.addEventListener("keydown", function(e) {
    if(e.key === "Enter") {
        e.preventDefault() // stops page from reloading
        addTask();           
    }
})
