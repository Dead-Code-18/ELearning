import axios from "axios";
import { GET_PROFILE } from "./types";

export const getProfile = (userID) => (dispatch) => {
  axios
    .get("http://localhost:3000/profile/details", {
      params: {
        id: userID,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateProfile = (userID) => (dispatch) => {
  axios
    .get("http://localhost:3000/profile/details", {
      params: {
        id: userID,
      },
    })
    .then((res) => {
      console.log(res.data);
      dispatch({
        type: GET_PROFILE,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
