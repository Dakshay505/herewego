import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Logo from "../assets/logo1.svg";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { login } from "../actions/userActions";
import { localStorage_key } from "../utils/APIRoutes";
const Login = () => {
  const options = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const [values, setvalues] = useState({
    userEmail: "",
    userPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem(localStorage_key)) {
      navigate("/");
    }
  }, [navigate]);
  const submitHandler = async (e) => {
    e.preventDefault();
    dispatch(login(values));
    const func = () => {
      if (user.status === false) {
        toast(user.message, options);
      }
      if (user.status === true) {
        localStorage.setItem(localStorage_key, JSON.stringify(user.user));
        toast(user.message, options);
        navigate("/");
      }
    };
    func();
  };

  const changeHandler = (e) => {
    e.preventDefault();
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex h-screen w-screen flex-col gap-4 justify-center bg-yellow-300 items-center">
      <form
        className="flex flex-col justify-center items-center gap-8 p-20 rounded-md bg-blue-400"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="flex justify-center gap-4 items-center">
          <img src={Logo} className="h-16" alt="brand" />
          <h1 className="text-3xl text-white uppercase">HereYouGo</h1>
        </div>
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 placeholder:text-white invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:border-blue-600"
          type="email"
          placeholder="Email"
          name="userEmail"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 border-white placeholder:text-white focus:border-blue-500"
          type="password"
          placeholder="Password"
          name="userPassword"
          onChange={(e) => changeHandler(e)}
        />
        <button
          className="bg-blue-600 py-4 px-8  rounded-md font-bold text-white hover:font-bold hover:bg-white hover:scale-105 hover:text-blue-600 ease-in-out duration-500"
          type="submit"
        >
          Login
        </button>
        <span>
          New user ?{" "}
          <Link className="font-bold text-blue-700" to="/register">
            SignUp
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Login;
