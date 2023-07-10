import React from "react";
import "./AccountModify.css";
import avatar from "../common-components/img/Avatar.png";

const AccountModify = () => {
  return (
    <div className="account-modify">
      <div className="account-modify--account_line">
        <div className="account-modify--account_container">
          <img src={avatar} alt="" className="account-modify--avatar" />
          <div className="account-modify--account">Nguyễn Văn A</div>
        </div>
        <button className="account-modify--update_btn">Cập nhật</button>
      </div>
      <div className="account-modify--inputs">
        <div className="account-modify--info_line1">
          <div className="account-modify--name">
            <div className="account-modify--label account-modify--name_label">
              Họ và tên
            </div>
            <input
              type="text"
              className="account-modify--input account-modify--name_input"
            />
          </div>
          <div className="account-modify--phone">
            <div className="account-modify--label account-modify--phone_label">
              Số điện thoại
            </div>
            <input
              type="tel"
              className="account-modify--input account-modify--phone_input"
            />
          </div>
        </div>
        <div className="account-modify--info_line2">
          <div className="account-modify--email">
            <div className="account-modify--label account-modify--email_label">
              Email
            </div>
            <input
              type="email"
              className="account-modify--input account-modify--email_input"
            />
          </div>
        </div>
        <div className="account-modify--info_line3">
          <div className="account-modify--password_old">
            <div className="account-modify--label account-modify--password_old_label">
              Mật khẩu cũ
            </div>
            <input
              type="password"
              className="account-modify--input account-modify--password_old_input"
            />
          </div>
          <div className="account-modify--password_new">
            <div className="account-modify--label account-modify--password_new_label">
              Mật khẩu
            </div>
            <input
              type="password"
              className="account-modify--input account-modify--password_new_input"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountModify;
