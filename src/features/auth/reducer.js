import {
  CREATE_NEW_USER,
  SET_CURRENT_USER,
  GET_USER_ROLE,
} from "./types";
import isEmpty from "../../utils/isEmpty";

const initialState = {
  user: {},
  isAuthenticated: false,
};

export default function(state = initialState, action) {
  switch (action.type) {
    case CREATE_NEW_USER:
      return {
        user: action.payload
      };

    case SET_CURRENT_USER:
      return {
        user: action.payload,
        isAuthenticated: !isEmpty(action.payload)
      };

    case GET_USER_ROLE:
      return {
        ...state,
        role: action.payload
      };
    default:
      return state;
  }
}