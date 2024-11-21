document.addEventListener("DOMContentLoaded", () => {
    const storageTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storageTasks){
        storageTasks.forEach((task) => task.push(task))
        updateTaskList();
        updateStats();
    }
})

let tasks = [];

const saveTasks = () => {
    localStorage.setItem('tasks',JSON.stringify(tasks));
}

const addTask = () => {
    const taskInput = document.getElementById('taskInput');
    const text = taskInput.value.trim();

    if(text) {
        tasks.push({text:text, completed: false});
        taskInput.value = "";
        updateTaskList();
        updateStats();
        saveTasks()
    }
};

const toggleTaskComplete = (index) => {
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTasks();
};

const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const editTask = (index) => {
    const taskInput = document.getElementById('taskInput');
    taskInput.value = tasks[index].text;

    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTasks();
};

const updateStats = () => {
    const completeTasks = tasks.filter(task => task.completed).length;
    totalTasks = tasks.length;
    const progress = (completeTasks/totalTasks)*100;
    const progressbar = document.getElementById('progress');
    progressbar.style.width = `${progress}%`;

    document.getElementById('numbers').innerText = `${completeTasks} / ${totalTasks}`

    if(tasks.length && completeTasks === totalTasks) {
        blastconfetti();
    }
}

const updateTaskList = () => {
    const taskList = document.querySelector('.task-list');
    taskList.innerHTML = '';

    tasks.forEach((task,index) => {
        const listItem = document.createElement('li')

        listItem.innerHTML = `
        <div class ="taskItem">
        <div class = "task ${task.completed ? 'completed': ''}">
        <input type = "checkbox" class = "checkbox" ${task.completed? 'checked': ""} />
        <p>${task.text}</p>
        </div>
        <div class = "icons">
        <img class ="editbtn" src = "https://p.kindpng.com/picc/s/154-1541056_edit-edit-icon-svg-hd-png-download.png" onclick="editTask(${index})" alt = "none">
        <img class ="deletebtn" src = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT5QzM8yGYMwRsmC5I2Gt9pFcmkkpM9IfhIMA&s" onclick="deleteTask(${index})" alt ="none">
        </div>
        </div>`;

        listItem.addEventListener('change', ()=> toggleTaskComplete(index));
        taskList.append(listItem);
    });
}

document.getElementById('newTask').addEventListener('click', function(e){
    e.preventDefault();

    addTask();
});

const blastconfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}
