import React, { useState, useEffect } from "react";
import NavTop from "./NavTop";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";


const CourseDetails = (props) => {
  const course = props.location.state.course;
  const [contentList, setContentList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/course/content/getAllContent", {
        params: {
          courseID: course._id,
        },
      })
      .then((res) => {
        setContentList(res.data);
      });
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios.post("http://localhost:3000/course/content/upload", formData, {
      params: {
        userID: props.auth.user.id,
        courseID: course._id
      },
    });
  };

  console.log(props);

  const setContents = (contentList) => {
    var contents = [];
    var i;
    for (i = 0; i < contentList.length; i++) {
      contents.push(
        <div key={contentList[i]._id} className="mt-3">
          <hr />
          <Link
            to={{
              pathname: `/course/content/view/${contentList[i].aliases}`,
              state: { content: contentList[i] },
            }}
          >
            <p>{contentList[i].aliases}</p>
          </Link>
          <p>uploaded at: {contentList[i].uploadDate}</p>
        </div>
      );
    }
    return contents;
  };


  const setUploadForm = (props) => {
    if(props.auth.role === "teacher" && props.location.state.ownerAccess===true){
      return (
        <div className="padding container-fluid d-flex justify-content-center">
          <form noValidate onSubmit={(e) => onSubmit(e)}>
            <div className="form-group mb-4">
              <label htmlFor="file"></label>
              <input
                onChange={(e) => setSelectedFile(e.target.files[0])}
                id="file"
                type="file"
                className="form-control btn-block"
                placeholder="Enter File"
              />
              <input
                type="submit"
                className="btn btn-primary text-white py-2 px-4 btn-block"
                value="Upload"
              />
            </div>
          </form>
        </div>
      );
    }else{
      <></>
    }
    
  }

  return (
    <div className="container">
      <NavTop />
      <div className=" align-items-center mt-5 mb-3">
        <h4 className="text-center">{course.name}</h4>
      </div>
      <div className="jumbotron">
        <div className=" align-items-center mt-5 mb-3">
          <h4 className="text-left">Course Details</h4>
          <hr />
        </div>
        <div className=" align-items-center mb-3">
          <p className="text-left">Created at: {course.createdAt}</p>
        </div>
        <div className=" align-items-center mb-3">
          <p className="text-left">Instructor: {course.instructorName}</p>
        </div>
        <div className=" align-items-center mb-3">
          <p className="text-left">Description: {course.description}</p>
        </div>
        <div className=" align-items-center mb-3">
          <p className="text-left">Requirements: {course.requirements}</p>
        </div>
      </div>
      <div className="jumbotron">
        <div className=" align-items-center mt-5 mb-3">
          <h4 className="text-left">Course Contents</h4>
          <hr />
        </div>
        <div className=" mb-50">{setContents(contentList)}</div>
      </div>

      {setUploadForm(props)}
    </div>
  );

  
};



const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseDetails);
