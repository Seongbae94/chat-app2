import React from "react";
import Input from "./Input";
import Messages from "./Messages";

const Chat = () => {
  return (
    <div className="chat">
      <div className="chatInfo">
        <span>Jane</span>
        <div className="chatIcons">
          <i className="ri-vidicon-line icon"></i>
          <i className="ri-user-add-line icon"></i>
          <i className="ri-more-line icon"></i>
        </div>
      </div>
      <Messages />
      <Input />
    </div>
  );
};

export default Chat;
