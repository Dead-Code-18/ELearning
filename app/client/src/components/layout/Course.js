import React from "react";
import { Link } from "react-router-dom";

const Course = (props) => {
  const { _id,name,instructorName,description, instructor, createdAt } = props.course;
  const courseDetailsLinkData = {
    pathname: `/course/details/${props.course._id}`,
    state: { course: props.course, ownerAccess: props.ownerAccess, searchedCourse: props.searchedCourse },
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
              Instructor:{instructorName}
            </div>
          </div>
          <p className="text-muted text-left" data-abc="true">
            Description: {description}
          </p>
          <div className="text-muted  text-left mb-3">Created at: {createdAt}</div>
        </div>
      </div>
    </div>
  );
};

export default Course;
