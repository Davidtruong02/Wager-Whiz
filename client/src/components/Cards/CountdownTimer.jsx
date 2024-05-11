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

    if (totalSeconds > 5 * 60) {
      return "green"; // Over 5 minutes
    } else if (totalSeconds > 2 * 60) {
      return "amber"; // Between 2 and 5 minutes
    } else {
      return "red"; // 2 minutes and under
    }
  }

  function getWarningSymbol() {
    if (getTimeColor() === "red" || getTimeColor() === "amber") {
      return "⚠️"; // Warning symbol for red zone
    } else {
      return ""; // No symbol for other colors
    }
  }

  return (
    <div className="countdown-timer">
      <p className="mb-2" style={{ color: getTimeColor() }}>
        {getWarningSymbol()} Start time: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default CountdownTimer;
