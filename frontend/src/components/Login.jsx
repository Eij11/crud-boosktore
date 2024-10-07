import React, { useState } from "react";
import axios from "axios";
import { useSnackbar } from "notistack";
import { Link, useNavigate } from "react-router-dom";

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";

const Login = ({ onClose, show }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //window pop ups
  const { enqueueSnackbar } = useSnackbar();
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    const data = {
      email,
      password,
    };
    axios
      .post("http://localhost:5100/api/accounts/login", data)
      .then((res) => {
        console.log(res);
        if (res.data.token && res.data.role) {
          localStorage.setItem("token", res.data.token); // Store the JWT token
          localStorage.setItem("role", res.data.role); // Store the role (admin/user)

          // navigate("/mdrrmc/dashboard"); // Redirect to dashboard
          enqueueSnackbar("Logged in successfully!", { variant: "success" });
          navigate("/home");
          window.location.reload(true);
          onClose();
        }
        setEmail("");
        setPassword("");
      })
      .catch((err) => {
        console.log(err);
        enqueueSnackbar(`Error: ${err.response.data.message}`, {
          variant: "error",
        });
      });
  };

  return (
    <div>
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title className="bg-primary border rounded-pill px-5 text-white">
            Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="email"
                placeholder=""
                autoFocus
                value={email} // Bind email to state
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder=""
                autoFocus
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                required
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleLogin}>
            Login
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Login;
