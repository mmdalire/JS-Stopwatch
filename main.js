//Used to count in stopwatch
let miliseconds = 0;
let seconds = 0;
let minutes = 0;
let hours = 0;
//View of stopwatch 
let stopwatchDisplay = document.querySelector('.container__stopwatch');
//Buttons for different operations (start, stop, reset, and lap)
let startAndStop = document.querySelector('#control-buttons__start-stop');
let resetAndLap = document.querySelector('#control-buttons__reset-lap');
//List for laps
let lapDisplayContainer = document.querySelector('.container__display-lap');
//Create new lap record
let currentLap = 0;

//Place new lap record inside the lap container
let lapDisplay = document.querySelector('.container__display-lap');

//Parsing zeroes
const parseZeroMiliseconds = () => (miliseconds < 10) ? '0' : ''; //Parsing zero in ms
const parseZeroSeconds = () => (seconds < 10) ? '0' : ''; //Parsing zero in s
const parseZeroMinutes = () => (minutes < 10) ? '0' : ''; //Parsing zero in mins
const parseHours = () => (hours <= 0) ? '' : hours.toString() + ':'; //Parsing hours

//Once the stop button is pressed
const pressToStop = () => {
    startAndStop.style.border = 'solid 3px rgb(255, 0, 0)';
    startAndStop.style.color = 'white';
    startAndStop.style.backgroundColor = 'rgb(255, 0, 0)';
    startAndStop.textContent = 'Stop';
}

//Once the start button is pressed 
const pressToStart = () => {
    startAndStop.style.border = 'solid 3px rgb(0, 231, 0)';
    startAndStop.style.color = 'white';
    startAndStop.style.backgroundColor = 'rgb(0, 231, 0)';
    startAndStop.textContent = 'Start';
}

//Logic to count in stopwatch
const startStopwatch = () => {
    //count miliseconds
    miliseconds++;
    //if it reaches 1000ms (1s), count 1s
    if(miliseconds === 100) {
        //count seconds
        miliseconds = 0;
        seconds++;
        //if it reaches 60s (1min), count 1min
        if(seconds === 60) {
            //count minutes
            seconds = 0;
            minutes++;
            //if it reaches 60min (1hr), count 1hr
            if(minutes === 60) {
                //count hours
                minutes = 0;
                hours++;
            }
        }
    }

    stopwatchDisplay.textContent = `${parseHours()}${parseZeroMinutes() + minutes.toString()}:${parseZeroSeconds() + seconds.toString()}.${parseZeroMiliseconds() + miliseconds.toString()}`;
}

//Reset the stopwatch 
const resetStopwatch = () => {
    hours = minutes = seconds = miliseconds = 0;
    stopwatchDisplay.textContent = '00:00.00';
}

//Lap in stopwatch
let lapNewRecord = document.createElement('div');
let lapNumber = document.createElement('div');
let lapTime = document.createElement('div');
const lapStopwatch = () => {
    currentLap++;
    lapNewRecord.className = 'display-lap__new-lap';
    lapNumber.className = 'new-lap__lap-number';
    lapTime.className = 'new-lap__time-lap';

    lapNumber.textContent = currentLap;
    lapTime.textContent = stopwatchDisplay.textContent;
    
    lapNewRecord.appendChild(lapNumber);
    lapNewRecord.appendChild(lapTime);
    lapDisplay.appendChild(lapNewRecord);
}

//Event listeners
let start; //Start to store the setInterval

startAndStop.addEventListener('click', e => {
    if(startAndStop.textContent === 'Start') {
        startAndStop.disable = true;
        resetAndLap.textContent = 'Lap';
        pressToStop();
        start = setInterval(startStopwatch, 10);
    }
    else if(startAndStop.textContent === 'Stop') {
        startAndStop.disable = false;
        resetAndLap.textContent = 'Reset';
        pressToStart();
        clearInterval(start);
    }
    else {
        //Nothing to do
    }
});

resetAndLap.addEventListener('click', e => {
    if(resetAndLap.textContent === 'Reset') {
        resetStopwatch();
    }
    else if(resetAndLap.textContent === 'Lap') {
        lapStopwatch();
    }
    else {
        //Nothing to do
    }
});
