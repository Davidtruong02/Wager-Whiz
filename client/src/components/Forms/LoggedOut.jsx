import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClover } from "@fortawesome/free-solid-svg-icons";

function LoggedOut() {
  return (
    <>
      <div
        className="signOutHomeContainer"
        style={{
          //   backgroundColor: "rgba(29, 30, 34, 0.5)",
          textAlign: "center",
          color: "white",
          textShadow: "2px 2px 4px #000000",
          marginTop: "10%",
        }}
      >
        <h1 style={{ fontSize: "75px" }}>Welcome to WagerWhiz</h1>
        <h2>
          WagerWhiz is a sports betting tool that helps users make smarter
          betting decisions on upcoming games. Be better informed when placing
          that next bet.
        </h2>
        <h3>
          If you are new to the site, go ahead and sign up. If this isn't you're
          fist time here, you know what to do.
        </h3>
        <h4>
          <FontAwesomeIcon icon={faClover} style={{ color: "green" }} /> Good
          Luck!! <FontAwesomeIcon icon={faClover} style={{ color: "green" }} />
        </h4>
      </div>
    </>
  );
}

export default LoggedOut;
