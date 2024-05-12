import React, { useState, useEffect } from "react";
import "../App.css";
import NavBar from "../components/NavBar/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import LoggedOut from "../components/Forms/LoggedOut";
import LoggedIn from "../components/Forms/LoggedIn";
import CardPanel from "../components/Forms/CardPanel";
import MyPicks from "../components/Forms/MyPicks";
import Auth from "../utils/auth";
import SignUpModal from "../components/Modal/SignUpModal"; // import your SignUpModal component

function Home() {
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [username, setUsername] = useState("");
  const [selectedSport, setSelectedSport] = useState(null);
  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showMyPicks, setShowMyPicks] = useState(false);

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
        setSelectedSport={(sport) => {
          setSelectedSport(sport);
          setShowMyPicks(false);
        }}
        onSignUpClick={handleSignUpClick}
        setShowMyPicks={() => {
          setShowMyPicks(true);
          setSelectedSport(null);
        }}
      />{" "}
      {!loggedIn && <LoggedOut />}
      {loggedIn && !selectedSport && !showMyPicks && <LoggedIn />}
      {loggedIn && selectedSport && <CardPanel selectedSport={selectedSport} />}
      {loggedIn && showMyPicks && <MyPicks />}
      <SignUpModal show={showSignUpModal} handleClose={handleClose} />{" "}
    </>
  );
}

export default Home;
