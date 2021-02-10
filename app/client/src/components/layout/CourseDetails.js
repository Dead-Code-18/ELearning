import React, { useState, useEffect } from "react";
import NavTop from "./NavTop";
import { connect } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { Button } from "react-bootstrap";
import Footer from "./Footer";
import "bootstrap/dist/css/bootstrap.min.css";

const CourseDetails = (props) => {
  const course = props.location.state.course;
  const [contentList, setContentList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [isOwner, setIsOwner] = useState(false);
  const [isViewer, setIsViewer] = useState(false);

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

    if (props.location.state.searchedCourse === true) {
      axios
        .get("http://localhost:3000/course/owner/get", {
          params: {
            courseID: course._id,
          },
        })
        .then((res) => {
          if (res.data === props.auth.user.id) {
            setIsOwner(true);
          }
        });

      axios
        .get("http://localhost:3000/course/id/get", {
          params: {
            userID: props.auth.user.id,
          },
        })
        .then((res) => {
          if (res.data.includes(course._id)) {
            setIsViewer(true);
            console.log(res);
          }
        });
    } else {
      if (props.location.state.ownerAccess === true) {
        setIsOwner(true);
      } else {
        setIsViewer(true);
      }
    }
  }, []);

  console.log(isOwner);
  console.log(isViewer);

  const onSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("file", selectedFile);
    axios
      .post("http://localhost:3000/course/content/upload", formData, {
        params: {
          userID: props.auth.user.id,
          courseID: course._id,
        },
      })
      .then(() => {
        axios
          .get("http://localhost:3000/course/content/getAllContent", {
            params: {
              courseID: course._id,
            },
          })
          .then((res) => {
            setContentList(res.data);
          });
      });
  };

  const courseBuyLinkData = {
    pathname: `/course/buy/${course._id}`,
    state: {
      courseID: course._id,
    },
  };

  const setContents = (contentList) => {
    var contents = [];
    var i;
    for (i = 0; i < contentList.length; i++) {
      contents.push(
        <div key={contentList[i]._id} className="mt-3">
          <hr />
          {isOwner !== true && isViewer !== true ? (
            <NavLink to={courseBuyLinkData}>
              <p>{contentList[i].aliases}</p>
            </NavLink>
          ) : (
            <Link
              to={{
                pathname: `/course/content/view/${contentList[i].aliases}`,
                state: {
                  content: contentList[i],
                  isOwner: isOwner,
                  isViewer: isViewer,
                },
              }}
            >
              <p>{contentList[i].aliases}</p>
            </Link>
          )}

          <p>Uploaded at: {contentList[i].uploadDate}</p>
        </div>
      );
    }
    return contents;
  };

  const setUploadForm = (props) => {
    if (props.auth.role === "teacher" && isOwner === true) {
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
    } else {
      <></>;
    }
  };

  const SetDetails = (course) => {

    const onSubmit = (e) => {
      e.preventDefault();

      const newCourse = {
        price: price,
        description: description,
        requirements: requirement,
      };

      axios
        .post("http://localhost:3000/course/update", newCourse, {
          params: {
            courseID: course._id,
          },
        })
        .then((res) => {
          console.log(res);
          props.history.push("/course/list");
        })
        .catch();
    };
    const [description, setDescription] = useState(course.description);
    const [requirement, setRequirement] = useState(course.requirements);
    const [price, setPrice] = useState(course.price);

    if (isOwner) {
      return (
        <div>
          <div className=" align-items-center mb-3">
            <p className="text-left">Created at: {course.createdAt}</p>
          </div>
          <div className=" align-items-center mb-3">
            <p className="text-left">Instructor: {course.instructorName}</p>
          </div>
          <form noValidate onSubmit={(e) => onSubmit(e)}>
            <div className="row mt-2">
              <div className="form-group col-md-6">
                <label htmlFor="description" className="labels">
                  Description
                </label>
                <input
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  id="description"
                  type="text"
                  placeholder={description}
                  className="form-control"
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <label htmlFor="requirement" className="labels">
                  Requirements
                </label>
                <input
                  value={requirement}
                  onChange={(e) => setRequirement(e.target.value)}
                  id="requirement"
                  type="text"
                  placeholder={requirement}
                  className="form-control "
                />
              </div>
            </div>
            <div className="row mt-3">
              <div className="form-group col-md-12">
                <label htmlFor="price" className="labels">
                  Price
                </label>
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  id="price"
                  type="number"
                  placeholder={price}
                  className="form-control "
                />
              </div>
            </div>
            <div className="form-group mt-5 text-center">
              <input
                type="submit"
                className="btn btn-primary text-white py-2 px-4 btn-block"
                value="Update"
              />
            </div>
          </form>
        </div>
      );
    } else {
      return (
        <>
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
          {isOwner === true || isViewer === true ? (
            <></>
          ) : (
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
          )}
        </>
      );
    }
  };

  return (
    <div className="container">
      <NavTop />
      <div className=" align-items-center mt-5 mb-3">
        <h1 className="text-center">{course.name}</h1>
      </div>
      <div className="jumbotron">
        <div className=" align-items-center mt-5 mb-3">
          <h4 className="text-left">COURSE DETAILS</h4>
          <hr />
        </div>
        {SetDetails(course)}
      </div>
      <div className="jumbotron">
        <div className=" align-items-center mt-5 mb-3">
          <h4 className="text-left">COURSE CONTENTS</h4>
          <hr />
        </div>
        {contentList.length === 0 ? (
          <p>no content uploaded for this course.</p>
        ) : (
          <div className=" mb-50">{setContents(contentList)}</div>
        )}
      </div>

      {setUploadForm(props)}
      <Footer/>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseDetails);
