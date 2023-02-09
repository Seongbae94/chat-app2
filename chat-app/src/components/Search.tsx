import React, { useContext, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  setDoc,
  doc,
  updateDoc,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Search = () => {
  const [username, setUsername] = useState("");
  const [user, setUser] = useState<{
    displayName?: string;
    photoURL?: string;
    uid?: any;
  }>({});
  const [err, setErr] = useState(false);

  const { currentUser } = useContext(AuthContext);

  const handleSearch = async () => {
    const userRef = collection(db, "users");

    // firebase users에 있는 정보 중에서 displayName이 내가 칠 username
    //과 같은 것들을 찾는다.
    const q = query(userRef, where("displayName", "==", username));

    try {
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        // console.log(doc.id, " => ", doc.data());
        setUser(doc.data());
      });
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && handleSearch();
  };

  const handleSelect = async () => {
    const combinedId =
      currentUser.uid > user.uid
        ? currentUser.uid + user.uid
        : user.uid + currentUser.uid;

    try {
      const res = await getDoc(doc(db, "chats", combinedId));

      if (!res.exists()) {
        //서로 메시지 없을 때 chats를 만든다.
        await setDoc(doc(db, "chats", combinedId), {
          messages: [],
        });

        //내 정보에서 상대방 정보 업데이트
        await updateDoc(doc(db, "userChats", currentUser.uid), {
          [combinedId + ".userInfo"]: {
            uid: user.uid,
            displayName: user.displayName,
            photoURL: user.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });

        //상대방 정보에서 내 정보 업데이트
        await updateDoc(doc(db, "userChats", user.uid), {
          [combinedId + ".userInfo"]: {
            uid: currentUser.uid,
            displayName: currentUser.displayName,
            photoURL: currentUser.photoURL,
          },
          [combinedId + ".date"]: serverTimestamp(),
        });
      }
    } catch (err) {}
    setUser({});
    setUsername("");
  };

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="유저를 입력해주세요"
          onChange={(e) => {
            setUsername(e.target.value);
            setUser({});
          }}
          value={username}
          onKeyDown={handleKey}
        />
      </div>
      {/* {err && <span>검색하신 유저가 없습니다</span>} */}
      {user.displayName ? (
        <div className="userChat" onClick={handleSelect}>
          <img src={user.photoURL} alt="user-img" />
          <div className="userChatInfo">
            <span>{user.displayName}</span>
          </div>
        </div>
      ) : (
        <div className="userChat">
          <div className="userChatInfo">
            <span style={{ fontSize: "12px" }}>
              유저 이름을 쓰고 엔터를 눌러주세요
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default Search;
