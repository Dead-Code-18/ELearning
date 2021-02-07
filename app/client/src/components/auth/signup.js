import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import { registerUser } from "../../actions/auth.action";
import classnames from "classnames";


function Signup(props){

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if(props.auth.isAuthenticated){
      props.history.push("/");
    }
  }, [])

  const onSubmit = (e) => {
    e.preventDefault();
    const newUser = {
      username: username,
      email: email,
      password: password,
    };
    props.registerUser(newUser, props.history);
    if(props.errors){
      console.log(props.errors);
    }
  };


  return (


    <div class="padding container-fluid d-flex justify-content-center">
      <div class="col-md-4">
        <div class="free-quote bg-dark h-100">
          <h2 class="my-4 heading text-center">Register to E-learning</h2>
          <form noValidate onSubmit={(e) => onSubmit(e)}>
            <div class="form-group mb-4">
              {" "}
              <label htmlFor="username">Username</label>{" "}
              <input
                onChange={(e) => setUsername(e.target.value)}
                value={username}
                error={props.errors ? props.errors.username : ""}
                id="username"
                type="username"
                class="form-control btn-block"
                className={classnames("form-control btn-block", {
                  invalid: props.errors
                    ? props.errors.username
                    : "",
                })}
                placeholder="Enter Username"
              />
              <span className="red-text">
                {props.errors.username}
              </span>
            </div>
            <div class="form-group mb-4">
              {" "}
              <label htmlFor="email">Email</label>{" "}
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                error={props.errors ? props.errors.email : ""}
                id="email"
                type="email"
                class="form-control btn-block"
                className={classnames("form-control btn-block", {
                  invalid: props.errors
                    ? props.errors.email || props.errors.emailnotfound
                    : "",
                })}
                placeholder="Enter Email"
              />
              <span className="red-text">
                {props.errors.email}
                {props.errors.emailnotfound}
              </span>
            </div>
            <div class="form-group mb-4">
              {" "}
              <label htmlFor="password">Password</label>{" "}
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                error={props.errors ? props.errors.password : ""}
                id="password"
                type="password"
                class="form-control btn-block"
                className={classnames("form-control btn-block", {
                  invalid: props.errors
                    ? props.errors.password || props.errors.passwordincorrect
                    : "",
                })}
                placeholder="Enter Password"
              />
              <span className="red-text">
                {props.errors.password}
                {props.errors.passwordincorrect}
              </span>
            </div>
            <div class="form-group">
              {" "}
              <input
                type="submit"
                class="btn btn-primary text-white py-2 px-4 btn-block"
                value="SIGNUP"
              />{" "}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  auth: state.auth,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => {
  return {
    registerUser: (newUser, history) => {
      dispatch(registerUser(newUser, history))}
  };
};



export default connect(mapStateToProps, mapDispatchToProps)(Signup);