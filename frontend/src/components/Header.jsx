import React, { useState, useEffect } from "react";

import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import logo from "../assets/MDRRMC Paniqui.jpg";
// import "./header.css";

import Login from "./Login.jsx";
const Header = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [loginBtnState, setLoginBtnState] = useState("Login");
  const [isAdmin, setIsAdmin] = useState(false);

  const navigate = useNavigate();

  const handleShowModal = () => setShowLoginModal(true);
  const handleCloseModal = () => setShowLoginModal(false);

  // Function to handle Login/Logout toggle
  const handleLoginLogout = () => {
    if (loginBtnState === "Logout") {
      // Perform logout
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      setIsAdmin(false); // Reset admin state
      setLoginBtnState("Login"); // Set button text back to 'Login'
      navigate("/"); // Redirect to home or login page
    } else {
      // Show login modal if user wants to log in
      setShowLoginModal(true);
    }
  };

  // Check if user is logged in and has the admin role
  useEffect(() => {
    const role = localStorage.getItem("role");
    if (role === "admin") {
      setIsAdmin(true); // Set state to true if user is an admin
      setLoginBtnState("Logout");
    } else if (localStorage.getItem("token")) {
      setLoginBtnState("Logout"); // Set to Logout if token is present
    } else {
      setLoginBtnState("Login");
      setIsAdmin(false);
    }
  }, []);
  return (
    <div>
      <Navbar expand="lg" className="navbar-top  w-100 mt-3">
        <Container className="text-color border border-white rounded bg-light-subtle py-1 px-5 shadow-sm">
          <Navbar.Brand href="#">
            <img
              src={logo}
              alt=""
              style={{ height: "40px", marginRight: "10px" }}
            />
          </Navbar.Brand>

          <Navbar.Brand className="text-color">
            <div className="dropdown">
              <Link
                className="btn dropdown-toggle rounded-pill"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                to="#" // Keep it as '#' or a specific route if needed
              >
                MDRRMC - Paniqui
              </Link>
              {isAdmin && (
                <ul className="dropdown-menu">
                  <li>
                    <Link className="dropdown-item" to={"/mdrrmc/dashboard"}>
                      Dashboard
                    </Link>
                  </li>
                </ul>
              )}
            </div>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 w-75 d-flex justify-content-center"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/mdrrmc/about"}>
                About
              </Nav.Link>
              <Nav.Link href="#announcement-section">Announcements</Nav.Link>
            </Nav>
            <Form className="d-flex justify-content-start">
              <Button
                variant="outline-primary"
                className="btn-login rounded-pill"
                onClick={handleLoginLogout}
                style={{ width: "100px" }}
              >
                {loginBtnState}
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Login onClose={handleCloseModal} show={showLoginModal} />
    </div>
  );
};

export default Header;
