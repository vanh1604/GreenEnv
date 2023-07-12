import React from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from  "../../../context/AuthContext";

const SignUpInputs = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const {createUser} = UserAuth();

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createUser(email, password);
      navigate('/missions');
    } catch(e) {
      setError(e.message);
      console.log(e.message);
    }
  }

  return (
    <form className="login--inputs" onSubmit={handleSignupSubmit}>
      <Input inputType={"text"} inputPlaceholder={"Tên"} />
      <Input inputType={"email"} inputPlaceholder={"Email"} onChange={(e) => setEmail(e.target.value)}/>
      <Input inputType={"password"} inputPlaceholder={"Mật khẩu"} onChange={(e) => setPassword(e.target.value)}/>
      <Input inputType={"password"} inputPlaceholder={"Nhập lại mật khẩu"} />
      <LoginButton LoginButtonText={"Tiếp tục"} />
    </form>
  );
};

export default SignUpInputs;
