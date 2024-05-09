import { useState, useRef, useEffect } from "react";
import { gql } from "@apollo/client";
import { Link } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth.js";
import { CHECK_USERNAME } from "../../utils/queries.js";
import { ADD_USER } from "../../utils/mutations.js";
import { SIGNUP_USER } from "../../utils/mutations";
import TOS from "../Modal/TOS.jsx";
import "../../App.css";
import "../../App.jsx";

// Sign Up Modal
function SignUpModal({ show, handleClose }) {
  const [formState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [shouldClose, setShouldClose] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);
  const [tosChecked, setTosChecked] = useState(false);
  const [tosModalShow, setTosModalShow] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading, error, data } = useQuery(CHECK_USERNAME, {
    variables: { username: formState.username },
  });

  useEffect(() => {
    if (data?.user?.username) {
      setUsernameExists(true);
    } else {
      setUsernameExists(false);
    }
  }, [data]);

  useEffect(() => {
    if (usernameExists) {
      usernameRef.current.focus();
    }
  }, [usernameExists]);

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormState({
      ...formState,
      [name]: value,
    });
  };

  const handleFormSubmit = async () => {
    if (formState.password !== formState.confirmPassword) {
      setPasswordsMatch(false);
      passwordRef.current.focus();
      return false;
    }

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token, formState.username);
      return true;
    } catch (error) {
      console.log("An error occurred while creating the user:", error);
      return false;
    }
  };

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [shouldClose, handleClose]);

  const stripePromise = loadStripe(
    "pk_test_51PELwo02NrnR8qBBNEnb3SZo0100bZxh3mCxWD0I9VhnJLNYOvZv5GAnH9ZzkSDvXYa0G7GAHc3KiZhFJGj6Wkqh00wY6SyI2D"
  );

  stripePromise.then((stripe) => {
    const elements = stripe.elements();

    const cardElement = elements.create("card");

    cardElement.mount("#card-element");

    cardElement.on("Sign Up", (event) => (res) => {
      res.redirectToCurrentBoard({ sessionId: data.currentBoard.session });
    });
  });

  return (
    <>
      <Modal show={show} onHide={handleClose} className="signUpModal">
        <Modal.Header closeButton>
          <Modal.Title>Sign up</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              {usernameExists && (
                <div className="text-danger">Username already in use</div>
              )}
              <Form.Control
                name="username"
                type="text"
                placeholder="Create a username"
                value={formState.username}
                onChange={handleChange}
                isInvalid={usernameExists}
                ref={usernameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                name="email"
                type="email"
                placeholder="name@example.com"
                value={formState.email}
                onChange={handleChange}
              />
            </Form.Group>
            {!passwordsMatch && (
              <div className="text-danger">Passwords do not match</div>
            )}
            <Form.Group
              className={`mb-3 ${!passwordsMatch ? "text-danger" : ""}`}
              controlId="password"
            >
              <Form.Label>Create a password</Form.Label>
              <Form.Control
                name="password"
                type="password"
                placeholder="Create a password"
                value={formState.password}
                onChange={handleChange}
                isInvalid={!passwordsMatch}
                ref={passwordRef}
              />
            </Form.Group>
            <Form.Group
              className={`mb-3 ${!passwordsMatch ? "text-danger" : ""}`}
              controlId="confirmPassword"
            >
              <Form.Label>Confirm your password</Form.Label>
              <Form.Control
                name="confirmPassword"
                type="password"
                placeholder="Match previous password"
                value={formState.confirmPassword}
                onChange={handleChange}
                isInvalid={!passwordsMatch}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Container
          style={{ padding: "10px" }}
          className="d-flex justify-content-center"
        >
          <Form.Check
            type="checkbox"
            required
            checked={tosChecked}
            onChange={(e) => setTosChecked(e.target.checked)}
            disabled
            label={
              <>
                I agree to the{" "}
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    setTosModalShow(true);
                  }}
                >
                  Terms of Service
                </a>
              </>
            }
          />
        </Container>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          {!tosChecked ? (
            <Button variant="secondary" disabled>
              Create user!
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={async () => {
                const userCreated = await handleFormSubmit();
                if (userCreated) {
                  handleClose();
                }
              }}
            >
              Create user!
            </Button>
          )}
        </Modal.Footer>
        <TOS
          show={tosModalShow}
          onHide={() => setTosModalShow(false)}
          setTosModalShow={setTosModalShow}
          tosChecked={tosChecked}
          setTosChecked={setTosChecked}
        />
      </Modal>
    </>
  );
}

export default SignUpModal;
