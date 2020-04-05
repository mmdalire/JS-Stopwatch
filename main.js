//Used to count in stopwatch
let miliseconds = 0, lapMiliseconds = 1;
let seconds = 0, lapSeconds = 0;
let minutes = 0, lapMinutes = 0;
let hours = 0, lapHours = 0;
//Lap number counter
let currentLap = 0;
//View of stopwatch 
let stopwatchDisplay = document.querySelector('.container__stopwatch');
let lapStopwatchDisplay = document.querySelector('.container__lap-stopwatch');
//Buttons for different operations (start, stop, reset, and lap)
let startAndStop = document.querySelector('#control-buttons__start-stop');
let resetAndLap = document.querySelector('#control-buttons__reset-lap');
//List for laps
let lapDisplayContainer = document.querySelector('.container__display-lap');
//Place new lap record inside the lap container
let lapDisplay = document.querySelector('.container__display-lap');

//Parsing zeros in stopwatch
const parseZeroMiliseconds = () => (miliseconds < 10) ? '0' : ''; //Parsing zero in ms
const parseZeroSeconds = () => (seconds < 10) ? '0' : ''; //Parsing zero in s
const parseZeroMinutes = () => (minutes < 10) ? '0' : ''; //Parsing zero in mins
const parseHours = () => (hours <= 0) ? '' : hours.toString() + ':'; //Parsing hours

//Parsing zeros in lap stopwatch
const parseZeroLapMiliseconds = () => (lapMiliseconds < 10) ? '0' : ''; //Parsing zero in ms
const parseZeroLapSeconds = () => (lapSeconds < 10) ? '0' : ''; //Parsing zero in s
const parseZeroLapMinutes = () => (lapMinutes < 10) ? '0' : ''; //Parsing zero in mins
const parseLapHours = () => (lapHours <= 0) ? '' : lapHours.toString() + ':'; //Parsing hours

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
    //For stopwatch display
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

    //Stopwatch display
    stopwatchDisplay.textContent = `${parseHours()}${parseZeroMinutes() + minutes.toString()}:${parseZeroSeconds() + seconds.toString()}.${parseZeroMiliseconds() + miliseconds.toString()}`;
}

//Logic to count in lap stopwatch 
const lapStartStopwatch = () => {
    //For lap stopwatch display
    //count miliseconds
    lapMiliseconds++;
    //if it reaches 1000ms (1s), count 1s
    if(lapMiliseconds === 100) {
        //count seconds
        lapMiliseconds = 0;
        lapSeconds++;
        //if it reaches 60s (1min), count 1min
        if(lapSeconds === 60) {
            //count minutes
            lapSeconds = 0;
            lapMinutes++;
            //if it reaches 60min (1hr), count 1hr
            if(lapMinutes === 60) {
                //count hours
                lapMinutes = 0;
                lapHours++;
            }
        }
    }

    //Lap stopwatch display
    lapStopwatchDisplay.textContent = `${parseLapHours()}${parseZeroLapMinutes() + lapMinutes.toString()}:${parseZeroLapSeconds() + lapSeconds.toString()}.${parseZeroLapMiliseconds() + lapMiliseconds.toString()}`;
}

//Reset the stopwatch 
const resetStopwatch = () => {
    //Reset the stopwatch
    hours = minutes = seconds = miliseconds = 0;
    lapHours = lapMinutes = lapSeconds = lapMiliseconds = 0;
    stopwatchDisplay.textContent = '00:00.00';
    lapStopwatchDisplay.textContent = '00:00.00';

    //Clear the lap log
    lapDisplay.textContent = '';
    currentLap = 0;
}

const lapStopwatch = () => {
    //Create a lap record in stopwatch
    let lapNewRecord = document.createElement('div');
    let lapNumber = document.createElement('div');
    let lapTime = document.createElement('div');

    currentLap++; //Count the current lap

    //Place class property in created lap record
    lapNewRecord.className = 'display-lap__new-lap';
    lapNumber.className = 'new-lap__lap-number';
    lapTime.className = 'new-lap__time-lap';

    //Place the lap number
    lapNumber.textContent = 'Lap ' + currentLap.toString();
    //Place the lap time
    lapTime.textContent = lapStopwatchDisplay.textContent;
    
    //Append the lap record in the display
    lapNewRecord.appendChild(lapNumber);
    lapNewRecord.appendChild(lapTime);
    lapDisplay.insertBefore(lapNewRecord, lapDisplay.firstElementChild);

    //Reseting the lap stopwatch to record another lap
    lapHours = lapMinutes = lapSeconds = lapMiliseconds = 0;
    lapStopwatchDisplay.textContent = '00:00.00';
}

//Event listeners
let storeStopwatchInterval; //Start to store the setInterval
let storeLapStopwatchInterval; //Start to store the setInterval

startAndStop.addEventListener('click', e => {
    if(startAndStop.textContent === 'Start') {
        startAndStop.disable = true;
        resetAndLap.textContent = 'Lap';
        pressToStop();
        storeStopwatchInterval = setInterval(startStopwatch, 10); //Run the stopwatch
        storeLapStopwatchInterval = setInterval(lapStartStopwatch, 10); //Run the lap stopwatch
    }
    else if(startAndStop.textContent === 'Stop') {
        startAndStop.disable = false;
        resetAndLap.textContent = 'Reset';
        pressToStart();
        clearInterval(storeStopwatchInterval); //Pause the stopwatch
        clearInterval(storeLapStopwatchInterval); //Pause the lap stopwatch
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
