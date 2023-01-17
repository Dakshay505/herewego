import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../assets/loaderr.svg";
import { Buffer } from "buffer";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { localStorage_key } from "../utils/APIRoutes";
import { useDispatch, useSelector } from "react-redux";
import { avatarAction } from "../actions/userActions";
const SetAvatar = () => {
  const dispatch = useDispatch();
  const api = `https://api.multiavatar.com/4699646`;
  const navigate = useNavigate();
  const [images, setimages] = useState([]);
  const [isLoading, setisLoading] = useState(true);
  const [selectedAvatar, setselectedAvatar] = useState(undefined);
  const { userAvatar } = useSelector((state) => state.avatar);

  const options = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "light",
  };
  
  useEffect(() => {
    const check = async () => {
      const localData = await JSON.parse(
        localStorage.getItem(localStorage_key)
      );
      if (!localData) {
        navigate("/login");
      } else if (localData.isAvatar) {
        navigate("/");
      }
    };
    check();
  }, [navigate]);

  // applying selected avatar
  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      toast.error("Please select an avatar", options);
    } else {
      const localData = await JSON.parse(
        localStorage.getItem(localStorage_key)
      );
      dispatch(
        avatarAction({
          image: images[selectedAvatar],
        })
      );
      // console.log(userAvatar);
      if (userAvatar.isAvatar) {
        localData.isAvatar = true;
        localData.avatarImage =
          userAvatar.user.avatarImage || images[selectedAvatar];
        localStorage.setItem(localStorage_key, JSON.stringify(localData));
        navigate("/");
      } else {
        toast.error("Error setting avatar. Please try again.", options);
      }
    }
  };

  // getting all the images for avatar
  useEffect(() => {
    const getImages = async () => {
      const data = [];
      for (let i = 0; i < 5; i++) {
        const avtar = await axios.get(
          `${api}/${Math.round(Math.random() * 1000)}`
        );
        const buffer = new Buffer(avtar.data);
        data.push(buffer.toString("base64"));
      }
      setimages(data);
      setisLoading(false);
    };
    getImages();
  }, [api, images]);

  return isLoading ? (
    <div className="flex h-screen w-screen flex-col gap-8 justify-center bg-yellow-300 items-center">
      <img src={Loader} alt="" />
    </div>
  ) : (
    <div className="flex h-screen w-screen flex-col gap-8 justify-center bg-yellow-300 items-center">
      <div className="text-blue-800 font-bold bg-orange-300 p-4 rounded-sm">
        <h1>Pick an Avatar as your profile picture</h1>
      </div>
      <div className="flex gap-8 bg-amber-400 p-16 box-border">
        {images.map((avatar, index) => {
          return (
            <div
              key={index}
              className={`hover:scale-110 box-border${
                selectedAvatar === index
                  ? "scale-110 border-2 rounded-full border-red-700"
                  : ""
              }`}
            >
              <img
                className="h-20"
                src={`data:image/svg+xml;base64,${avatar}`}
                alt="avatar"
                key={avatar}
                onClick={() => {
                  setselectedAvatar(index);
                }}
              />
            </div>
          );
        })}
        <button
          className="bg-blue-600 py-4 px-8  rounded-md font-bold text-white hover:font-bold hover:bg-white hover:scale-105 hover:text-blue-600 ease-in-out duration-500"
          onClick={setProfilePicture}
        >
          Set Your Avatar
        </button>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SetAvatar;
