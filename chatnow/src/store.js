import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import { allUsers, avatarReducer, userReducer } from "./reducers/userReducer";
import { getAllMessage, msgSend } from "./reducers/messageReducer";

const reducer = combineReducers({
  user: userReducer,
  avatar:avatarReducer,
  contact:allUsers,
  msg:msgSend,
  allmsg:getAllMessage
});

let initialstate = {};

let middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
