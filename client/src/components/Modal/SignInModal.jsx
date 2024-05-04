import React from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../App.css";

function SignInModal({ show, handleClose, handleSignUpModalOpen }) {
  const handleSignUpClick = () => {
    handleClose(); // Close the login modal
    handleSignUpModalOpen(); // Open the sign up modal
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} className="signInModal">
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoFocus
              />
            </Form.Group>
            <p>
              Don't have an account, not a problem. Click{" "}
              <span
                style={{ color: "#6666ff", cursor: "pointer" }}
                onClick={handleSignUpClick}
              >
                here
              </span>{" "}
              to sign up!
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignInModal;
