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

//Click handler
function playpauseHandler(){
    if(isRunning == false){
        startCounter()
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
}