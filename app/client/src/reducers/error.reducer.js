import { GET_ERRORS } from "../actions/types";
const initialState = {};

export default function fun1(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      console.log(action.payload);
      return action.payload;
    default:
      return state;
  }
}
