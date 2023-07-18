import React from "react";
import Img from "../Img";
import Logo from "../Logo";
import SigninTexts from "./SigninTexts";
import SigninInputs from "./SigninInputs";
// import LoginButton from "../LoginButton";

const SignIn = () => {
  return (
    <div className="login--screen">
      <Img />
      <div className="login--login_part">
        <Logo />
        <SigninTexts
          text={"Đăng nhập tài khoản của bạn"}
          subtext={"Bạn chưa có tài khoản?"}
          subtextSpan={"Đăng ký"}
        />
        <SigninInputs />
      </div>
    </div>
  );
};

export default SignIn;
