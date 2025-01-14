let startTime;
let elapsedTime = 0;
let timerInterval;
let isRunning = false;

const displayElement = document.getElementById('display');
const startStopButton = document.getElementById('startStopBtn');
const lapButton = document.getElementById('lapBtn');
const resetButton = document.getElementById('resetBtn');
const lapsContainer = document.getElementById('laps');

function formatTime(time) {
    const date = new Date(time);
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    const seconds = String(date.getUTCSeconds()).padStart(2, '0');
    const milliseconds = String(date.getUTCMilliseconds()).padStart(3, '0');
    return `${minutes}:${seconds}:${milliseconds}`;
}

function updateDisplay() {
    displayElement.innerText = formatTime(elapsedTime);
}

function startStopwatch() {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 10);
    startStopButton.innerText = 'Pause';
    startStopButton.classList.remove('start');
    startStopButton.classList.add('pause');
    isRunning = true;
}

function stopStopwatch() {
    clearInterval(timerInterval);
    startStopButton.innerText = 'Resume';
    startStopButton.classList.remove('pause');
    startStopButton.classList.add('resume');
    isRunning = false;
}

function resetStopwatch() {
    clearInterval(timerInterval);
    elapsedTime = 0;
    updateDisplay();
    startStopButton.innerText = 'Start';
    startStopButton.classList.remove('pause', 'resume');
    lapsContainer.innerHTML = '';
    isRunning = false;
}

function recordLap() {
    const lapTime = formatTime(elapsedTime);
    const lapElement = document.createElement('li');
    lapElement.innerText = lapTime;
    lapsContainer.appendChild(lapElement);
}

startStopButton.addEventListener('click', () => {
    if (isRunning) {
        stopStopwatch();
    } else {
        startStopwatch();
    }
});

lapButton.addEventListener('click', () => {
    if (isRunning) {
        recordLap();
    }
});

resetButton.addEventListener('click', resetStopwatch);

updateDisplay();
