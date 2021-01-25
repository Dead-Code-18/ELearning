import React from "react";
import { Link } from "react-router-dom";
import {Nav, Form, Button, FormControl} from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";


const Header = () => {
  return (
    <div className="mt-2 mb-3">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="#home">E-Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link href="#features">My Courses</Nav.Link>
          </Nav>
          <Nav className="ml-auto">
            <Nav.Link href="#deets">Profile</Nav.Link>
            <Nav.Link href="/auth/signup">Signup</Nav.Link>
            <Nav.Link href="/auth/login">Login</Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};
export default Header;
