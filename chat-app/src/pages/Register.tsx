import React, { useState } from "react";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db, storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { doc, setDoc } from "firebase/firestore";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const [err, setErr] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement> | any) => {
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;
    const file = e.target[3].files[0];

    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      //처음 회원가입 시 displayName, img가 null로 들어와서 업데이트 해줘야함

      //img 업데이트 하기
      const storageRef = ref(storage, displayName);

      const uploadTask = uploadBytesResumable(storageRef, file);
      //form submit에서 보내준 file을 업로드

      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
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
          setErr(true);
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
            //업로드 완료 후 사진을 url로 받아오고,
            //프로파일에 displayName, photoURL을 넣어 업데이트
            await updateProfile(res.user, {
              displayName,
              photoURL: downloadURL,
            });
            //업데이트 된 profile을 users에 unique한 id로 firebase DB에 저장
            await setDoc(doc(db, "users", res.user.uid), {
              uid: res.user.uid,
              displayName,
              email,
              photoURL: downloadURL,
            });

            await setDoc(doc(db, "userChats", res.user.uid), {});
            navigate("/");
          });
        }
      );
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
          <input type="text" placeholder="이름" />
          <input type="email" placeholder="이메일" />
          <input type="password" placeholder="비밀번호" />
          <input style={{ display: "none" }} type="file" id="file" />
          <label htmlFor="file">
            <i className="ri-image-line"></i>
            <span>이미지 넣기</span>
          </label>
          <button>회원가입</button>
          {err && <span>문제가 발생하였습니다</span>}
        </form>
        <p>
          계정이 있으세요? <Link to="/login">로그인하기</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
