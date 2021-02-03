import React from "react";
import { connect } from "react-redux";
import { Nav, Button } from "react-bootstrap";
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
    if (props.auth.role === null) {
      props.getRole(props.auth.user.id);
    } else {
      if (props.auth.role === "student") {
        return (
          <>
            <Nav.Link href="#features">My Learning</Nav.Link>
            <Nav.Link href="#features">Become an instructor</Nav.Link>
          </>
        );
      }
      return (
        <>
          <Nav.Link href="#features">My Courses</Nav.Link>
          <Nav.Link href="#features">Upload Courses</Nav.Link>
        </>
      );
    }
  }
};

const randerRightNavItems = (props) => {
  if (props.auth.isAuthenticated === true) {
    return (
      <>
        <Nav.Link href="/profile/details">Profile</Nav.Link>
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
    getRole: (userID) => {
      dispatch(getUserRole(userID));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(NavTop);
