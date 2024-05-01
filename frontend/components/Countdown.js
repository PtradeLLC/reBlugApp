import React from 'react'

const Countdown = () => {
    function updateCountdown() {
        const now = new Date();
        const timeDifference = targetDate - now;

        // Calculate hours, minutes, and seconds
        const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

        // Format hours, minutes, and seconds
        const formattedHours = String(hours).padStart(2, '0');
        const formattedMinutes = String(minutes).padStart(2, '0');
        const formattedSeconds = String(seconds).padStart(2, '0');

        // Display the countdown in the UI
        document.getElementById('countdown').textContent = `${formattedHours}hr : ${formattedMinutes}mins : ${formattedSeconds}sec`;

        // If the countdown reaches zero, do something
        if (timeDifference <= 0) {
            clearInterval(timerInterval);
            document.getElementById('countdown').textContent = "Countdown finished!";
            // Do something when the countdown finishes
        }
    }

    // Set the target date 24 hours from now
    const targetDate = new Date('May 1, 2024 12:00:00');
    targetDate.setDate(targetDate.getDate() + 1);

    // Update the countdown every second
    const timerInterval = setInterval(updateCountdown, 1000);

    return (
        <div id='countdown'></div>
    )
}

export default Countdown;