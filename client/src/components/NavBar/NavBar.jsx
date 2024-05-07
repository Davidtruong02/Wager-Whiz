import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Icon from "../../images/fantasySports.jpg";
import Button from "react-bootstrap/Button";
import SignUpModal from "../Modal/SignUpModal";
import SignInModal from "../Modal/SignInModal";
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

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignUpModalClose = () => setShowSignUpModal(false);
  const handleSignUpModalShow = () => setShowSignUpModal(true);
  const handleLogout = () => {
    Auth.logout();
    setIsLoggedIn(false);
  };

  const handleSignInModalClose = () => setShowSignInModal(false);
  const handleSignInModalShow = () => setShowSignInModal(true);

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
        >
          {loading ? (
            <div>Loading...</div> // Replace this with a loading spinner or any other loading indicator
          ) : (
            sports.map((sport) => {
              return (
                <NavDropdown.Item
                  key={sport._id}
                  onClick={() => {
                    console.log("Sport selected:", sport.sport);
                    !loggedIn && handleSignInModalShow();
                    setSelectedSport(sport.sport); // Update the selected sport
                  }}
                >
                  <FontAwesomeIcon
                    icon={getSportIcon(sport.sport)}
                    style={{ color: "orange" }}
                  />{" "}
                  {sport.sport}
                </NavDropdown.Item>
              );
            })
          )}
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
              onClick={handleSignUpModalOpen}
              className="mr-2"
            >
              Sign Up
            </Button>
            <SignUpModal
              show={showSignUpModal}
              handleClose={handleSignUpModalClose}
            />
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
              handleSignUpModalOpen={handleSignUpModalOpen}
            />
          </>
        )}
      </Nav>
    </Navbar>
  );
}

export default NavBar;
