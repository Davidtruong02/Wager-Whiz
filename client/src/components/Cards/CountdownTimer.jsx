import React, { useState, useEffect } from "react";

function CountdownTimer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function getTimeRemaining() {
    const now = new Date();
    const startDate = new Date(startTime);
    const difference = startDate.getTime() - now.getTime();

    if (difference <= 0) {
      // If the start time has passed, return 0 for all fields
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    return { days, hours, minutes, seconds };
  }

  return (
    <div className="countdown-timer">
      <p className="mb-2 start-time">Start Time: {startTime}</p>
      <p className="mb-2">
        Time until start: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default CountdownTimer;
