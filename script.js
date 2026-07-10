// Timer / Counter
let resetBtn = document.createElement("button");
resetBtn.id = "reset-btn";
resetBtn.addEventListener("click", resetCounter);
let resetImg = document.createElement("img");
resetImg.src = "res/reset-icon.png";

resetBtn.appendChild(resetImg);

let counterSec = 0;
let counterMin = 0;
let counterhr = 0;
let isRunning = false;
let interval;
let startGlowHigher;
let startGlowLower;
let selectedTask;

//-----------------------------------------------Click handler
function playpauseHandler() {
  if (isRunning == false) {
    startCounter();
    startGlowHigher = setInterval(function () {
      document.querySelector(".counter-div").style.boxShadow =
        "0px 0px 10px 3px rgb(134 186 255 / 23%";
    }, 1000);

    startGlowLower = setInterval(function () {
      document.querySelector(".counter-div").style.boxShadow = "none";
    }, 2000);
  } else {
    stopCounter();
  }
}

//-------------------------------------------------fetch the progress
function fetchProgress() {
  let selectedDiv = Number(selectedTask.children[1].children[1].id);
  let progress;
  tasks.forEach((obj) => {
    if (selectedDiv === obj.id) {
      progress = obj.progress;
    }
  });
  return progress;
}

//---------------------------------------------------Update progression
const updateProgress = (progress) => {
  tasks.forEach((obj) => {
    if (obj.selected === true) {
      obj.progress += progress;
    }
  });
};

// -------------------------------------------------Start the timer
function startCounter() {
  if(selectedTask){
    selectedTask.children[1].style.visibility = 'hidden'
  }
  if (isRunning === false) {
    interval = setInterval(function () {
      counterSec++;
      document.querySelector("#sec").innerHTML = `${counterSec}`;
      if (counterSec == 60) {
        counterSec = 0;
        document.querySelector("#sec").innerHTML = `${counterSec}`;
        counterMin++;
        updateProgress(1);

        document.querySelector("#min").innerHTML = `${counterMin}`;
        if (counterMin == 60) {
          counterMin = 0;
          document.querySelector("#min").innerHTML = `${counterMin}`;
          counterhr++;
          document.querySelector("#hr").innerHTML = `${counterhr}`;
        }
      }
    }, 1000);

    isRunning = true;
    document.querySelector("#play-pause-btn img").src = "res/pause.png";
    document.querySelector(".counter-options").appendChild(resetBtn);
  }
}
document
  .querySelector("#play-pause-btn")
  .addEventListener("click", playpauseHandler);

//---------------------------------------------------- Pause and Reset Timer
function stopCounter() {
  clearInterval(interval);
  isRunning = false;
  document.querySelector("#play-pause-btn img").src = "res/play-icon.png";
  if (selectedTask != undefined) {
    selectedTask.firstChild.firstChild.nextElementSibling.firstChild.nextElementSibling.innerText = `${fetchProgress()}m`;
    selectedTask.children[1].style.visibility = 'visible'
  }

}
function resetCounter() {
  stopCounter();
  isRunning = false;
  counterSec = 0;
  counterMin = 0;
  counterhr = 0;
  document.querySelector("#sec").innerHTML = `${counterSec}`;
  document.querySelector("#min").innerHTML = `${counterMin}`;
  document.querySelector("#hr").innerHTML = `${counterhr}`;
  document.querySelector(".counter-div").style.boxShadow = "none";
  clearInterval(startGlowHigher);
  clearInterval(startGlowLower);
}

//---Adding tasks
const tasks = [
  { taskName: "study", progress: 0, checked: false, id: 0, selected: false },
  { taskName: "running", progress: 0, checked: false, id: 1, selected: false },
  { taskName: "meditation", progress: 0, checked: false, id: 2, selected: false,},
];

//-----------------------------------Unique id generation
let id;
const generateId = () => {
  if (tasks.length === 0) {
    return 0;
  } else {
    return (id = Number(tasks[tasks.length - 1].id) + 1);
    // console.log(id);
  }
};
const addTask = () => {
  let input = document.querySelector("#add-task-input");

  if (document.querySelector("#add-task-input").value) {
    const taskName = document.querySelector("#add-task-input").value;
    tasks.push({
      taskName: `${taskName}`,
      progress: 0,
      checked: false,
      id: generateId(),
      selected: false,
    });
    createCard(Number(tasks[tasks.length - 1].id));
    input.value = "";
  } else {
    input.focus();
  }
};
document.querySelector("#add-task-btn").addEventListener("click", addTask);
//Using Enter keydown
document
  .querySelector("#add-task-input")
  .addEventListener("keydown", function (e) {
    if (e.code === "Enter") {
      addTask();
    }
  });

//------------------------------------------creating taskcard and adding
const create = (taskObj) => {
  const parent = document.createElement("div");
  parent.id = "task-div";

  const child = document.createElement("div");
  child.className = "taskname-timing-box";
  const input = document.createElement("input");
  input.id = taskObj.taskName;
  input.type = "checkbox";
  input.onclick = () => checkTask(taskObj.taskName);

  const subchild = document.createElement("div");
  subchild.className = "taskname-timing";
  const pOne = document.createElement("p");
  pOne.innerText = taskObj.taskName;
  const pTwo = document.createElement("p");
  pTwo.innerText = `${taskObj.progress}m`;
  subchild.appendChild(pOne);
  subchild.appendChild(pTwo);
  child.appendChild(input);
  child.appendChild(subchild);

  const divTwo = document.createElement("div");
  divTwo.className = "select-deselect-trash";

  const p = document.createElement("p");
  p.id = "select-deselect";
  p.innerText = "Select";
  p.onclick = () => selectTask(taskObj.id);

  // p.addEventListener('click',function(){
  //     console.log(this.parentElement);
  //     console.log(this.nextElementSibling.id);
  //     // selectTask(this.nextElementSibling.id)
  // })

  divTwo.appendChild(p);

  const trashBtn = document.createElement("button");
  trashBtn.id = taskObj.id;
  trashBtn.onclick = () => deleteTask(taskObj.id);

  const img = document.createElement("img");
  img.src = "res/trash-icon.png";
  trashBtn.appendChild(img);
  divTwo.appendChild(trashBtn);

  parent.appendChild(child);
  parent.appendChild(divTwo);

  const taskPanelContent = document.querySelector(".task-panel-content");
  if (taskPanelContent) {
    taskPanelContent.appendChild(parent);
  }
};

const createCard = (id) => {
  // console.log(id);
  tasks.forEach((taskObj) => {
    if (Number(taskObj.id) === id) {
      // console.log(true);
      create(taskObj);
    }
  });
};

//----------------------------------------------Delete Functionality
const deleteTask = (id) => {
  // console.log(typeof(id));

  tasks.forEach((obj, index) => {
    if (obj.id === id) {
      // console.log(index);
      tasks.splice(index, 1);
      const parentDiv = document.getElementById(id).parentElement.parentElement;
      parentDiv.remove();
    }
  });
};

// -------------------------------------------------Check validation
const checkTask = (taskName, indx) => {
  tasks.forEach((obj) => {
    let p = document.getElementById(taskName);
    // console.log(obj);
    if ((obj.taskName === taskName) && (!indx)) {
      if (obj.checked === false) {
        obj.checked = true;
        // console.log(obj);
        p.nextSibling.firstChild.style.color = "#e8e8e894";
        p.nextSibling.firstChild.style.textDecoration = "line-through";
        p.parentElement.parentElement.style.opacity = "0.7";
        p.parentElement.nextElementSibling.firstChild.style.pointerEvents = "none";
      } else if (obj.checked === true) {
        obj.checked = false;
        // console.log(obj);
        p.nextSibling.firstChild.style.color = "#e8e8e8";
        p.nextSibling.firstChild.style.textDecoration = "none";
        p.parentElement.parentElement.style.opacity = "1";
        p.parentElement.nextElementSibling.firstChild.style.pointerEvents = "auto";
      }

    } else if((obj.taskName === taskName) && indx){
      if (obj.checked === true) {
        document.getElementById(obj.taskName).checked = true ;
        p.nextSibling.firstChild.style.color = "#e8e8e894";
        p.nextSibling.firstChild.style.textDecoration = "line-through";
        p.parentElement.parentElement.style.opacity = "0.7";
        p.parentElement.nextElementSibling.firstChild.style.pointerEvents = "none";
      }
    }
  });
};

// -----------------------------------------------------Select functionality
const ableDisableTasks = (container, id, state) => {
  const containerArr = Array.from(container);
  if (state === true) {
    containerArr.forEach((obj) => {
      // console.log(obj);
      // console.log(obj.children[1].children[1].id);
      if (!(Number(obj.children[1].children[1].id) === id)) {
        obj.style.pointerEvents = "none";
        obj.style.opacity = "0.5";
      }
      if (Number(obj.children[1].children[1].id) === id) {
        selectedTask = obj;
      }
    });
  } else {
    containerArr.forEach((obj) => {
      // console.log(obj.children[1].children[1].id);
      if (!(Number(obj.children[1].children[1].id) === id)) {
        obj.style.pointerEvents = "auto";
        obj.style.opacity = "1";
      }
    });
  }
};
const selectTask = (id) => {
  tasks.forEach((obj) => {
    let selectP = document.getElementById(id).previousElementSibling;
    if (obj.id === id && obj.selected === false) {
      obj.selected = true;
      selectP.innerText = "Deselect";
      document.getElementById(id).style.visibility = 'hidden'
      ableDisableTasks(
        document.querySelector(".task-panel-content").children,
        id,
        true,
      );
    } else if (obj.id === id && obj.selected === true) {
      obj.selected = false;
      selectP.innerText = "Select";
      document.getElementById(id).style.visibility = 'visible'
      ableDisableTasks(
        document.querySelector(".task-panel-content").children,
        id,
        false,
      );
    }
  });
};

//-----------------------------------------------option-btn dropdown
let optionsDropped = false;
let menuDropped = false;
function dropdownOption() {
  if (optionsDropped === false && this.className === "option-btn") {
    const dropdownOption = document.querySelector(".dropdown-optio-container");
    dropdownOption.style.transform = "translateX(-30px)";
    dropdownOption.style.visibility = "visible";
    optionsDropped = true;
  } else {
    const dropdownOption = document.querySelector(".dropdown-optio-container");
    dropdownOption.style.visibility = "hidden";
    dropdownOption.style.transform = "translateX(0px)";
    optionsDropped = false;
  }

  if (menuDropped === false && this.className === "menu-btn") {
    const dropdownMenu = document.querySelector(".dropdown-menu-container");
    dropdownMenu.style.transform = "translateX(30px)";
    dropdownMenu.style.visibility = "visible";
    menuDropped = true;
  } else {
    const dropdownMenu = document.querySelector(".dropdown-menu-container");
    dropdownMenu.style.transform = "translateX(0px)";
    dropdownMenu.style.visibility = "hidden";
    menuDropped = false;
  }
}
document.querySelector(".option-btn").addEventListener("click", dropdownOption);
document.querySelector(".menu-btn").addEventListener("click", dropdownOption);

// --------------------------------------------display functionality
function display() {
  // console.log(this);
  let children =Array.from(document.querySelector(".task-panel-content").children)
  children.forEach((childs)=>{
      childs.remove()
  })
  let isEmpty = 0;
  let note = document.createElement('p')

    if(this.id === "display-all-tasks"){
        tasks.forEach((obj) => {
        isEmpty++
        create(obj);
        if(obj.checked === true){
          checkTask(obj.taskName, 1)
        }
        });
        note.innerText = "Add Tasks !"
    }

    if(this.id === "display-completed-tasks"){
      tasks.forEach((obj)=>{
        if(obj.checked === true){
          isEmpty++
          create(obj)
          checkTask(obj.taskName, 1)
        }
      })
      note.innerText = "No Tasks Completed Yet !"
    }

    if(this.id === "display-in-progess-tasks"){
      tasks.forEach((obj)=>{
        if((obj.progress > 0) && (obj.checked === false)){
          // console.log(true);
          isEmpty++
          create(obj)
        }
      })
      note.innerText = "No Progress In Any Task !"
    }
    if(!isEmpty){
      document.querySelector('.task-panel-content').appendChild(note)
    }
}
document.querySelector("#display-all-tasks").addEventListener("click", display);
document.querySelector("#display-completed-tasks").addEventListener("click", display);
document.querySelector("#display-in-progess-tasks").addEventListener("click", display);