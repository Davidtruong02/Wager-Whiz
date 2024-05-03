import React, { useState } from "react";
import Nav from "react-bootstrap/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Navbar from "react-bootstrap/Navbar";
import Image from "react-bootstrap/Image";
import Icon from "../../images/fantasySports.jpg";
import Button from "react-bootstrap/Button";
import SignUpModal from "../Modal/SingUpModal";
import SignInModal from "../Modal/SignInModal";

function Header() {
  const handleSelect = (eventKey) => alert(`selected ${eventKey}`);

  const [showSignUpModal, setShowSignUpModal] = useState(false);
  const [showSignInModal, setShowSignInModal] = useState(false);

  const handleSignUpModalClose = () => setShowSignUpModal(false);
  const handleSignUpModalShow = () => setShowSignUpModal(true);

  const handleSignInModalClose = () => setShowSignInModal(false);
  const handleSignInModalShow = () => setShowSignInModal(true);

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
      <Nav variant="pills" activeKey="1" onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="2" title="Item" style={{ color: "white" }}>
            Current Board
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="2" style={{ color: "white" }}>
            My Picks
          </Nav.Link>
        </Nav.Item>
        <NavDropdown
          title={<span style={{ color: "white" }}>Sports</span>}
          id="nav-dropdown"
          style={{ color: "white" }}
        >
          <NavDropdown.Item eventKey="4.1">Action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.2">Another action</NavDropdown.Item>
          <NavDropdown.Item eventKey="4.3">
            Something else here
          </NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item eventKey="4.4">Separated link</NavDropdown.Item>
        </NavDropdown>
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
        />
        <Button variant="secondary" onClick={handleSignUpModalShow}>
          Sign Up
        </Button>
        <SignUpModal
          show={showSignUpModal}
          handleClose={handleSignUpModalClose}
        />
      </Nav>
    </Navbar>
  );
}

export default Header;
