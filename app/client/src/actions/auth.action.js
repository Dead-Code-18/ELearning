import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, GET_ROLE } from "./types";

// Register User
export const registerUser = (userData, history) => (dispatch) => {
  axios
    .post("http://localhost:3000/auth/signup", userData)
    .then((res) => {
      history.push("/auth/login");
      dispatch({
        type: GET_ERRORS,
        payload: {},
      });
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data,
      })
    );
};

// Login - get user token
export const loginUser = (userData, history) => (dispatch) => {
  dispatch(setUserLoading());
  axios
    .post("http://localhost:3000/auth/login", userData)
    .then((res) => {
      // Save to localStorage
      // Set token to localStorage
      const { token } = res.data;
      localStorage.setItem("jwtToken", token);
      // Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      // Set current user
      dispatch(setCurrentUser(decoded));
      history.push("/");
    })
    .catch((err) =>
      dispatch({
        type: GET_ERRORS,
        payload: err.data,
      })
    );
};

// Set logged in user
export const setCurrentUser = (decoded) => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded,
  };
};
// User loading
export const setUserLoading = () => {
  return {
    type: USER_LOADING,
  };
};

// Log user out
export const logoutUser = () => (dispatch) => {
  // Remove token from local storage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to empty object {} which will set isAuthenticated to false
  dispatch(setCurrentUser({}));
  dispatch(setUserRole({}));
};

export const getUserRole = (userID) => (dispatch) => {
  axios
    .get("http://localhost:3000/profile/role", {
      params: {
        id: userID,
      },
    })
    .then((res) => {
      if (res.data !== "teacher" && res.data !== "student") {
        dispatch(logoutUser());
      } else {
        dispatch(setUserRole(res));
      }
    })
    .catch((err) => {
      dispatch({
        type: GET_ERRORS,
        payload: err.data,
      });
    });
};

export const setUserRole = (data) => {
  return {
    type: GET_ROLE,
    payload: data.data,
  };
};
