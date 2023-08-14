// Typewriter effect code
var TxtType = function(el, toRotate, period) {
    this.toRotate = toRotate;
    this.el = el;
    this.loopNum = 0;
    this.period = parseInt(period, 10) || 2000;
    this.txt = "";
    this.tick();
    this.isDeleting = false;
  };
  
  TxtType.prototype.tick = function() {
    var i = this.loopNum % this.toRotate.length;
    var fullTxt = this.toRotate[i];
  
    if (this.isDeleting) {
      this.txt = fullTxt.substring(0, this.txt.length - 1);
    } else {
      this.txt = fullTxt.substring(0, this.txt.length + 1);
    }
  
    // Calculate padding for center alignment
    var padding = Math.max((40 - this.txt.length) / 2, 0);
    var paddingText = " ".repeat(padding);
  
    this.el.querySelector('.wrap').textContent = paddingText + this.txt + paddingText;
  
    var that = this;
    var delta = 200 - Math.random() * 100;
  
    if (this.isDeleting) {
      delta /= 2;
    }
  
    if (!this.isDeleting && this.txt === fullTxt) {
      delta = this.period;
      this.isDeleting = true;
    } else if (this.isDeleting && this.txt === "") {
      this.isDeleting = false;
      this.loopNum++;
      delta = 500;
    }
  
    setTimeout(function() {
      that.tick();
    }, delta);
  };
  
  window.onload = function() {
    var elements = document.getElementsByClassName("typewriter");
    for (var i = 0; i < elements.length; i++) {
      var toRotate = JSON.parse(elements[i].getAttribute("data-type"));
      var period = elements[i].getAttribute("data-period");
      if (toRotate) {
        new TxtType(elements[i], toRotate, period);
      }
    }
  
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const pendingTasksList = document.getElementById("pendingTasks");
    const completedTasksList = document.getElementById("completedTasks");
  
    addTaskBtn.addEventListener("click", addTask);
  
    function addTask() {
      const taskText = taskInput.value.trim();
      if (taskText !== "") {
        const newTask = document.createElement("li");
        newTask.textContent = taskText;
        newTask.innerHTML += '<button class="delete-btn">Delete</button>';
  
        newTask.addEventListener("click", completeTask);
        newTask.querySelector(".delete-btn").addEventListener("click", deleteTask);
  
        pendingTasksList.appendChild(newTask);
        taskInput.value = "";
      }
    }
  
    function completeTask(event) {
      const task = event.target;
      if (!task.classList.contains("delete-btn")) {
        task.classList.toggle("complete");
        if (task.parentNode === pendingTasksList) {
          completedTasksList.appendChild(task);
        } else {
          pendingTasksList.appendChild(task);
        }
      }
    }
  
    function deleteTask(event) {
      const task = event.target.parentNode;
      task.parentNode.removeChild(task);
    }
  };
  