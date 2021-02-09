import React from "react";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
const Course = (props) => {
  const { _id,name, description, instructor, createdAt } = props.course;
  const courseDetailsLinkData = {
    pathname: `/course/details/${props.course._id}`,
    state: { course: props.course, ownerAccess: props.ownerAccess, searchedCourse: props.searchedCourse },
  };
  const courseBuyLinkData = {
    pathname: `/course/buy/${props.course._id}`,
    state: {
      courseID: _id,
    },
  };
  return (
    <div className="col-md-4 mt-2">
      <div className="card">
        <div className="card-body bg-light text-center">
          <div className="mb-2">
            <h4 className="font-weight-semibold mb-2">
              <Link to={courseDetailsLinkData}>{name}</Link>
            </h4>
            <hr />
            <div className="text-muted  text-left mb-3">
              instrucor:{instructor}
            </div>
          </div>
          <p className="text-muted text-left" data-abc="true">
            description: {description}
          </p>
          <div className="text-muted  text-left mb-3">created:{createdAt}</div>
          {props.searchedCourse === true ? (
            <div className=" align-items-center mb-3">
              <NavLink
                className="navbar-dark navbar-nav nav-link"
                to={courseBuyLinkData}
              >
                <Button className="p-0" variant="outline-secondary">
                  Purchase
                </Button>
              </NavLink>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  );
};

export default Course;
