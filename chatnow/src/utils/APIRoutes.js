export const host = "http://localhost:5000";

export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const avatarRoute = `${host}/api/auth/setavatar`;
export const allUsers = `${host}/api/auth/allusers`;
export const addMessage = `${host}/api/msg/add`;
export const recieveMessageRoute = `${host}/api/msg/getmsg`;

export const localStorage_key = "chatAppCurrentUser";

export const socketSendMessage = "send-msg";
export const socketMessageRecieve = "msg-recieve";
export const socketAddUser = "add-user";
