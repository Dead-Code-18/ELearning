import React, { useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Course from "./Course";



function CourseList (props) {
    return (
      <section className="courselist">
        {courses.map((course) => {
          return <Course key={course.id} course={course} />;
        })}
      </section>
    );
}

export default BookList;
