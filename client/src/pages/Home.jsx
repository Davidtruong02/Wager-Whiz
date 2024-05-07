import React, { useState, useEffect } from "react";
import "../App.css";
import NavBar from "../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import LoggedOut from "../components/Forms/LoggedOut";
import LoggedIn from "../components/Forms/LoggedIn";
import CardPanel from "../components/Forms/CardPanel";
import Auth from "../utils/auth";
import SignUpModal from "../components/Modal/SignUpModal"; // import your SignUpModal component

function Home() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false); // add this state

  useEffect(() => {
    const loggedIn = Auth.loggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const username = Auth.getProfile();
      setUsername(username);
    }
  }, []);

  const handleSignUpClick = () => {
    // add this function
    setShowSignUpModal(true);
  };

  const handleClose = () => {
    // add this function
    setShowSignUpModal(false);
  };

  return (
    <>
      <NavBar
        setSelectedSport={setSelectedSport}
        onSignUpClick={handleSignUpClick}
      />{" "}
      {/* pass the handleSignUpClick function as a prop */}
      {!loggedIn && <LoggedOut />}
      {loggedIn && !selectedSport && <LoggedIn />}
      {loggedIn && selectedSport && <CardPanel selectedSport={selectedSport} />}
      <SignUpModal show={showSignUpModal} handleClose={handleClose} />{" "}
      {/* add the SignUpModal component */}
    </>
  );
}

export default Home;
