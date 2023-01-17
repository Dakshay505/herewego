import axios from "axios";
import {
  allUsers,
  avatarRoute,
  localStorage_key,
  loginRoute,
  registerRoute,
} from "../utils/APIRoutes";
import {
  REGISTER_USER_FAIL,
  REGISTER_USER_SUCCESS,
  REGISTER_USER_REQUEST,
  LOGIN_USER_REQUEST,
  LOGIN_USER_SUCCESS,
  LOGIN_USER_FAIL,
  AVATAR_USER_REQUEST,
  AVATAR_USER_SUCCESS,
  AVATAR_USER_FAIL,
  ALL_USER_REQUEST,
  ALL_USER_SUCCESS,
  ALL_USER_FAIL,
} from "../constants/UserConstants";

// Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });
    // console.log(userData);
    const { data } = await axios.post(registerRoute, userData);

    dispatch({ type: REGISTER_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

//login
export const login = (userData) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_USER_REQUEST });

    const { data } = await axios.post(loginRoute, userData);

    // if (data.status === false) {
    //   toast(data.message, options);
    // }
    // if (data.status === true) {
    //   localStorage.setItem("chatAppUser", JSON.stringify(data.user));
    //   toast(data.message, options);
    //   navigate("/");
    // }

    dispatch({ type: LOGIN_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: LOGIN_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// setAVAtar
export const avatarAction = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AVATAR_USER_REQUEST });

    // console.log(userData);

    const localData = await JSON.parse(localStorage.getItem(localStorage_key));
    // console.log(localData._id)
    const { data } = await axios.post(
      `${avatarRoute}/${localData.userName}`,
      userData
    );
    // console.log("dakshay");
    // console.log(data)

    dispatch({ type: AVATAR_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AVATAR_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// getting all user expact current user
export const gettingContacts = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USER_REQUEST });

    const localData = await JSON.parse(localStorage.getItem(localStorage_key));
    const { data } = await axios.get(`${allUsers}/${localData._id}`);
    // console.log(data);
    dispatch({ type: ALL_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: ALL_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
