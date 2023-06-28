import React from "react";
import "./JoinInvitation.css";

const JoinInvitation = () => {
  return (
    <div className="joinInvitation">
      <div className="content-container">
        <div className="ji_headline">Sẵn sàng chung tay</div>
        <div className="text">
          Chúng tôi luôn tìm kiếm những cá nhân tin vào sứ mệnh vì một Việt Nam
          sạch hơn và xanh hơn. Nếu bạn thấy hứng thú tham gia cùng chúng tôi
          hoặc có câu hỏi nào, xin vui lòng liên hệ
        </div>
        <div className="buttons">
          <button className="btn1">greenenv@gmail.com</button>
          <button className="btn2">(+84) 912 345 678</button>
        </div>
      </div>
    </div>
  );
};

export default JoinInvitation;
