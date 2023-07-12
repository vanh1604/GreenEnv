import React from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";

const SigninInputs = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { signIn } = UserAuth();

  const navigate = useNavigate();

  const handleSigninSubmit = async (e) => {
    e.preventDefault();
    setError("");
    try {
      await signIn(email, password);
      navigate("/missions");
    } catch (e) {
      setError(e.message);
      console.log(e.message);
    }
  };

  return (
    <form className="login--inputs" onSubmit={handleSigninSubmit}>
      <Input inputType={"email"} inputPlaceholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
      <Input inputType={"password"} inputPlaceholder={"Mật khẩu"} onChange={(e) => setPassword(e.target.value)}/>
      <div className="login--forget_password">Quên mật khẩu</div>
      <LoginButton LoginButtonText={"Đăng nhập"} />
    </form>
  );
};

export default SigninInputs;
