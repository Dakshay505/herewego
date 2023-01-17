import React, { useState, useEffect } from "react";
import ChatInput from "./ChatInput.js";
import Logout from "./Logout.js";
import "./height.css";
import Message from "./Message.js";
import { useDispatch, useSelector } from "react-redux";
import { addmsg, getmsg } from "../actions/messageActions.js";
import { socketMessageRecieve, socketSendMessage } from "../utils/APIRoutes.js";

const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(null);
  const dispatch = useDispatch();
  const { allmsgs } = useSelector((state) => state.allmsg);
  // getting all message
  useEffect(() => {
    async function fetchdata() {
      if (currentChat) {
        dispatch(
          getmsg({
            from: currentUser._id,
            to: currentChat._id,
          })
        );
        // const response = await axios.post(recieveMessageRoute, {
        //   from: currentUser._id,
        //   to: currentChat._id,
        // });
        // setMessages(response.data);
        // console.log(response.data);
        // if (allmsgs) {
        // setMessages(allmsgs)
        // console.log(allmsgs);
        // }
      }
    }
    fetchdata();
  }, [currentChat, dispatch]);

  useEffect(() => {
    if (allmsgs) {
      setMessages(allmsgs);
      console.log(allmsgs);
    }
  }, [allmsgs]);

  // adding new message
  const handleSendMsg = async (msg) => {
    socket.current.emit(socketSendMessage, {
      to: currentChat._id,
      from: currentUser._id,
      msg,
    });
    dispatch(
      addmsg({
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      })
    );
    // await axios.post(addMessage, {
    //   from: currentUser._id,
    //   to: currentChat._id,
    //   message: msg,
    // });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
  };
  useEffect(() => {
    if (socket.current) {
      socket.current.on(socketMessageRecieve, (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, [socket]);

  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  return (
    <>
      {currentChat && (
        <div className="bg-gray-400 hieg grid grid-rows-[10%_80%_10%]">
          <div className="bg-blue-300 flex z-10 justify-between items-center shadow-lg p-8">
            <div className="flex items-center gap-4">
              <div className="avatar">
                <img
                  className="h-12"
                  src={`data:image/svg+xml;base64,${currentChat.avatarImage}`}
                  alt=""
                />
              </div>
              <div className="username">
                <h3>{currentChat.userName}</h3>
              </div>
            </div>
            <Logout />
          </div>
          <Message messages={messages} />
          <ChatInput handleSendMsg={handleSendMsg} />
        </div>
      )}{" "}
    </>
  );
};

export default ChatContainer;
