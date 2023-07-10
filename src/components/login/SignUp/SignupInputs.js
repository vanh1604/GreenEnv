import React from "react";
import Input from "../Input";

const SignUpInputs = () => {
  return (
    <div className="login--inputs">
      <Input inputType={"text"} inputPlaceholder={"Tên"} />
      <Input inputType={"tel"} inputPlaceholder={"Số điện thoại"} />
      <Input inputType={"password"} inputPlaceholder={"Mật khẩu"} />
      <Input inputType={"password"} inputPlaceholder={"Nhập lại mật khẩu"} />
    </div>
  );
};

export default SignUpInputs;
