import React from "react";
import "./User.css";
import avatar from "../common-components/img/Avatar.png";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";

const User = () => {
  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      // console.log(user);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <div className="user-menu">
      <div className="user-menu--account_line">
        <div className="user-menu--account_container">
          <img src={avatar} alt="" className="user-menu--avatar" />
          <div className="user-menu--account">Nguyễn Văn A</div>
        </div>
        <button className="user-menu--update_btn" onClick={handleLogout}>Đăng xuất</button>
      </div>
      <div className="user-menu--info">
        <div className="user-menu--info_line1">
          <div className="user-menu--name">
            <div className="user-menu--label user-menu--name_label">
              Họ và tên
            </div>
            <div>Name</div>
          </div>
          <div className="user-menu--phone">
            <div className="user-menu--label user-menu--phone_label">
              Số điện thoại
            </div>
            <div>0918000000</div>
          </div>
        </div>
        <div className="user-menu--info_line2">
          <div className="user-menu--email">
            <div className="user-menu--label user-menu--email_label">Email</div>
            <div>mail@mail.com</div>
          </div>
          <div className="user-menu--score">
            <div className="user-menu--label user-menu--score_label">Điểm</div>
            <div>50</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
