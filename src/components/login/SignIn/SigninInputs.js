import React, { useEffect, useState } from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const SigninInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [error, setError] = useState("");

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

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    // setError("");
    try {
      await signIn(email, password);
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      navigate("/about");
    } catch (e) {
      alert("Mật khẩu hoặc Email chưa khớp!");
      // setError(e.message);
      console.log(e.message);
      if (
        (e.message =
          "Firebase: Access to this account has been temporarily disabled due to many failed login attempts. You can immediately restore it by resetting your password or you can try again later. (auth/too-many-requests).")
      ) {
        alert(
          "Đã tạm thời vô hiệu hóa tài khoản vì có quá nhiều lần đăng nhập thất bại, nhằm bảo vệ an toàn cho tài khoản của bạn."
        );
      }
    }
  };

  const handleForgotPasswordClicked = async () => {
    navigate("/forgotpassword");
  };

  return (
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
  );
};

export default SigninInputs;
