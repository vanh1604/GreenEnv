import React from "react";

import { Link } from 'react-router-dom';
// import SignIn from "../SignIn/SignIn";

const SignupTexts = ({text, subtext, subtextSpan}) => {
  return (
    <div>
      <div className="login--texts">
        <div className="login--text">{text}</div>
        <div className="login--subtext">
          {subtext} <span><Link to={"/signin"}>{subtextSpan}</Link></span>
        </div>
      </div>
    </div>
  );
};

export default SignupTexts;
