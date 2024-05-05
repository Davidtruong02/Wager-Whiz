import React, { useState, useEffect } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Icon from "../../images/fantasySports.jpg";
import Button from "react-bootstrap/Button";
import SignUpModal from "../Modal/SignUpModal";
import SignInModal from "../Modal/SignInModal";
import "../../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBasketballBall,
  faBaseballBall,
  faHockeyPuck,
  faGamepad,
} from "@fortawesome/free-solid-svg-icons";
import Auth from "../../utils/auth";

function Header() {
  const [loggedIn, setIsLoggedIn] = useState(false);

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

  const handleSignUpModalOpen = () => {
    setShowSignInModal(false);
    setShowSignUpModal(true);
  };

  useEffect(() => {
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
          <NavDropdown.Item
            onClick={() => !loggedIn && handleSignInModalShow()}
          >
            <FontAwesomeIcon
              icon={faBasketballBall}
              style={{ color: "orange" }}
            />{" "}
            NBA
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => !loggedIn && handleSignInModalShow()}
          >
            <FontAwesomeIcon icon={faBaseballBall} style={{ color: "red" }} />{" "}
            MLB
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => !loggedIn && handleSignInModalShow()}
          >
            <FontAwesomeIcon icon={faHockeyPuck} style={{ color: "blue" }} />{" "}
            NHL
          </NavDropdown.Item>
          <NavDropdown.Item
            onClick={() => !loggedIn && handleSignInModalShow()}
          >
            <FontAwesomeIcon icon={faGamepad} style={{ color: "grey" }} /> CSGO
          </NavDropdown.Item>
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

export default Header;
