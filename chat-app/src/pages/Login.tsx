import React from "react";

const Login = () => {
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅하자</span>
        <span className="title">회원가입</span>
        <form>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />

          <button>로그인</button>
          {/* {err && <span>문제가 발생하였습니다</span>} */}
        </form>
        <p>계정이 없으세요? 회원가입하기</p>
      </div>
    </div>
  );
};

export default Login;
