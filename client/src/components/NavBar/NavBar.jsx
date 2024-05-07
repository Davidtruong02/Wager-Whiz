import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Icon from "../../images/fantasySports.jpg";
import Button from "react-bootstrap/Button";
import SignInModal from "../Modal/SignInModal";
import SignUpModal from "../Modal/SignUpModal";
import CardPanel from "../Forms/CardPanel";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faBaseballBall,
  faHockeyPuck,
  faGamepad,
  faQuestion,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "../../utils/auth";
import Axios from "axios";

function getSportIcon(sport) {
  switch (sport.toLowerCase()) {
    case "nba":
      return faBasketballBall;
    case "mlb":
      return faBaseballBall;
    case "nfl":
      return faFootballBall;
    case "nhl":
      return faHockeyPuck;
    default:
      // If the sport isn't in the mapping, return a default icon
      return faQuestion;
  }
}

function NavBar({ handleSignUpModalOpen, setSelectedSport }) {
  const [loading, setLoading] = useState(true);
  const [loggedIn, setIsLoggedIn] = useState(false);
  const [sports, setSports] = useState([]);
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  const [username, setUsername] = useState("");
  const [showSignInModal, setShowSignInModal] = useState(false);
  const [showSignUpModal, setShowSignUpModal] = useState(false);

  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };

  const handleSignUpClick = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  const handleSignInModalClose = () => setShowSignInModal(false);
  const handleSignInModalShow = () => {
    console.log("handleSignInModalShow called"); // Debug log
    setShowSignInModal(true);
  };

  const handleSignUpModalClose = () => setShowSignUpModal(false); // Define handleSignUpModalClose here
  const handleSignUpModalShow = () => {
    console.log("handleSignUpModalShow called"); // Debug log
    setShowSignUpModal(true); // Fixed line
    setShowSignInModal(false);
  };

  useEffect(() => {
    console.log("showSignInModal:", showSignInModal); // Debug log
  }, [showSignInModal]);

  useEffect(() => {
    console.log("showSignUpModal:", showSignUpModal); // Debug log
  }, [showSignUpModal]);

  useEffect(() => {
    Axios.get("/api/sports")
      .then((response) => {
        setSports(response.data);
        setLoading(false); // Set loading to false when the data has been fetched
      })
      .catch((error) => {
        console.error("Error fetching sports:", error);
        setLoading(false); // Also set loading to false if there's an error
      });

    const loggedIn = Auth.loggedIn();
    setIsLoggedIn(loggedIn);
    if (loggedIn) {
      const username = Auth.getProfile();
      setUsername(username);
    }
  }, []);

  return (
    <Navbar
      className="justify-content-between mx-3"
      style={{ backgroundColor: "#1d1e22" }}
    >
      <Navbar.Brand href="#home">
        <Image
          src={Icon}
          width="30"
          height="30"
          className="d-inline-block align-top"
          alt="React Bootstrap logo"
        />{" "}
        <span className="text-white">WagerWhiz</span>
      </Navbar.Brand>
      {loggedIn && (
        <Navbar.Text className="text-white">Welcome, {username}!!</Navbar.Text>
      )}
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
        {loggedIn && (
          <>
            <Nav.Item>
              <Nav.Link eventKey="2" style={{ color: "white" }}>
                My Picks
              </Nav.Link>
            </Nav.Item>
          </>
        )}
        <NavDropdown
          title={<span style={{ color: "white" }}>Current Board</span>}
          id="nav-dropdown"
          style={{ color: "#1d1e22" }}
          className="currentBoard"
          onClick={() => {
            if (!loggedIn) {
              handleSignInModalShow();
            }
          }}
        >
          {loggedIn &&
            (loading ? (
              <div>Loading...</div> // Replace this with a loading spinner or any other loading indicator
            ) : (
              sports.map((sport) => {
                return (
                  <NavDropdown.Item
                    key={sport._id}
                    onClick={() => {
                      console.log("Sport selected:", sport.sport);
                      setSelectedSport(sport.sport); // Update the selected sport
                    }}
                  >
                    <FontAwesomeIcon
                      icon={getSportIcon(sport.sport)}
                      style={{ color: "white" }}
                    />{" "}
                    {sport.sport}
                  </NavDropdown.Item>
                );
              })
            ))}
        </NavDropdown>
        {loggedIn && (
          <Button
            variant="secondary"
            onClick={handleLogout}
            className="ml-auto"
          >
            Logout
          </Button>
        )}
        {!loggedIn && (
          <>
            <Button
              variant="secondary"
              onClick={handleSignUpModalShow}
              className="mr-2"
            >
              Sign Up
            </Button>
            <Button
              variant="primary"
              onClick={handleSignInModalShow}
              className="mr-2"
            >
              Sign In
            </Button>
            <SignInModal
              show={showSignInModal}
              handleClose={handleSignInModalClose}
              handleSignUpClick={handleSignUpClick} // Pass handleSignUpClick as a prop here
            />
            <SignUpModal
              show={showSignUpModal}
              handleClose={handleSignUpModalClose}
            />
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
