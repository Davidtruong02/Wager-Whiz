import React from "react";
import { useMediaQuery } from "react-responsive";

function LoggedIn() {
  const isMobile = useMediaQuery({ query: "(max-width: 930px)" });
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
        <h2 style={isMobile ? { marginTop: "20px" } : {}}>
          {isMobile
            ? "Click on the dropdown menu, then current board to see a list of today's sports and import their cards"
            : "Click on the current board to see a list for todays sports and import their cards"}
        </h2>
      </div>
    </>
  );
}

export default LoggedIn;
