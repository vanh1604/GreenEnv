import React from "react";
import Input from "../Input";

const SigninInputs = () => {
  return (
    <div className="login--inputs">
      <Input inputType={"tel"} inputPlaceholder={"Số điện thoại"}/>
      <Input inputType={"password"} inputPlaceholder={"Mật khẩu"}/>
      <div className="login--forget_password">Quên mật khẩu</div>
    </div>
  );
};

export default SigninInputs;
