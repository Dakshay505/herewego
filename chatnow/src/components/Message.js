import React, { useEffect, useRef } from "react";
import { v4 as uuidv4 } from "uuid";

const Message = ({ messages }) => {
  // console.log(messages);
  const scrollRef = useRef();
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);
  return (
    <div className="flex flex-col gap-4 py-4 px-8 overflow-auto scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-white">
      {messages.map((message) => {
        return (
          <div className=" " ref={scrollRef} key={uuidv4()}>
            <div
              className={`flex items-center ${
                message.fromSelf ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`break-words p-4 rounded-md ${
                  message.fromSelf ? "bg-blue-800 font-bold" : "bg-blue-400 font-bold"
                }`}
              >
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Message;
