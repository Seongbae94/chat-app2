import React, { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { ChatContext } from "../context/ChatContext";
import {
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  serverTimestamp,
  Timestamp,
} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase";
import { v4 as uuid } from "uuid";

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const { currentUser } = useContext(AuthContext);
  const { data } = useContext(ChatContext);

  const handleSend = async () => {
    if (img) {
      const storageRef = ref(storage, uuid());

      const uploadTask = uploadBytesResumable(storageRef, img);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // setErr(true);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //업로드 완료 후 사진을 url로 받아오고,
            //프로파일에 displayName, photoURL을 넣어 업데이트
            try {
              await updateDoc(doc(db, "chats", data.chatId), {
                messages: arrayUnion({
                  id: uuid(),
                  text,
                  senderId: currentUser.uid,
                  date: Timestamp.now(),
                  img: downloadURL,
                }),
              });
              setText("");
              setImg(null);
            } catch (err) {
              setText("");
              setImg(null);
            }
          });
        }
      );
    } else {
      try {
        await updateDoc(doc(db, "chats", data.chatId), {
          messages: arrayUnion({
            id: uuid(),
            text,
            senderId: currentUser.uid,
            date: Timestamp.now(),
          }),
        });
        setText("");
        setImg(null);
      } catch (err) {
        setText("");
        setImg(null);
      }
    }

    try {
      await updateDoc(doc(db, "userChats", currentUser.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      setText("");
      setImg(null);
    } catch (err) {
      setText("");
      setImg(null);
    }

    try {
      await updateDoc(doc(db, "userChats", data.user.uid), {
        [data.chatId + ".lastMessage"]: {
          text,
        },
        [data.chatId + ".date"]: serverTimestamp(),
      });
      setText("");
      setImg(null);
    } catch (err) {
      setText("");
      setImg(null);
    }
  };

  return (
    <div className="input">
      <input
        type="text"
        placeholder="메시지를 입력해주세요"
        onChange={(e) => setText(e.target.value)}
        value={text}
      />
      <div className="send">
        <i className="ri-attachment-line"></i>
        <input
          type="file"
          style={{ display: "none" }}
          id="file"
          onChange={(e: any) => setImg(e.target.files[0])}
        />
        <label htmlFor="file">
          <i className="ri-image-line"></i>
        </label>
        <button onClick={handleSend}>보내기</button>
      </div>
    </div>
  );
};

export default Input;
