import React, { useState, useEffect } from "react";
import { useMediaQuery } from "react-responsive";
import { Link } from "react-router-dom";
import { useMutation, ApolloError } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import "../../App.css";
import Auth from "../../utils/auth";

function SignInModal({ show, handleClose, handleSignUpClick }) {
  const isMobile = useMediaQuery({ query: "(max-width: 430px)" });
  const [formState, setFormState] = useState({ email: "", password: "" });
  const [login, { error, data }] = useMutation(LOGIN_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleSignInClick = async (event) => {
    event.preventDefault();
    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login(data.login.token);
      handleClose();
    } catch (e) {
      if (e instanceof ApolloError) {
        console.error(e.message);
        e.graphQLErrors.map(({ message, extensions }) => {
          if (extensions.code === "UNAUTHENTICATED") {
            // Handle authentication error
          }
        });
      } else {
        console.error(e);
      }
    }

    // clear form values
    setFormState({
      email: "",
      password: "",
    });
  };

  useEffect(() => {
    console.log("show prop:", show); // Step 3
  }, [show]);

  console.log(handleSignUpClick); // Add this line in SignInModal component

  return (
    <div style={{ padding: isMobile ? "10px" : "20px" }}>
      <Modal show={show} onHide={handleClose} className="signInModal">
        <Modal.Header closeButton>
          <Modal.Title>Sign In</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Enter email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                autoFocus
                name="email"
                value={formState.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                autoFocus
                name="password"
                value={formState.password}
                onChange={handleChange}
              />
            </Form.Group>
            <p>
              Don't have an account, not a problem. Click{" "}
              <Link to="#" onClick={handleSignUpClick}>
                here
              </Link>{" "}
              to sign up!
            </p>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSignInClick}>
            Sign In
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default SignInModal;
