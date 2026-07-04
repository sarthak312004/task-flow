// Timer / Counter
let pauseBtn = document.createElement('button')
pauseBtn.id = 'pause-btn'
let pauseImg = document.createElement('img')
pauseImg.src="res/pause.png"
pauseBtn.appendChild(pauseImg)

let resetBtn = document.createElement('button')
resetBtn.id = 'reset-btn'
let resetImg = document.createElement('img')
resetImg.src="res/reset-icon.png"
resetBtn.appendChild(resetImg)

let counterSec = 0
let counterMin = 0 
let counterhr = 0
let interval;
function startCounter(){
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
    document.querySelector('#play-btn').remove()
    document.querySelector('.counter-options').appendChild(pauseBtn)
    document.querySelector('.counter-options').appendChild(resetBtn)
}
document.querySelector('#play-btn').addEventListener('click',startCounter)

// Pause and Reset Timer
function stopCounter(){
    clearInterval(interval)
}
