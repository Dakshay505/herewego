import axios from "axios";
import {
  MESSAGE_SEND_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_FAIL,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
} from "../constants/MessageConstants";
import { addMessage, recieveMessageRoute } from "../utils/APIRoutes";

// sending message
export const addmsg = (userData) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_SEND_REQUEST });
    // console.log(userData);
    const { data } = await axios.post(addMessage, userData);

    dispatch({ type: MESSAGE_SEND_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_SEND_FAIL,
      payload: error.response.data.message,
    });
  }
};
// getting message
export const getmsg = (userData) => async (dispatch) => {
  try {
    dispatch({ type: MESSAGE_GET_REQUEST });
    // console.log(userData);
    const { data } = await axios.post(recieveMessageRoute, userData);

    dispatch({ type: MESSAGE_GET_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: MESSAGE_GET_FAIL,
      payload: error.response.data.message,
    });
  }
};
