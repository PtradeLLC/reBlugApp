import React from 'react'

const CurrentMonth = () => {

    // Get the current date and time
    var currentDate = new Date();

    // Get the current month (0-11, where 0 is January)
    var currentMonth = currentDate.getMonth() + 1; // Adding 1 to match human-readable month numbering

    // Get the current date (1-31)
    var currentDateOfMonth = currentDate.getDate();

    // Get the current time (24-hour format)
    var currentHour = currentDate.getHours();
    var currentMinute = currentDate.getMinutes();
    var currentSecond = currentDate.getSeconds();

    // Formatting the time to display leading zeros if needed
    currentHour = (currentHour < 10 ? "0" : "") + currentHour;
    currentMinute = (currentMinute < 10 ? "0" : "") + currentMinute;
    currentSecond = (currentSecond < 10 ? "0" : "") + currentSecond;

    // Displaying the current month, date, and time
    console.log("Current Month: " + currentMonth);
    console.log("Current Date: " + currentDateOfMonth);
    console.log("Current Time: " + currentHour + ":" + currentMinute + ":" + currentSecond);

    return (
        <div>
            <p>Current Month: {currentMonth}</p>
            <p>Current Date: {currentDateOfMonth}</p>
            <p>Current Time: {currentHour + ":" + currentMinute + ":" + currentSecond}</p>
        </div>
    )
}

export default CurrentMonth

