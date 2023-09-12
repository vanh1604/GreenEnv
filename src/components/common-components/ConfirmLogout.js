import React from "react";
import "../missions/confirmation-boxes/MissionConfirmCancel.css";
import DarkBackground from "./DarkBackground";

const ConfirmLogout = ({ handleNotLogout, handleLogout }) => {
  return (
    <div className="mision-confirm">
      {/* <div className="mission-confirm--bg"></div> */}
      <DarkBackground />
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Đăng xuất</div>
        <div className="mission-confirm--question">
          Bạn có muốn lưu tài khoản trước khi đăng xuất?
        </div>
        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn0_return"
            onClick={handleNotLogout}
          >
            Hủy
          </button>
          <button
            className="mission-confirm--button mission-confirm--btn1_accept"
            onClick={() => {handleLogout(0)}}
          >
            Không
          </button>
          <button
            className="mission-confirm--button mission-confirm--btn2_accept"
            onClick={handleLogout}
          >
            Có
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmLogout;
