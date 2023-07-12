import React from "react";
import Img from "../Img";
import Logo from "../Logo";
import SignupTexts from "./SignupTexts";
import SignupInputs from "./SignupInputs";

const SignUp = () => {
  return (
    <div className="login--screen">
      <Img />
      <div className="login--login_part">
        <Logo />
        <SignupTexts
          text={"Đăng ký tài khoản của bạn"}
          subtext={"Bạn đã có sẵn một tài khoản?"}
          subtextSpan={"Đăng nhập"}
        />
        <SignupInputs />
      </div>
    </div>
  );
};

export default SignUp;
