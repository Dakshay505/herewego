import React from "react";

import Robot from "../assets/robot.gif";
const Welcome = ({ currentUser }) => {
  return (
    <div className="flex flex-col bg-slate-500 items-center justify-center">
      <img className="h-80" src={Robot} alt="" />
      <h1 className="font-bold text-white">
        Welcome, <span>{currentUser.userName}!</span>
      </h1>
      <h3 className="text-white">Please select a chat to Start messaging.</h3>
    </div>
  );
};

export default Welcome;
