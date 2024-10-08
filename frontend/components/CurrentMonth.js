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

    return (
        <div className="flex justify-between max-w-xs w-full font-thin rounded-lg shadow dark:bg-gray-800 p-4 md:p-6">
            <p>{new Date(currentDate).toLocaleString('default', { month: 'long' })}</p>
            <p>{currentDateOfMonth}</p>
            {/* <p>{currentHour + ":" + currentMinute + ":" + currentSecond}</p> */}
        </div>
    )
}

export default CurrentMonth

