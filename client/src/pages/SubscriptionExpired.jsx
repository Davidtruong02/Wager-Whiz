import React, { useState, useEffect } from "react";

function App() {
  const [isTrial, setIsTrial] = useState(true);
  const [trialEndDate, setTrialEndDate] = useState(null);

  useEffect(() => {
    // Calculate trial end date (7 days from today)
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 7);
    setTrialEndDate(endDate);

    // Check if trial period has expired
    const now = new Date();
    if (now > endDate) {
      setIsTrial(false);
    }
  }, []);

  return (
    <div>
      <h1>WagerWhiz</h1>
      {isTrial ? (
        <p>Your 7-day free trial ends on {trialEndDate.toLocaleDateString()}</p>
      ) : (
        <p>Your trial period has expired. Please subscribe to continue using the app.</p>
      )}
      {/* Render other components based on trial status */}
    </div>
  );
}

export default App;
