//Makes the code only run when html code has been run

document.addEventListener('DOMContentLoaded', function () {
  const addButton = document.getElementById('add-task-btn');
  const taskInput = document.getElementById('task-input');
  const taskList = document.getElementById('task-list');

  
  let tasks = JSON.parse(localStorage.getItem('tasks') || '[]');

  function loadTasks(task) {
    const li = document.createElement('li');
    li.textContent = task;

    const removeBtn = document.createElement('button')
    removeBtn.classList.add("remove-btn");
    removeBtn.textContent = "Remove";

    removeBtn.addEventListener('click', function () {
      taskList.removeChild(li);
      tasks = tasks.filter(t => t !== task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
    });
    li.appendChild(removeBtn);
    taskList.appendChild(li);
  }

  tasks.forEach(task => {
    loadTasks(task)
  });

//function to take user input and add it as a task
  function addTask() {
    const taskText = taskInput.value.trim();

  //checks if the user entered anything into the input field before adding it as a task
    if (taskText !== '') {
      const li = document.createElement('li');
      li.textContent = taskText;

      loadTasks(taskText)
      
      tasks.push(taskText);
      localStorage.setItem('tasks', JSON.stringify(tasks));

      taskInput.value = '';
    }
  //If nothing was entered, this tells the user to enter a task
    else {
      alert('Please enter a task')
    }
  };


//Giving the add button functionality
  addButton.addEventListener('click', addTask);
//Allows user to add task with the Enter key
  taskInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      addTask()
    }
  })

});