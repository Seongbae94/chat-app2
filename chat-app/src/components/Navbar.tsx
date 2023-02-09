import React from "react";

const Navbar = () => {
  return (
    <div className="navbar">
      <span className="logo">채팅하자</span>
      <div className="user">
        <img
          src="https://images.pexels.com/photos/733872/pexels-photo-733872.jpeg?cs=srgb&dl=pexels-andrea-piacquadio-733872.jpg&fm=jpg"
          alt="profile-img"
        />
        <span>John</span>
        <button>로그아웃</button>
      </div>
    </div>
  );
};

export default Navbar;
