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

    const totalSeconds = Math.floor(difference / 1000);
    const days = Math.floor(totalSeconds / (60 * 60 * 24));
    const hours = Math.floor((totalSeconds % (60 * 60 * 24)) / (60 * 60));
    const minutes = Math.floor((totalSeconds % (60 * 60)) / 60);
    const seconds = totalSeconds % 60;

    return { days, hours, minutes, seconds };
  }

  function getTimeColor() {
    const totalSeconds = timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;

    if (totalSeconds > 30 * 60) {
      return "green"; // Over 10 minutes
    } else if (totalSeconds > 15 * 60) {
      return "orange"; // Between 2 and 10 minutes
    } else {
      return "red"; // 2 minutes and under
    }
  }

  function getWarningSymbol() {
    if (getTimeColor() === "red" || getTimeColor() === "orange") {
      return "⚠️"; // Warning symbol for red and amber zones
    } else {
      return ""; // No symbol for other colors
    }
  }

  function getWarningMessage() {
    if (getTimeColor() === "red" || getTimeColor() === "orange") {
      return "Time is almost up!"; // Warning message for red and amber zones
    } else {
      return ""; // No message for other colors
    }
  }

  return (
    <div className="countdown-timer">
      <p className="mb-2" style={{ color: getTimeColor() }} title={getWarningMessage()}>
        {getWarningSymbol()} Start time: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default CountdownTimer;
