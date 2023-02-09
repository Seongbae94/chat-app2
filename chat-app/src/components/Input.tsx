import React from "react";

const Input = () => {
  return (
    <div className="input">
      <input type="text" placeholder="메시지를 입력해주세요" />
      <div className="send">
        <i className="ri-attachment-line"></i>
        <input type="file" style={{ display: "none" }} id="file" />
        <label htmlFor="file">
          <i className="ri-image-line"></i>
        </label>
        <button>보내기</button>
      </div>
    </div>
  );
};

export default Input;
