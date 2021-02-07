import { SET_CURRENT_USER, GET_ROLE, USER_LOADING } from "../actions/types";
const isEmpty = require("is-empty");

const initialState = {
  isAuthenticated: false,
  user: {},
  role: null,
  loading: false,
};

export default function authReducer(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        user: action.payload,
        loading: false
      };
    case USER_LOADING:
      return {
        ...state,
        loading: true,
      };
    case GET_ROLE:
      return {
        ...state,
        role: action.payload,
        loading: false
      };
    default:
      return state;
  }
}
