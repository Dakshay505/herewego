import React, { useEffect, useState } from "react";
import { localStorage_key } from "../utils/APIRoutes";
import logo from "../assets/logo1.svg";
const Contacts = ({ contacts, changeChat }) => {
  // console.log(contacts);
  const [currentUserName, setcurrentUserName] = useState(undefined);
  const [currentUserImage, setcurrentUserImage] = useState(undefined);
  const [currentSelected, setcurrentSelected] = useState(undefined);
  useEffect(() => {
    const fetchApi = async () => {
      const user = await JSON.parse(localStorage.getItem(localStorage_key));
      setcurrentUserName(user.userName);
      setcurrentUserImage(user.avatarImage);
    };
    fetchApi();
  }, []);
  const changeCurrentChat = (index, contact) => {
    setcurrentSelected(index);
    changeChat(contact);
  };

  return (
    <>
      {currentUserImage && (
        <div className="flex hieg flex-col">
          <div className="flex h-1/6 justify-center items-center gap-6 shadow-md bg-blue-300">
            <img className="h-8" src={logo} alt="logo" />
            <h3 className="font-bold">HereWeGo</h3>
          </div>
          <div className="flex flex-col h-4/6 items-center scrollbar-thin scrollbar-thumb-blue-900 scrollbar-track-red-100 overflow-auto gap-1 bg-blue-700 ">
            {contacts.map((contact, index) => {
              return (
                <div
                  key={contact._id}
                  className={`flex items-center bg-blue-500 shadow-md hover:cursor-pointer duration-300 ease-in-out gap-2 box-border w-full ${
                    index === currentSelected ? "bg-blue-400" : ""
                  }`}
                  onClick={() => changeCurrentChat(index, contact)}
                >
                  <div className="h-12">
                    <img
                      className="h-12"
                      src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                      alt=""
                    />
                  </div>
                  <div className="">
                    <h3>{contact.userName}</h3>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="bg-blue-800 h-1/6 flex flex-col justify-center items-center shadow-inner">
            <div className="avatar">
              <img
                className="h-12"
                src={`data:image/svg+xml;base64,${currentUserImage}`}
                alt="avatar"
              />
            </div>
            <div className="font-bold text-white">
              <h2>{currentUserName}</h2>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Contacts;
