import React from "react";
import { BiPowerOff } from "react-icons/bi";
import { useNavigate } from "react-router-dom";
const Logout = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div
      className="bg-blue-700 flex justify-center items-center p-3 rounded-md  hover:cursor-pointer"
      onClick={handleLogout}
    >
      <BiPowerOff className="text-l text-white font-bold" />
    </div>
  );
};
export default Logout;
