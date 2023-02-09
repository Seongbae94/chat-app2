import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { onSnapshot, doc } from "firebase/firestore";
import Message from "./Message";
import { db } from "../firebase";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc: any) => {
      doc.exists() && setMessages(doc.data().messages);

      return () => {
        unSub();
      };
    });
  }, [data.chatId]);

  return (
    <div className="messages">
      {messages.map((message: any) => {
        return <Message message={message} key={message.id} />;
      })}
    </div>
  );
};

export default Messages;
