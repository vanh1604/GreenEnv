import React, { useState, useEffect } from "react";
import "./Header.css";
import logo from "./img/logoGreen.png";
import notificationsActiveIcon from "./img/notifications_active.png";
import bookmarkIcon from "./img/bookmark.png";
import avatar from "./img/Avatar.png";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../context/AuthContext";
import { getDocs } from "firebase/firestore";
import { colRefUsers } from "../../firebase";
import ConfirmLogout from "./ConfirmLogout";

const Header = () => {
  const { user, logout } = UserAuth();
  const pathname = window.location.pathname; //returns the current url minus the domain name
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [userBoxShowing, setUserBoxShowing] = useState(false);

  const navigate = useNavigate();

  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    const getUserDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === localStorage.email) {
          setUserDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserDoc();
  }, []);

  const handleLogoClick = () => {
    navigate("/");
  };

  const handleAboutClick = () => {
    navigate("/about");
  };

  const handleMissionsClick = () => {
    navigate("/missions");
  };

  const handleActivityClick = () => {
    navigate("/activity");
  };

  const handleExchangeClick = () => {
    navigate("/exchange");
  };

  const handleContactClick = () => {
    navigate("/contact");
  };

  const handleMainSigninText = () => {
    navigate("/signin");
  };

  const handleAvatarClick = () => {
    setUserBoxShowing(!userBoxShowing);
  };

  const handleUserMenuClicked = () => {
    navigate(`/${userDoc.role}`);
    setUserBoxShowing(!userBoxShowing);
  };

  const handleUserMissionsClicked = () => {
    navigate(`/${userDoc.role}/missions`);
    setUserBoxShowing(!userBoxShowing);
  };

  const handleInfoEdit = () => {
    navigate(`/${userDoc.role}/edit`);
    setUserBoxShowing(!userBoxShowing);
  };

  const handleLogoutClicked = () => {
    setConfirmLogout(true);
    setUserBoxShowing(!userBoxShowing);
  };

  const handleNotLogout = () => {
    setConfirmLogout(false);
  };

  const handleLogout = async (choice) => {
    try {
      await logout();
      if (choice === 0) {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
    setConfirmLogout(false);
  };

  return (
    <div className="header--container">
      {confirmLogout ? (
        <ConfirmLogout
          handleLogout={handleLogout}
          handleNotLogout={handleNotLogout}
        />
      ) : null}
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
              {pathname === "/about" ? (
                <div className="header--option_chosen"></div>
              ) : null}
              Giới thiệu
            </div>
            <div className="header--option" onClick={handleMissionsClick}>
              {pathname === "/missions" ? (
                <div className="header--option_chosen"></div>
              ) : null}
              Nhiệm vụ
            </div>
            <div className="header--option" onClick={handleActivityClick}>
              {pathname === "/activity" ? (
                <div className="header--option_chosen"></div>
              ) : null}
              Hành động
            </div>
            <div className="header--option" onClick={handleExchangeClick}>
              {pathname === "/contact" ? (
                <div className="header--option_chosen"></div>
              ) : null}
              Đổi quà
            </div>
            <div className="header--option" onClick={handleContactClick}>
              {pathname === "/contact" ? (
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
            <div className="header--avatar_container">
              <img
                className="header--avatar"
                src={avatar}
                alt=""
                onClick={handleAvatarClick}
              />
              {userBoxShowing ? (
                <div className="header--avatar_userbox">
                  <div className="header--avatar_userbox_user">
                    <img
                      className="header--avatar_userbox_img"
                      src={avatar}
                      alt=""
                    />
                    <div className="header--avatar_userbox_name">
                      {userDoc.username ? userDoc.username : userDoc.name}
                    </div>
                  </div>
                  <div className="header--avatar_userbox_line"></div>

                  <div className="header--avatar_userbox_details">
                    <div
                      className="header--avatar_userbox_option header--avatar_userbox_missions"
                      onClick={handleUserMenuClicked}
                    >
                      Trang cá nhân
                    </div>
                    {userDoc.role === "user" ? (
                      <>
                        <div className="header--avatar_userbox_score">
                          <div className="header--avatar_userbox_score_label">
                            Điểm
                          </div>
                          <div className="header--avatar_userbox_score_value">
                            {userDoc.score}
                          </div>
                        </div>
                        <div
                          className="header--avatar_userbox_option header--avatar_userbox_missions"
                          onClick={handleUserMissionsClicked}
                        >
                          Nhiệm vụ
                        </div>
                      </>
                    ) : null}
                  </div>
                  <div className="header--avatar_userbox_line"></div>
                  <div className="header--avatar_userbox_actions">
                    <div
                      className="header--avatar_userbox_option header--avatar_userbox_missions"
                      onClick={handleInfoEdit}
                    >
                      Cài đặt tài khoản
                    </div>
                    <div
                      className="header--avatar_userbox_option header--avatar_userbox_missions"
                      onClick={handleLogoutClicked}
                    >
                      Đăng xuất
                    </div>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        ) : (
          <button
            className="header--sign_in_text"
            onClick={handleMainSigninText}
          >
            Đăng nhập
          </button>
        )}
      </header>
    </div>
  );
};

export default Header;
