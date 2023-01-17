import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AVATAR_USER_FAIL,
  AVATAR_USER_SUCCESS,
  AVATAR_USER_REQUEST,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
} from "../constants/UserConstants";

export const userReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_USER_REQUEST:
    case LOGIN_USER_REQUEST:
      return {
        loading: true,
      };
    case REGISTER_USER_SUCCESS:
    case LOGIN_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };
    case REGISTER_USER_FAIL:
    case LOGIN_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

// setting avatar
export const avatarReducer = (state = { userAvatar: {} }, action) => {
  switch (action.type) {
    case AVATAR_USER_REQUEST:
      return {
        loading: true,
      };
    case AVATAR_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        userAvatar: action.payload,
      };
    case AVATAR_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
// all contact
export const allUsers = (state = { all: {} }, action) => {
  switch (action.type) {
    case ALL_USER_REQUEST:
      return {
        loading: true,
      };
    case ALL_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        allContacts: action.payload,
      };
    case ALL_USER_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
