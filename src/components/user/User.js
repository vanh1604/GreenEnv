import React, { useState, useEffect } from "react";
import "./User.css";
import avatar from "../common-components/img/Avatar.png";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { getDocs } from "firebase/firestore";
import { colRefUsers } from "../../firebase";
// import backArrow from "../common-components/img/arrow-left-solid.svg";

const User = (props) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
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
    if (props.role !== props.userRole) {
      if (props.role === "user") navigate("/admin");
      else navigate("/user");
    }
  }, []);

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
      navigate("/");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleInfoEdit = () => {
    navigate(`edit`);
  };

  return (
    <div className="user-menu">
      <div className="user-menu--account_line">
        <div className="user-menu--account_container">
          <img src={avatar} alt="" className="user-menu--avatar" />
          <div className="user-menu--account">
            {userDoc.username ? userDoc.username : userDoc.name}
          </div>
        </div>
        <div className="user-menu--buttons">
          <button className="user-menu--update_btn" onClick={handleInfoEdit}>
            Chỉnh sửa
          </button>
          <button className="user-menu--logout_btn" onClick={handleLogout}>
            Đăng xuất
          </button>
        </div>
      </div>
      <div className="user-menu--info">
        <div className="user-menu--info_line1">
          <div className="user-menu--name">
            <div className="user-menu--label user-menu--name_label">
              Họ và tên
            </div>
            <div>{userDoc.name}</div>
          </div>
          <div className="user-menu--phone">
            <div className="user-menu--label user-menu--phone_label">
              Số điện thoại
            </div>
            <div id="user-menu--phone_number">
              {userDoc.phoneNumber !== "" ? userDoc.phoneNumber : "Chưa có"}
            </div>
          </div>
        </div>
        <div className="user-menu--info_line2">
          <div className="user-menu--email">
            <div className="user-menu--label user-menu--email_label">Email</div>
            <div>{user.email}</div>
          </div>
          <div className="user-menu--score">
            <div className="user-menu--label user-menu--score_label">Điểm</div>
            <div className="user-menu--score_value">{userDoc.score}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default User;
