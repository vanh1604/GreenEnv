import React, { useState, useEffect } from "react";
import "./User.css";
import avatar from "../common-components/img/Avatar.png";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { getDocs } from "firebase/firestore";
import { colRefUsers, colRefPresents } from "../../firebase";
import ConfirmLogout from "../common-components/ConfirmLogout";
import PresentItem from "./PresentItem";

const User = (props) => {
  const navigate = useNavigate();
  const { user, logout } = UserAuth();
  const [userDoc, setUserDoc] = useState({});
  const [confirmLogout, setConfirmLogout] = useState(false);
  const [presents, setPresents] = useState([]);

  console.log(user);

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

    const getPresents = async () => {
      const data = await getDocs(colRefPresents);
      setPresents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getPresents();

    if (props.role !== props.userRole) {
      if (props.role === "user") navigate("/admin");
      else navigate("/user");
    }
  }, []);

  const handleLogoutClicked = () => {
    setConfirmLogout(true);
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
  const handleInfoEdit = () => {
    navigate(`edit`);
  };

  return (
    <>
      <div className="user-menu">
        {confirmLogout ? (
          <ConfirmLogout
            handleLogout={handleLogout}
            handleNotLogout={handleNotLogout}
          />
        ) : null}
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
            <button
              className="user-menu--logout_btn"
              onClick={handleLogoutClicked}
            >
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
              <div className="user-menu--label user-menu--email_label">
                Email
              </div>
              <div>{user.email}</div>
            </div>
            {userDoc.role !== "admin" ? (
              <div className="user-menu--score">
                <div className="user-menu--label user-menu--score_label">
                  Điểm
                </div>
                <div className="user-menu--score_value">{userDoc.score}</div>
              </div>
            ) : null}
          </div>

          {userDoc.role !== "admin" ? (
            <div className="user-menu-present">
              <div className="user-menu--label user-menu--email_label">
                Quà đã đổi
              </div>
              <div className="user-present-board">
                <div className="user-present-board--labels">
                  <div className="user-present-board--label">Mã quà</div>
                  <div className="user-present-board--label">Tên quà</div>
                  <div className="user-present-board--label2">Ảnh</div>
                </div>
                <div className="user-present-board--missions">
                  {presents.map((present) => {
                    if (userDoc.exchange[present.id] === true) {
                      return (
                        <PresentItem
                          id={present.id}
                          name={present.name}
                          link={present.pic}
                        />
                      );
                    }
                  })}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default User;
