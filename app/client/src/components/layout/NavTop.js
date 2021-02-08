import React from "react";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Navbar from "react-bootstrap/Navbar";
import { logoutUser, getUserRole } from "../../actions/auth.action";
import "bootstrap/dist/css/bootstrap.min.css";

const NavTop = (props) => {
  return (
    <div className="mt-2 mb-3">
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Brand href="/">E-Learning</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="mr-auto">{renderLeftNavitems(props)}</Nav>
          <Nav className="ml-auto">{randerRightNavItems(props)}</Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

const renderLeftNavitems = (props) => {
  if (props.auth.isAuthenticated === true) {
    if (props.auth.role === null || props.auth.role === undefined) {
      console.log("calling getRole");
      props.getRole(props.auth.user.id);
    } else {
      if (props.auth.role === "student") {
        return (
          <>
            <NavLink
              className="navbar-dark navbar-nav nav-link customLink"
              to="/course/list"
            >
              My Courses
            </NavLink>
            <NavLink
              className="navbar-dark navbar-nav nav-link customLink"
              to="/profile/instructor"
            >
              Become an instructor
            </NavLink>
          </>
        );
      }
      return (
        <>
          <NavLink
            style={{ color: "rgba(255,255,255,.5)" }}
            className="navbar-dark navbar-nav nav-link"
            to="/course/list"
          >
            My Courses
          </NavLink>
          <NavLink
            style={{ color: "rgba(255,255,255,.5)" }}
            className="navbar-dark navbar-nav nav-link"
            to="/course/create"
          >
            Upload Courses
          </NavLink>
        </>
      );
    }
  }
};

const randerRightNavItems = (props) => {
  if (props.auth.isAuthenticated === true) {
    return (
      <>
        <NavLink
          className="navbar-dark navbar-nav nav-link"
          to="/profile/details"
        >
          Profile
        </NavLink>
        <Button variant="outline-secondary" onClick={() => props.logout()}>
          Logout
        </Button>
      </>
    );
  }

  return (
    <>
      <NavLink className="navbar-dark navbar-nav nav-link" to="/auth/signup">
        Signup
      </NavLink>
      <NavLink className="navbar-dark navbar-nav nav-link" to="/auth/login">
        Login
      </NavLink>
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
    getRole: (userID) => {
      dispatch(getUserRole(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavTop);
