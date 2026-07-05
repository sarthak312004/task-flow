// Timer / Counter
let resetBtn = document.createElement('button')
resetBtn.id = 'reset-btn'
resetBtn.addEventListener('click', resetCounter)
let resetImg = document.createElement('img')
resetImg.src="res/reset-icon.png"

resetBtn.appendChild(resetImg)

let counterSec = 0
let counterMin = 0 
let counterhr = 0
let isRunning = false
let interval;
let startGlowHigher;
let startGlowLower;
//Click handler
function playpauseHandler(){
    if(isRunning == false){
        startCounter()
        startGlowHigher = setInterval(function(){
            document.querySelector('.counter-div').style.boxShadow = "0px 0px 10px 3px rgb(134 186 255 / 23%"
        },1000)

        startGlowLower = setInterval(function(){
            document.querySelector('.counter-div').style.boxShadow = "none"
        },2000)

    }else{
        stopCounter()
    }
}

// Start the timer
function startCounter(){
    if(isRunning === false){
        interval = setInterval(function(){
        counterSec++
        document.querySelector('#sec').innerHTML = `${counterSec}`
        if(counterSec == 60){
            counterSec = 0
            document.querySelector('#sec').innerHTML = `${counterSec}`
            counterMin++
            document.querySelector('#min').innerHTML = `${counterMin}`
            if(counterMin == 60){
                counterMin = 0
                document.querySelector('#min').innerHTML = `${counterMin}`
                counterhr++
                document.querySelector('#hr').innerHTML = `${counterhr}`
            }
        }
        
    },1000) 

    isRunning = true
    document.querySelector('#play-pause-btn img').src = "res/pause.png"
    document.querySelector('.counter-options').appendChild(resetBtn)
  }
}
 
document.querySelector('#play-pause-btn').addEventListener('click', playpauseHandler)

// Pause and Reset Timer
function stopCounter(){
    clearInterval(interval)
    isRunning = false
    document.querySelector('#play-pause-btn img').src = "res/play-icon.png"
}
function resetCounter(){
    stopCounter()
    isRunning = false
    counterSec = 0
    counterMin = 0 
    counterhr = 0
    document.querySelector('#sec').innerHTML = `${counterSec}`
    document.querySelector('#min').innerHTML = `${counterMin}`
    document.querySelector('#hr').innerHTML = `${counterhr}`
    document.querySelector('.counter-div').style.boxShadow = "none"
    clearInterval(startGlowHigher)
    clearInterval(startGlowLower)
}

//Adding tasks
const tasks = [{taskName:"Task one", progress: 0, checked: false, id:0}]

//Unique id generation
let id;
const generateId = ()=>{
    if(tasks.length === 0){
        return 0
    }else{
        return id = Number(tasks[tasks.length-1].id) + 1
        // console.log(id);
    }
}
const addTask = () =>{
    let input = document.querySelector('#add-task-input')

    if(document.querySelector('#add-task-input').value){
        const taskName = document.querySelector('#add-task-input').value
        tasks.push({taskName:`${taskName}`, progress: 0, checked: false, id: generateId()})
        createCard(Number(tasks[tasks.length-1].id))
        input.value = ""
    }else{
        input.focus()
    }
}
document.querySelector('#add-task-btn').addEventListener('click', addTask)

//creating taskcard and adding
const create = (taskObj) =>{
    const parent = document.createElement('div')
    parent.id = 'task-div'

    const child = document.createElement('div')
    child.className = 'taskname-timing-box'
    const input = document.createElement('input')
    input.id = 'checkTask'
    input.type = 'checkbox'

    const subchild = document.createElement('div')
    subchild.className = 'taskname-timing'
    const pOne = document.createElement('p')
    pOne.innerText = taskObj.taskName
    const pTwo = document.createElement('p')
    pTwo.innerText = `${taskObj.progress}m`
    subchild.appendChild(pOne)
    subchild.appendChild(pTwo)
    child.appendChild(input)
    child.appendChild(subchild)

    const divTwo = document.createElement('div')
    divTwo.className = 'select-deselect-trash'

    const p = document.createElement('p')
    p.id ='select-deselect'
    p.innerText = "Select"
    divTwo.appendChild(p)

    const trashBtn = document.createElement('button')
    const img = document.createElement('img')
    img.src = 'res/trash-icon.png'
    trashBtn.appendChild(img)
    divTwo.appendChild(trashBtn)

    parent.appendChild(child)
    parent.appendChild(divTwo)

    const taskPanelContent = document.querySelector('.task-panel-content')
    if (taskPanelContent) {
        taskPanelContent.appendChild(parent)
    }
}

const createCard = (id) =>{
    // console.log(id);
    tasks.forEach((taskObj)=>{
        if(Number(taskObj.id) === id){
            // console.log(true);
            create(taskObj)
        }
    })
}
