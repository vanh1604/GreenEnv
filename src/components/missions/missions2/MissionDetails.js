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
    <main class="mission-details--mission-details">
      <div class="mission-details--mission-header">
        <div class="mission-details--general-info">
          <div class="mission-details--header--first_line">
            <div class="mission-details--mission-title">Nhiệm vụ làm sạch</div>
            <div class="mission-details--mission-rewards">+50</div>
          </div>
          <div class="mission-details--header--second_line">
            <div class="mission-details--contact">
              <img src={locationIcon} alt="" class="mission-details--icon" />
              <div class="mission-details--mission-location">
                Số 11, Vũ Phạm Hàm, Yên Hòa, Cầu Giấy, HN
              </div>
            </div>

            <div class="mission-details--contact">
              <img src={callIcon} alt="" class="mission-details--icon" />
              <div class="mission-details--mission-call">(+84) 912 345 678</div>
            </div>
          </div>
        </div>
        <div class="mission-details--button-container">
          <button class="mission-details--join-button">Tham gia</button>
        </div>
      </div>
      <div class="mission-details--mission-hero">
        <img src={missionImg} alt="" class="mission-details--mission-img" />
        <div class="mission-details--dots">
          <img src={dot1} alt="" class="mission-details--dot" />
          <img src={dot2} alt="" class="mission-details--dot" />
          <img src={dot3} alt="" class="mission-details--dot" />
        </div>
      </div>
      <div class="mission-details--mission-info">
        <div class="mission-details--mission-description">
          Lorem ipsum dolor sit amet consectetur. Eget nascetur in dolor lectus
          parturient pretium amet eu pellentesque. Senectus eu aliquet elementum
          id est. Ullamcorper ipsum in aliquet sed aliquam egestas diam. Egestas
          iaculis sit gravida fringilla egestas amet ac.
        </div>
        <div class="mission-details--mission-instruction">
          <div class="mission-details--title">Hướng dẫn:</div>
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
        <div class="mission-details--mission-regulation">
          <div class="mission-details--title">Quy định:</div>
          <div class="mission-details--regulation-text">
            Bạn cần phải hoàn thành nhiệm vụ trong vòng tối đa 3 ngày. Sau 3
            ngày nhiệm vụ sẽ tự động hủy
          </div>
        </div>
      </div>
      <img src={map} alt="" class="mission-details--map" />
    </main>
  );
};

export default MissionDetails;
