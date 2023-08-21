import React, { useEffect, useState } from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import Notification from "../../common-components/Notification";

const SigninInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");
  const [message, setMessage] = useState("");

  // const { signIn, forgotPassword } = UserAuth();
  const { signIn } = UserAuth();

  const navigate = useNavigate();

  useEffect(() => {
    const savedEmail = localStorage.getItem("email");
    const savedPassword = localStorage.getItem("password");

    if (savedEmail && savedPassword) {
      setEmail(savedEmail);
      setPassword(savedPassword);
    }
  }, []);

  const Notify = (nType, nMessage) => {
    //notification type, notification message
    setNotifType(nType);
    setMessage(nMessage);
    if (nMessage != "") HandleMessageExit();
  };

  const HandleMessageExit = () => {
    setMessageShowing(!messageShowing);
  };

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    try {
      await signIn(email, password);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/");
    } catch (e) {
      setError(e);
      let m = "";
      switch (e.code) {
        case "auth/wrong-password":
          m = "Mật khẩu hoặc Email không đúng!";
          break;
        case "auth/too-many-requests":
          m =
            "Quyền truy cập tài khoản đã tạm thời bị khóa vì có quá nhiều lần đăng nhập thất bại! Xin hãy thử lại sau.";
          break;
        case "auth/user-not-found":
          m =
            "Tài khoản này không tồn tại! Bạn hãy thử đăng kí nhé!";
          break;
      }
      Notify("Báo lỗi", m);
      console.log(e.message);
    }
  };

  const handleForgotPasswordClicked = async () => {
    navigate("/forgotpassword");
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
      <form className="login--inputs" onSubmit={handleSigninSubmit}>
        <Input
          inputType={"email"}
          inputPlaceholder={"Email"}
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
        <Input
          inputType={"password"}
          inputPlaceholder={"Mật khẩu"}
          onChange={(e) => setPassword(e.target.value)}
          value={password}
        />
        <div
          className="login--forget_password"
          onClick={handleForgotPasswordClicked}
        >
          Quên mật khẩu
        </div>
        <LoginButton LoginButtonText={"Đăng nhập"} />
      </form>
    </>
  );
};

export default SigninInputs;
