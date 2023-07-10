import React from "react";
import "./Header.css";
import logo from "./img/logoGreen.png";
import notificationsActiveIcon from "./img/notifications_active.png";
import bookmarkIcon from "./img/bookmark.png";
import avatar from "./img/Avatar.png";

const Header = () => {
  return (
    <header className="header">
      <div className="header--nav_part">
        <div className="header--logo_container">
          <img className="header--logo" src={logo} alt="Green Env logo green color" />
        </div>
        <div className="header--nav_options">
          <div className="header--option">Giới thiệu</div>
          <div className="header--option_chosen">
            <div className="header--option">Nhiệm vụ</div>
          </div>
          <div className="header--option">Hành động</div>
          <div className="header--option">Liên hệ</div>
        </div>
      </div>
      <div className="header--user_part">
        <img src={notificationsActiveIcon} alt="" />
        <img src={bookmarkIcon} alt="" />
        <div className="header--avatar_line"></div>
        <img src={avatar} alt="" />
      </div>
    </header>
  );
};

export default Header;
