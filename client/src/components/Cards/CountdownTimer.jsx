import React, { useState, useEffect } from "react";

function CountdownTimer({ startTime }) {
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [flashClass, setFlashClass] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(getTimeRemaining());
      setFlashClass(getFlashClass());
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

  function getFlashClass() {
    const totalSeconds = timeLeft.days * 24 * 60 * 60 + timeLeft.hours * 60 * 60 + timeLeft.minutes * 60 + timeLeft.seconds;

    if (totalSeconds <= 30) {
      return "flash";
    } else {
      return "";
    }
  }

  return (
    <div className={`countdown-timer ${flashClass}`}>
      <p className="mb-2">
        Start time: {timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s
      </p>
    </div>
  );
}

export default CountdownTimer;
