import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useMutation, useQuery } from "@apollo/client";
import Auth from "../../utils/auth";
import { CHECK_USERNAME } from "../../utils/queries";
import { ADD_USER } from "../../utils/mutations";

// Sign Up Modal
function SignUpModal({ show, handleClose }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(true);
  const [shouldClose, setShouldClose] = useState(false);
  const [usernameExists, setUsernameExists] = useState(false);

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const { loading, error, data } = useQuery(CHECK_USERNAME, {
    variables: { username },
  });

  console.log("username:", username); // Log the username state
  console.log("data:", data); // Log the data returned from the query

  useEffect(() => {
    if (data?.user?.username) {
      setUsernameExists(true);
      console.log("usernameExists set to true");
    } else {
      setUsernameExists(false);
      console.log("usernameExists set to false");
    }
  }, [data]);

  useEffect(() => {
    if (usernameExists) {
      usernameRef.current.focus();
    }
  }, [usernameExists]);

  const [addUser] = useMutation(ADD_USER);

  const createUser = async () => {
    if (password !== confirmPassword) {
      setPasswordsMatch(false);
      passwordRef.current.focus();
      return false;
    }

    try {
      const { data } = await addUser({
        variables: {
          username,
          email,
          password,
        },
      });

      Auth.login(data.addUser.token);
      return true;
    } catch (error) {
      console.error("An error occurred while creating the user:", error);
      return false;
    }
  };

  useEffect(() => {
    if (shouldClose) {
      handleClose();
    }
  }, [shouldClose, handleClose]);

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="username">
              <Form.Label>Username</Form.Label>
              {usernameExists && (
                <div className="text-danger">Username already in use</div>
              )}
              <Form.Control
                type="text"
                placeholder="Create a username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                isInvalid={usernameExists}
                ref={usernameRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="email">
              <Form.Label>Email address</Form.Label>
              <Form.Control
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
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
                type="password"
                placeholder="Create a password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
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
                type="password"
                placeholder="Match previous password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                isInvalid={!passwordsMatch}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              const userCreated = await createUser();
              if (userCreated) {
                handleClose();
              }
            }}
          >
            Create user!
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default SignUpModal;
