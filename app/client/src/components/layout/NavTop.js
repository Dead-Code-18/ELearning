import React from "react";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import Navbar from "react-bootstrap/Navbar";
import {logoutUser} from "../../actions/auth.action"
import "bootstrap/dist/css/bootstrap.min.css";

const NavTop = (props) => {
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
            {randerNavItems(props)}
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};


const randerNavItems = (props) => {
  if (props.auth.isAuthenticated === true) {
    return (
      <>
        <Nav.Link href="#deets">Profile</Nav.Link>
        <Button variant="outline-secondary" onClick={() => props.logout()}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <Nav.Link href="/auth/signup">Signup</Nav.Link>
      <Nav.Link href="/auth/login">Login</Nav.Link>
    </>
  );
};




const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logoutUser());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavTop);
