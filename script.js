// Select the timer display, counter display, and increment button elements
const timerDisplay = document.querySelector('#timer');
const counterDisplay = document.querySelector('#counter');
const incrementButton = document.querySelector('#incrementButton');
const startButton = document.querySelector('#startButton');

// Initialize the timer value
let timerValue = 10;
// Store the time when the 10-second confetti window ends
let countdownDeadline = 0;
// Remember the previous counter value so we only fire when the counter reaches 10
let previousCounterValue = 0;
// Keep track of whether confetti has already been shown
let confettiShown = false;

// Show confetti when the counter reaches the goal in time
function showConfetti() {
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }
}

// Function to start the countdown
function startCountdown() {
    countdownDeadline = Date.now() + 10000;

    const countdownInterval = setInterval(function() {
        // Decrement the timer value
        timerValue--;
        // Update the timer display
        timerDisplay.textContent = timerValue;

        // Stop the countdown when the timer reaches 0
        if (timerValue <= 0) {
            clearInterval(countdownInterval);
            timerDisplay.textContent = '0'; // Ensure the display shows 0
        }
    }, 1000);
}

// Initialize the counter value
let counterValue = 0;

// Function to increase the counter
function increaseCounter() {
    // Increment the counter value
    previousCounterValue = counterValue;
    counterValue++;
    // Update the counter display
    counterDisplay.textContent = counterValue;

    // Show confetti if the counter reaches 10 within the first 10 seconds
    if (previousCounterValue < 10 && counterValue >= 10 && Date.now() <= countdownDeadline && !confettiShown) {
        showConfetti();
        confettiShown = true;
    }
}

// Add an event listener to the increment button to increase the counter when clicked
incrementButton.addEventListener('click', increaseCounter);

// Add an event listener to the start button to start the countdown when clicked
startButton.addEventListener('click', startCountdown);
