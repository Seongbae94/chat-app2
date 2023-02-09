import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

const Login = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setErr(true);
    }
  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">채팅하자</span>
        <span className="title">회원가입</span>
        <form onSubmit={handleSubmit}>
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />

          <button>로그인</button>
          {err && <span>문제가 발생하였습니다</span>}
        </form>
        <p>
          계정이 없으세요? <Link to="/register">회원가입하기</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
