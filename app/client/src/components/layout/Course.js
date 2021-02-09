import React from "react";
import { Link } from "react-router-dom";
const Course = (props) => {
  const { name, description, instructor, createdAt } = props.course;
  console.log(props);
  const linkDetails = {
    pathname: `/course/details/${props.course._id}`,
    state: { course: props.course, ownerAccess: props.ownerAccess },
  };
  return (
    <div className="col-md-4 mt-2">
      <div className="card">
        <div className="card-body bg-light text-center">
          <div className="mb-2">
            <h4 className="font-weight-semibold mb-2">
              <Link to={linkDetails}>{name}</Link>
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
        </div>
      </div>
    </div>
  );
};

export default Course;
