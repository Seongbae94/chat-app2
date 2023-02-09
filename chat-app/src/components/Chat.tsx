import React, { useContext } from "react";
import { ChatContext } from "../context/ChatContext";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  const { data } = useContext(ChatContext);

  return (
    <div className="chat">
      <div className="chatInfo">
        <span>{data.user.displayName}</span>
        {/* <div className="chatIcons">
          <i className="ri-vidicon-line icon"></i>
          <i className="ri-user-add-line icon"></i>
          <i className="ri-more-line icon"></i>
        </div> */}
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
