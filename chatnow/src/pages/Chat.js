import { io } from "socket.io-client";
import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { host, localStorage_key, socketAddUser } from "../utils/APIRoutes";
import Contact from "../components/Contact";
import Welcome from "../components/Welcome.js";
import ChatContainer from "../components/ChatContainer.js";
import { useDispatch, useSelector } from "react-redux";
import { gettingContacts } from "../actions/userActions";

const Chat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setcontacts] = useState([]);
  const [currentUser, setcurrentUser] = useState(undefined);
  const [currentChat, setcurrentChat] = useState(undefined);
  const [isLoaded, setisLoaded] = useState(false);

  useEffect(() => {
    async function getUser() {
      if (!localStorage.getItem(localStorage_key)) {
        navigate("/login");
      } else {
        const userData = await JSON.parse(
          localStorage.getItem(localStorage_key)
        );
        setcurrentUser(userData);
        setisLoaded(true);
      }
    }
    getUser();
  }, [navigate]);

  // getting contact
  const { allContacts } = useSelector((state) => state.contact);
  useEffect(() => {
    if (currentUser) {
      if (currentUser.isAvatar) {
        // const data = await axios.get(`${allUsers}/${currentUser._id}`);
        // setcontacts(data.data.users);
        dispatch(gettingContacts());
        // setcontacts(allContacts.users);
      } else {
        navigate("/setavatar");
      }
    }
  }, [navigate, currentUser, dispatch]);

  if (contacts.length === 0 && allContacts) {
    setcontacts(allContacts.users);
  }

  // setting value in global
  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit(socketAddUser, currentUser._id);
    }
  }, [currentUser]);

  const handleChangeChat = (chat) => {
    setcurrentChat(chat);
  };
  return (
    <>
      <div className="flex h-screen w-screen flex-col gap-4 justify-center  bg-yellow-300 items-center">
        <div className="h-5/6 w-5/6 grid grid-cols-[30%_70%]">
          <Contact contacts={contacts} changeChat={handleChangeChat} />
          {isLoaded && currentChat === undefined ? (
            <Welcome currentUser={currentUser} />
          ) : (
            <ChatContainer
              currentChat={currentChat}
              currentUser={currentUser}
              socket={socket}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default Chat;
