import React from "react";
import "./User.css";
import avatar from "../common-components/img/Avatar.png";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { useState } from "react";

const User = () => {

  const [phoneNumber, setPhoneNumber] = useState("");
  const [phoneEditState, setPhoneEditState] = useState(false);
  const [phoneEditText, setPhoneEditText] = useState("Chỉnh sửa");

  const navigate = useNavigate();

  const { user, logout } = UserAuth();

  const handleLogout = async () => {
    try {
      await logout();
      let qSaveAccount = "";
      do {
        qSaveAccount = prompt("Bạn có muốn lưu tài khoản không? (YES / NO) ");
      } while (qSaveAccount !== "YES" && qSaveAccount !== "NO");
      if (qSaveAccount === "NO") {
        localStorage.removeItem("email");
        localStorage.removeItem("password");
      }
      // console.log(user);
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handlePhoneEdit = () => {
    const phoneNumber = document.getElementById("user-menu--phone_number")
    if (phoneEditState) {
      setPhoneEditText("Chỉnh sửa");
      setPhoneEditState(false);
      phoneNumber.classList.remove("user-menu--info_editing");

    }
    else {
      setPhoneEditText("Lưu");
      setPhoneEditState(true);
      phoneNumber.classList.add("user-menu--info_editing");
    }
  }

  return (
    <div className="user-menu">
      <div className="user-menu--account_line">
        <div className="user-menu--account_container">
          <img src={avatar} alt="" className="user-menu--avatar" />
          <div className="user-menu--account">{user.displayName}</div>
        </div>
        <button className="user-menu--update_btn" onClick={handleLogout}>
          Đăng xuất
        </button>
      </div>
      <div className="user-menu--info">
        <div className="user-menu--info_line1">
          <div className="user-menu--name">
            <div className="user-menu--label user-menu--name_label">
              Họ và tên
            </div>
            <div>{user.displayName}</div>
          </div>
          <div className="user-menu--phone">
            <div className="user-menu--label user-menu--phone_label">
              Số điện thoại
            </div>
            <div id="user-menu--phone_number" contentEditable={phoneEditState}>{user.phoneNumber}</div>
            <span className="user-menu--edit_info" onClick={handlePhoneEdit}>{phoneEditText}</span>
          </div>
        </div>
        <div className="user-menu--info_line2">
          <div className="user-menu--email">
            <div className="user-menu--label user-menu--email_label">Email</div>
            <div>{user.email}</div>
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
