import React, { useContext } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { currentUser } = useContext(AuthContext);
  console.log(currentUser);

  return (
    <div className="navbar">
      <span className="logo">채팅하자</span>
      <div className="user">
        <img src={currentUser.photoURL} alt="profile-img" />
        <span>{currentUser.displayName}</span>
        <button onClick={() => signOut(auth)}>로그아웃</button>
      </div>
    </div>
  );
};

export default Navbar;
