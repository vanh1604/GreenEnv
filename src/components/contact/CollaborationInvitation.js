import React from "react";
import "./CollaborationInvitation.css";
import sendIcon from "./img/end icon.svg";

const CollaborationInvitation = () => {
  return (
    <div className="collaborationInvitation">
      <div className="ci_text">
        <div className="ci_headline">Bạn có một dự án?</div>
        <div className="ci_instructions">
          <div className="ci_instruction1">
            Sử dụng biểu mẫu để liên hệ và đóng góp với chúng tôi. Chúng tôi sẽ
            liên hệ với bạn khi có thể
          </div>
          <div className="ci_instruction2">
            Ngoài ra, hãy liên lạc bằng cách sử dụng thông tin bên dưới.
          </div>
        </div>
        <div className="ci_contacts">
          <div className="ci--contact_email">greenenv@gmail.com</div>
          <div className="ci--contact_call">(+84) 912 345 678</div>
        </div>
      </div>
      <div className="ci_form">
        <div className="ci--personal_info">
          <input type="text" className="ci_form_name" placeholder="Tên" />
          <input
            type="tel"
            className="ci_form_phone"
            placeholder="Số điện thoại"
          />
        </div>
        <input type="text" className="ci_form_details" placeholder="Chi tiết" />
        <div className="ci--btn_container">
          <button className="ci_send">
            Gửi
            <img src={sendIcon} alt="" className="ci--send_icon" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CollaborationInvitation;
