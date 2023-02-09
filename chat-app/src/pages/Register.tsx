import React from "react";

const Register = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅하자</span>
        <span className="title">회원가입</span>
        <form>
          <input type="text" placeholder="이름" />
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <i className="ri-image-line"></i>
            <span>이미지 넣기</span>
          </label>
          <button>회원가입</button>
          {/* {err && <span>문제가 발생하였습니다</span>} */}
        </form>
        <p>계정이 있으세요? 로그인하기</p>
      </div>
    </div>
  );
};

export default Register;
