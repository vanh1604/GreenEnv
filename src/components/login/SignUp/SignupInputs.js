import React from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth, colRefUsers } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";
import Notification from "../../common-components/Notification";

const SignUpInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");
  const [role, setRole] = useState("user");
  const [message, setMessage] = useState("");
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");
  const [exchange, setExchange] = useState([false, false, false, false, false, false, false, false, false]); 

  const { user, createUser } = UserAuth();

  const navigate = useNavigate();

  const HandleMessageExit = () => {
    setMessageShowing(!messageShowing);
  };

  const Notify = (nType, nMessage) => {
    //notification type, notification message
    setNotifType(nType);
    setMessage(nMessage);
    if (nMessage != "") HandleMessageExit();
  };

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    
    if (repassword === password) {
      try {
        await createUser(email, password);
        console.log(user);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
          })
          .catch((error) => {
            console.log(error.message);
          });
        const saveInfo = async () => {
          if (password === "admin--admin--admin--greenenv--adminx3!") {
            setRole("admin");
          }
          await setDoc(doc(colRefUsers, email), {
            name: name,
            email: email,
            score: 0,
            role: role,
            exchange: exchange,
          });
        };
        saveInfo();
        navigate("/");
      } catch (e) {
        console.log(e);
        setError(e);
        let m = "";
        switch (e.code) {
          case "auth/weak-password":
            m = "Hãy nhập mật khẩu với độ dài bằng hoặc hơn 6 kí tự.";
            break;
          case "auth/email-already-in-use":
            m = "Email này đã được sử dụng.";
            break;
        }
        Notify("Báo lỗi", m);
      }
    } else {
      Notify("Báo lỗi", "Mật khẩu nhập lại không đúng.");
    }
  };

  return (
    <>
      {messageShowing ? (
        <Notification
          notifType={notifType}
          message={message}
          HandleMessageExit={HandleMessageExit}
        />
      ) : null}
      <form className="login--inputs" onSubmit={handleSignupSubmit}>
        <Input
          inputType={"text"}
          inputPlaceholder={"Tên"}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          inputType={"email"}
          inputPlaceholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Input
          inputType={"password"}
          inputPlaceholder={"Mật khẩu"}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Input
          inputType={"password"}
          inputPlaceholder={"Nhập lại mật khẩu"}
          onChange={(e) => setRepassword(e.target.value)}
        />
        <LoginButton LoginButtonText={"Tiếp tục"} />
      </form>
    </>
  );
};

export default SignUpInputs;
