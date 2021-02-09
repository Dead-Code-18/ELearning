import React, { useState } from "react";
import NavTop from "./NavTop";
import Header from "./Header";
import axios from "axios";
import Course from "./Course";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [searchedCourseList, setSearchedCourseList] = useState([]);

  const handleCallBack = (q) => {
    setQuery(q);
    if (query.length > 0) {
      axios
        .get("http://localhost:3000/course/search", {
          params: {
            q: query,
          },
        })
        .then((res) => {
          setSearchedCourseList(res.data);
        })
        .catch();
    }
  };

  const RenderSearchedCourseList = (searchedCourse) => {
    var courses = [];
    var i;
    for (i = 0; i < searchedCourse.length; i++) {
      courses.push(
        <Course
          key={searchedCourse[i].id}
          course={searchedCourse[i]}
          ownerAccess={false}
          searchedCourse={true}
        ></Course>
      );
    }
    return courses;
  };

  return (
    <div className="container">
      <div>
        <NavTop />
        <Header parentCallBack={handleCallBack} />

        {searchedCourseList.length === 0 ? (
          <></>
        ) : (
          <div className="container">
            <div className=" align-items-center mt-5 mb-3">
              <h4 className="text-left">Search Result</h4>
              <hr />
            </div>
            <div className="row">
              {RenderSearchedCourseList(searchedCourseList)}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Landing;
