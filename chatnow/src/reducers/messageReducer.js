import {
  MESSAGE_SEND_FAIL,
  MESSAGE_SEND_REQUEST,
  MESSAGE_SEND_SUCCESS,
  MESSAGE_GET_FAIL,
  MESSAGE_GET_REQUEST,
  MESSAGE_GET_SUCCESS,
} from "../constants/MessageConstants";

// sending message
export const msgSend = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_SEND_REQUEST:
      return {
        loading: true,
      };
    case MESSAGE_SEND_SUCCESS:
      return {
        ...state,
        loading: false,
        msgStatus: action.payload,
      };
    case MESSAGE_SEND_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
// getting message
export const getAllMessage = (state = {}, action) => {
  switch (action.type) {
    case MESSAGE_GET_REQUEST:
      return {
        loading: true,
      };
    case MESSAGE_GET_SUCCESS:
      return {
        ...state,
        loading: false,
        allmsgs: action.payload,
      };
    case MESSAGE_GET_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};
