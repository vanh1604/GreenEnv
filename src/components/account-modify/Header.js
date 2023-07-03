import React from "react";
import "./Header.css";
import logo from "./img/logoGreen.png";
import notificationsActiveIcon from "./img/notifications_active.png";
import bookmarkIcon from "./img/bookmark.png";
import avatar from "./img/Avatar.png";

const Header = () => {
  return (
    <header className="header">
      <div className="nav-part">
        <div className="logo-container">
          <img className="logo" src={logo} alt="Green Env logo green color" />
        </div>
        <div className="nav-options">
          <div className="option">Giới thiệu</div>
          <div className="option-chosen">
            <div className="option">Nhiệm vụ</div>
          </div>
          <div className="option">Hành động</div>
          <div className="option">Liên hệ</div>
        </div>
      </div>
      <div className="user-part">
        <img src={notificationsActiveIcon} alt="" />
        <img src={bookmarkIcon} alt="" />
        <div className="avatar-line"></div>
        <img src={avatar} alt="" />
      </div>
    </header>
  );
};

export default Header;
