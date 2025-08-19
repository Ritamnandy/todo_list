
const btn = document.getElementById('btn');
const userinput = document.getElementById('taskInput');
const tasklist = document.getElementById('taskList');

// Load saved tasks from localStorage
window.onload = loadtasks;

btn.addEventListener('click', function(){
    if(userinput.value.trim() == ''){
        alert("Please Enter a Task.");
        return;
    }
    addtask(userinput.value.trim());
    savetasks();
    userinput.value = '';
});

// Add Task Function
function addtask(tasktext){
    let li = document.createElement('li');
    console.log(li);
    
    let span = document.createElement('span');
    span.textContent = tasktext;


    // Edit button
    let editbtn = document.createElement('button');
    editbtn.className ='edit';
    editbtn.textContent = "Edit";
    editbtn.onclick = function() {
        let newtask = prompt("Edit your Task:- ");
        if(newtask != null && newtask.trim() != ''){
            span.textContent = newtask.trim();
            savetasks();
        }
    }

    // Delete button
    let del = document.createElement('button');
    del.className ='delete';
    del.textContent = "X";
    del.onclick = function(){
        li.remove();
        savetasks();
    }

    let div = document.createElement('div');
    div.appendChild(editbtn);
    div.appendChild(del);

    li.appendChild(span);
    li.appendChild(div);
    tasklist.appendChild(li);
}

// Save tasks in localStorage
function savetasks(){
    let tasks = [];
    tasklist.querySelectorAll('li span').forEach(span => {
        tasks.push(span.textContent);
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Load tasks from localStorage
function loadtasks(){
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => addtask(task));
}
