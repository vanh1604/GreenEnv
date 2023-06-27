import React from "react";
import "./MissionDetails.css";
import callIcon from "../img/ic_call.png";
import locationIcon from "../img/ic_location_on.png";
import missionImg from "../img/Rectangle 6.png";
import map from "../img/map.png";
import dot1 from "../img/Ellipse 3.svg";
import dot2 from "../img/Ellipse 4.svg";
import dot3 from "../img/Ellipse 5.svg";

const MissionDetails = () => {
  return (
    <main className="mission-details">
      <div className="mission-header">
        <div className="general-info">
          <div className="header--first_line">
            <div className="mission-title">Nhiệm vụ làm sạch</div>
            <div className="mission-rewards">+50</div>
          </div>
          <div className="header--second_line">
            <div className="contact">
              <img src={locationIcon} alt="" className="icon" />
              <div className="mission-location">
                Số 11, Vũ Phạm Hàm, Yên Hòa, Cầu Giấy, HN
              </div>
            </div>

            <div className="contact">
              <img src={callIcon} alt="" className="icon" />
              <div className="mission-call">(+84) 912 345 678</div>
            </div>
          </div>
        </div>
        <div className="button-container">
          <button className="join-button">Tham gia</button>
        </div>
      </div>
      <div className="mission-hero">
        <img src={missionImg} alt="" className="mission-img" />
        <div className="dots">
          <img src={dot1} alt="" className="dot" />
          <img src={dot2} alt="" className="dot" />
          <img src={dot3} alt="" className="dot" />
        </div>
      </div>
      <div className="mission-info">
        <div className="mission-description">
          Lorem ipsum dolor sit amet consectetur. Eget nascetur in dolor lectus
          parturient pretium amet eu pellentesque. Senectus eu aliquet elementum
          id est. Ullamcorper ipsum in aliquet sed aliquam egestas diam. Egestas
          iaculis sit gravida fringilla egestas amet ac.
        </div>
        <div className="mission-instruction">
          <div className="title">Hướng dẫn:</div>
          <ul>
            <li>Bước 1: Đăng ký nhận nhiệm vụ</li>
            <li>Bước 2: Thực hiện nhiệm vụ làm sạch</li>
            <li>
              Bước 3: Chụp ảnh khu vực được làm sạch (Toàn cảnh, cận cảnh)
            </li>
            <li>Bước 4: Up ảnh lên chờ xét duyệt</li>
            <li>Bước 5: Nhận điểm</li>
          </ul>
        </div>
        <div className="mission-regulation">
          <div className="title">Quy định:</div>
          <div className="regulation-text">
            Bạn cần phải hoàn thành nhiệm vụ trong vòng tối đa 3 ngày. Sau 3
            ngày nhiệm vụ sẽ tự động hủy
          </div>
        </div>
      </div>
      <img src={map} alt="" className="map" />
    </main>
  );
};

export default MissionDetails;
