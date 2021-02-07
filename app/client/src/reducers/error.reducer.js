import { GET_ERRORS } from "../actions/types";
const initialState = {};

export default function fun1(state = initialState, action) {
  switch (action.type) {
    case GET_ERRORS:
      if(action.payload === undefined){
        return {
          ...state
        }
      }else{
      return action.payload;
      }
    
    default:
      return state;
  }
}
