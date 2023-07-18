import React from "react";
import "./Header.css";
import logo from "./img/logoGreen.png";
import notificationsActiveIcon from "./img/notifications_active.png";
import bookmarkIcon from "./img/bookmark.png";
import avatar from "./img/Avatar.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";

const Header = () => {
  const { user } = UserAuth();
  const pathname = window.location.pathname; //returns the current url minus the domain name

  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/");
  }

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleMissionsClick = () => {
    navigate("/missions");
  };

  const handleActivityClick = () => {
    navigate("/activity");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleMainSigninText = () => {
    navigate('/signin');
  }

  const handleAvatarClick = () => {
    navigate("/user");
  };

  return (
    <header className="header">
      <div className="header--nav_part">
        <div className="header--logo_container">
          <img
            className="header--logo"
            src={logo}
            alt="Green Env logo green color"
            onClick={handleLogoClick}
          />
        </div>
        <div className="header--nav_options">
          <div className="header--option" onClick={handleAboutClick}>
            {(pathname==='/about') ? (
              <div className="header--option_chosen"></div>
            ) : null}
            Giới thiệu
          </div>
          <div className="header--option" onClick={handleMissionsClick}>
            {(pathname==='/missions' ) ? (
              <div className="header--option_chosen"></div>
            ) : null}
            Nhiệm vụ
          </div>
          <div className="header--option" onClick={handleActivityClick}>
            {(pathname==='/activity')? (
              <div className="header--option_chosen"></div>
            ) : null}
            Hành động
          </div>
          <div className="header--option" onClick={handleContactClick}>
            {(pathname==='/contact') ? (
              <div className="header--option_chosen"></div>
            ) : null}
            Liên hệ
          </div>
        </div>
      </div>
      {user ? (
        <div className="header--user_part">
          <img src={notificationsActiveIcon} alt="" />
          <img src={bookmarkIcon} alt="" />
          <div className="header--avatar_line"></div>
          <img className="header--avatar" src={avatar} alt="" onClick={handleAvatarClick} />
        </div>
      ) : (
          <button className="header--sign_in_text" onClick={handleMainSigninText}>
            Đăng nhập
          </button>
      )}
    </header>
  );
};

export default Header;
