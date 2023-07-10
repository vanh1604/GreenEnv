import React from "react";
import "./Footer.css";
import twitterIcon from "./img/ic_social-twitter 1.svg";
import instagramIcon from "./img/ic_instagram 1.svg";
import dribbleIcon from "./img/ic_dribbble 1.svg"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer--company_name">(c) Green Env Viet Nam</div>
      <div className="footer--contacts">
        <div className="footer--contact_gmail">Greenenv@gmail.com</div>
        <div className="footer--contact_call">(+84)  912 345 678</div>
      </div>
      <div className="footer--icons">
        <img src={twitterIcon} alt="" className="footer--icon" />
        <img src={instagramIcon} alt="" className="footer--icon" />
        <img src={dribbleIcon} alt="" className="footer--icon" />
      </div>
    </footer>
  );
};

export default Footer;
