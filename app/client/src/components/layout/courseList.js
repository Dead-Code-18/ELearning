import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Course from "./Course";
import NavTop from "./NavTop";

function CourseList(props) {
  const [ownedCourseList, setOwnedCourseList] = useState([]);
  const [uploadedCourseList, setUploadedCourseList] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3000/course/getOwnedCourse", {
        params: {
          userID: props.auth.user.id,
        },
      })
      .then((courses) => {
        setOwnedCourseList(courses.data);
      });

      if (props.auth.role === "teacher") {
        axios
          .get("http://localhost:3000/course/getUploadedCourse", {
            params: {
              instructorID: props.auth.user.id,
            },
          })
          .then((courses) => {
            setUploadedCourseList(courses.data);
          });
      }
  }, []);



  if (ownedCourseList === null || uploadedCourseList === null) {
    return <h2>Loading</h2>;
  } else {
    return (
      <div className="container">
        <NavTop />
        {RenderCourseList(props, ownedCourseList, uploadedCourseList)}
      </div>
    );
  }
}

const RenderCourseList = (props, ownedCourseList, uploadedCourseList) => {
  if (ownedCourseList.length === 0) {
    return (
      <div className=" align-items-center mt-5 mb-3">
        <h4 className="text-left">Course Owned</h4>
        <hr />
        <p>You have no course available</p>
        {props.auth.role === "teacher" ? (
          RenderUploadedCourseList(uploadedCourseList)
        ) : (
          <></>
        )}
      </div>
    );
  } else {
    return (
      <div>
        <div className="container">
          <div className=" align-items-center mt-5 mb-3">
            <h4 className="text-left">Course Owned</h4>
            <hr />
          </div>
          <div className="row">{setOwnedCourses(ownedCourseList)}</div>
        </div>
        {props.auth.role === "teacher" ?  RenderUploadedCourseList(uploadedCourseList)  : <></>}
      </div>
    );
  }
};

const RenderUploadedCourseList = (uploadedCourseList) => {
  return (
    <div className="container">
      <div className=" align-items-center mt-5 mb-3">
        <h4 className="text-left">Course Uploaded</h4>
        <hr />
      </div>
      {uploadedCourseList.length === 0 ? (
        <p>You have not uploaded any course yet</p>
      ) : (
        <div className="row">{setUploadedCourses(uploadedCourseList)}</div>
      )}
    </div>
  );
};

const setOwnedCourses = (ownedCourseList) => {
  var courses = [];
  var i;
  for (i = 0; i < ownedCourseList.length; i++) {
    courses.push(
      <Course
        key={ownedCourseList[i].id}
        course={ownedCourseList[i]}
        ownerAccess={false}
        searchedCourse={false}
      ></Course>
    );
  }
  return courses;
};

const setUploadedCourses = (uploadedCourseList) => {
  var courses = [];
  var i;
  for (i = 0; i < uploadedCourseList.length; i++) {
    courses.push(
      <Course
        key={uploadedCourseList[i].id}
        course={uploadedCourseList[i]}
        ownerAccess = {true}
        searchedCourse = {false}
      ></Course>
    );
  }
  return courses;
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseList);
