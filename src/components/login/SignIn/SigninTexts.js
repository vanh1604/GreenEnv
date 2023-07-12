import React from "react";
import { Link } from "react-router-dom";

const LoginTexts = ({ text, subtext, subtextSpan }) => {
  return (
    <div className="login--texts">
      <div className="login--text">{text}</div>
      <div className="login--subtext">
        {subtext}{" "}
        <span>
          <Link to={"signup"}>{subtextSpan}</Link>
        </span>
      </div>
    </div>
  );
};

export default LoginTexts;
