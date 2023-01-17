import React, { useEffect, useState } from "react";
import Logo from "../assets/logo1.svg";
import { Link, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { localStorage_key } from "../utils/APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../actions/userActions";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  // console.log(user);
  const [values, setvalues] = useState({
    userName: "",
    userEmail: "",
    userPassword: "",
    confirmPassword: "",
  });
  useEffect(() => {
    if (localStorage.getItem(localStorage_key)) {
      navigate("/");
    }
  }, [navigate]);

  const submitHandler = async (e) => {
    e.preventDefault();
    if (handleValidation()) {
      dispatch(register(values));
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
    }
  };
  const options = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };

  const handleValidation = () => {
    const { userName, userEmail, userPassword, confirmPassword } = values;
    if (userPassword !== confirmPassword) {
      toast(`Value of confirm password didn't match try again.`, options);
      return false;
    } else if (userName.length <= 3) {
      toast(`User name should be greater than 3 characters.`, options);
      return false;
    } else if (userPassword.length < 8) {
      toast(`Password should be greater than 8 characters.`, options);
      return false;
    } else if (userEmail === "") {
      toast(`Enter a valid mail.`, options);
      return false;
    }
    return true;
  };
  const changeHandler = (e) => {
    e.preventDefault();
    setvalues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="flex h-screen w-screen flex-col gap-4 justify-center bg-yellow-300 items-center">
      <form
        className="flex flex-col justify-center items-center gap-4 px-20 py-10 rounded-md bg-blue-400"
        onSubmit={(e) => submitHandler(e)}
      >
        <div className="flex justify-center gap-4 items-center">
          <img src={Logo} className="h-16" alt="brand" />
          <h1 className="text-3xl text-white uppercase">HereYouGo</h1>
        </div>
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 placeholder:text-white focus:border-blue-600"
          type="text"
          placeholder="Name"
          name="userName"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 placeholder:text-white invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:border-blue-600"
          type="email"
          placeholder="Email"
          name="userEmail"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 placeholder:text-white invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:border-blue-600"
          type="password"
          placeholder="Password"
          name="userPassword"
          onChange={(e) => changeHandler(e)}
        />
        <input
          className="bg-transparent p-4 text-black rounded-md w-full border-2 placeholder:text-white invalid:border-red-500 invalid:text-red-600  focus:invalid:border-red-500 focus:invalid:ring-red-500 focus:border-blue-600"
          type="password"
          placeholder="Confirm Password"
          name="confirmPassword"
          onChange={(e) => changeHandler(e)}
        />
        <button
          className="bg-blue-600 py-4 px-8 w-full rounded-md font-bold text-white"
          type="submit"
        >
          Create new user
        </button>
        <span>
          Already a User ?{" "}
          <Link className="font-bold text-blue-700" to="/login">
            Login.
          </Link>
        </span>
      </form>
      <ToastContainer />
    </div>
  );
};

export default Register;
