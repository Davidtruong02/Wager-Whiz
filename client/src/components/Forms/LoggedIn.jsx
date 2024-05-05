import React from "react";

function LoggedIn() {
  return (
    <>
      <div
        className="signInHomeContainer"
        style={{
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 4px #000000",
          marginTop: "15%",
        }}
      >
        <h1>Welcome!</h1>
        <h2>
          Click on the current board to see a list for todays sports and import
          their cards
        </h2>
      </div>
    </>
  );
}

export default LoggedIn;
