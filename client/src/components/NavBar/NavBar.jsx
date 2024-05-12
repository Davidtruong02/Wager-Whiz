import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";
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
    default:
      // If the sport isn't in the mapping, return a default icon
      return faQuestion;
  }
}

function NavBar({ handleSignUpModalOpen, setSelectedSport, setShowMyPicks }) {
  const isMobile = useMediaQuery({ query: "(max-width: 344px)" });
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
      expand="lg" // Navbar will expand at the "lg" breakpoint (992px by default)
    >
      <div style={{ display: "flex", alignItems: "center" }}>
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
      </div>
      <Navbar.Toggle
        aria-controls="responsive-navbar-nav"
        style={{ backgroundColor: "white" }}
      />
      <Navbar.Collapse
        id="responsive-navbar-nav"
        className="justify-content-end"
      >
        <div style={{ flex: 1, textAlign: "center" }}>
          {loggedIn && (
            <Navbar.Text className="text-white">
              Welcome, {username}!!
            </Navbar.Text>
          )}
        </div>
        <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
          {loggedIn && (
            <>
              <Nav.Item>
                <Nav.Link
                  onClick={() => setShowMyPicks(true)}
                  style={{ color: "white" }}
                >
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
            {loggedIn ? (
              <>
                <NavDropdown.Item
                  key="MLB"
                  onClick={async () => {
                    const sport = "mlb";
                    console.log("Sport selected: " + sport);
                    setSelectedSport(sport);
                    try {
                      const response = await Axios.get(
                        `/api/playerRoutesMLB/${sport}`
                      );
                      console.log(response.data); // Log the response data for debugging
                    } catch (error) {
                      console.error("Error fetching MLB players:", error);
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={getSportIcon("MLB")}
                    style={{ color: "white" }}
                  />{" "}
                  MLB
                </NavDropdown.Item>
                <NavDropdown.Item
                  key="NBA"
                  onClick={async () => {
                    const sport = "nba";
                    console.log("Sport selected: " + sport);
                    setSelectedSport(sport); // Update the selected sport to NBA
                    try {
                      const response = await Axios.get(
                        `/api/playerRoutesNBA/${sport}`
                      );
                      console.log(response.data); // Log the response data for debugging
                    } catch (error) {
                      console.error("Error fetching NBA players:", error);
                    }
                  }}
                >
                  <FontAwesomeIcon
                    icon={getSportIcon("NBA")}
                    style={{ color: "white" }}
                  />{" "}
                  NBA
                </NavDropdown.Item>
              </>
            ) : (
              <NavDropdown.Item disabled>
                Please log in to see options
              </NavDropdown.Item>
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
      </Navbar.Collapse>{" "}
    </Navbar>
  );
}

export default NavBar;
