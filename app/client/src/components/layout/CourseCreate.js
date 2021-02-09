import React, { useState } from "react";
import { connect } from "react-redux";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import NavTop from "./NavTop";

function CourseCreate(props) {
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [requirement, setRequirement] = useState("");
  const [name, setName] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    const newCourse = {
      name: name,
      instructor:props.auth.user.id,
      price: price,
      description: description,
      requirements: requirement
    };

    axios
      .post("http://localhost:3000/course/create", newCourse)
      .then((res) => {
        console.log(res);
        props.history.push("/course/list");
      })
      .catch();
  };

  return (
    <div className="container">
      <NavTop />
      <div className="container jumbotron">
        <div className="container d-flex justify-content-between align-items-center mb-3">
          <h4 className="text-right">Give Course Information</h4>
        </div>
        <form className="container" noValidate onSubmit={(e) => onSubmit(e)}>
          <div className="row mt-2">
            <div className="form-group col-md-6">
              <label htmlFor="coursename" className="labels">
                Course Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                //error={props.errors ? props.errors.username : ""}
                id="coursename"
                type="text"
                placeholder={"course name"}
                className="form-control"
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="form-group col-md-12">
              <label htmlFor="description" className="labels">
                Description
              </label>
              <input
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                id="description"
                type="text"
                placeholder={"describe your course"}
                className="form-control "
              />
            </div>
          </div>
          <div className="row mt-3">
            <div className="form-group col-md-6">
              <label htmlFor="requirement" className="labels">
                Requirement
              </label>
              <input
                value={requirement}
                onChange={(e) => setRequirement(e.target.value)}
                id="requirement"
                type="text"
                placeholder="Define your course requirement"
                className="form-control "
              />
            </div>
            <div className="form-group col-md-6">
              <label htmlFor="price" className="labels">
                Price
              </label>
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                id="price"
                type="number"
                placeholder="price in taka"
                className="form-control "
              />
            </div>
          </div>
          <div className="form-group mt-5 text-center">
            <input
              type="submit"
              className="btn btn-primary text-white py-2 px-4 btn-block"
              value="submit"
            />
          </div>
        </form>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps)(CourseCreate);
