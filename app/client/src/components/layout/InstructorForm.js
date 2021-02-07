import React, { useState } from "react";
import axios from "axios";
import { getUserRole } from "../../actions/auth.action";
import { connect } from "react-redux";

const InstructorForm = (props) => {
  const [experience, setExperience] = useState("");
  const [additionalDetails, setAdditionalDetails] = useState("");

  const onSubmit = (e) => {
    const data = {
      id: props.auth.user.id,
      experience: experience,
      additionalDetails: additionalDetails,
    };
    e.preventDefault();
    axios.post("http://localhost:3000/profile/changeRole", data).then((res) => {
      console.log(res);
      props.getRole(props.auth.user.id);
      props.history.push("/");
    });
  };

  return (
    <div className="col-md-4">
      <div className="p-3 py-5">
        <div className="d-flex justify-content-between align-items-center experience">
          <span>Add Your Skills/Experience</span>
        </div>
        <form noValidate onSubmit={(e) => onSubmit(e)}>
          <div className="col-md-12">
            <label htmlFor="experience" className="labels">
              Experience
            </label>
            <input
              type="text"
              id="experience"
              className="form-control"
              placeholder="experience"
              value={experience}
              onChange={(e) => {
                setExperience(e.target.value);
              }}
            />
          </div>
          <div className="col-md-12">
            <label htmlFor="additionalDetails" className="labels">
              Additional Details
            </label>
            <input
              type="text"
              id="additinalDetails"
              className="form-control"
              placeholder="additional details"
              value={additionalDetails}
              onChange={(e) => {
                setAdditionalDetails(e.target.value);
              }}
            />
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
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

const mapDispatchToProps = (dispatch) => {
  return {
    getRole: (userID) => {
      dispatch(getUserRole(userID));
    },
  };
};

export default connect(mapStateToProps,mapDispatchToProps)(InstructorForm);
