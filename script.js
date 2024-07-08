let timer; // To hold the setInterval reference
let running = false; // Flag to track if the stopwatch is running
let startTime; // Timestamp when the stopwatch starts
let elapsedTime = 0; // Elapsed time in milliseconds
let laps = []; // Array to store lap times

function startPause() {
    if (!running) {
        // Start the stopwatch
        startTime = Date.now() - elapsedTime;
        timer = setInterval(updateTime, 10); // Update time every 10 milliseconds
        document.getElementById('startPause').textContent = 'Pause';
        running = true;
    } else {
        // Pause the stopwatch
        clearInterval(timer);
        document.getElementById('startPause').textContent = 'Resume';
        running = false;
    }
}

function updateTime() {
    elapsedTime = Date.now() - startTime;
    let formattedTime = formatTime(elapsedTime);
    document.getElementById('minutes').textContent = formattedTime.minutes;
    document.getElementById('seconds').textContent = formattedTime.seconds;
    document.getElementById('milliseconds').textContent = formattedTime.milliseconds;
}

function formatTime(milliseconds) {
    let totalSeconds = Math.floor(milliseconds / 1000);
    let totalMinutes = Math.floor(totalSeconds / 60);
    let formattedMinutes = pad(totalMinutes % 60);
    let formattedSeconds = pad(totalSeconds % 60);
    let formattedMilliseconds = pad(milliseconds % 1000, 3);
    return {
        minutes: formattedMinutes,
        seconds: formattedSeconds,
        milliseconds: formattedMilliseconds
    };
}

function pad(number, length = 2) {
    return ('000' + number).slice(-length);
}

function lapReset() {
    if (running) {
        // Store lap time
        let lapTime = elapsedTime;
        laps.push(lapTime);
        // Display lap time
        let lapList = document.getElementById('laps');
        let lapItem = document.createElement('li');
        lapItem.textContent = laps.length + '. ' + formatTime(lapTime).minutes + ':' + formatTime(lapTime).seconds + '.' + formatTime(lapTime).milliseconds;
        lapList.appendChild(lapItem);
    } else {
        // Reset stopwatch
        clearInterval(timer);
        document.getElementById('startPause').textContent = 'Start';
        document.getElementById('minutes').textContent = '00';
        document.getElementById('seconds').textContent = '00';
        document.getElementById('milliseconds').textContent = '000';
        elapsedTime = 0;
        laps = [];
        let lapList = document.getElementById('laps');
        lapList.innerHTML = ''; // Clear laps list
    }
}
