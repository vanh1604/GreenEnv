import React from "react";
import callIcon from "../img/ic_call.png";
import locationIcon from "../img/ic_location_on.png";
import rewardIcon from "../img/ic_database.png";
import missionImg from "../img/mission-img.png";
import "./Mission.css";

const Mission = () => {
  return (
    <div className="mission">
      <div className="container">
        <div className="about-part">
          <div className="mission-title">Nhiệm vụ làm sạch</div>
          <div className="mission-description">
            Lorem ipsum dolor sit amet consectetur. Lectus ac viverra auctor in
            pretium blandit feugiat nibh. Phasellus arcu risus vulputate risus
            nunc fermentum. Purus vel pretium elementum parturient et in
            suspendisse non diam. Quisque magna sed cras et in pulvinar.
          </div>
        </div>
        <div className="mission-contacts">
          <div className="mission-contact">
            <img
              src={callIcon}
              alt="phone call icon"
              className="contact-icon"
            />
            <div className="contact-info" id="contact-call">
              (+84) 912 345 678
            </div>
          </div>
          <div className="mission-contact">
            <img
              src={locationIcon}
              alt="location icon"
              className="contact-icon"
            />
            <div className="contact-info">
              Số 11, Vũ Phạm Hàm, Yên Hòa, Cầu Giấy, HN
            </div>
          </div>
        </div>
        <div className="mission-rewards">
          <img src={rewardIcon} alt="" className="reward-icon" />
          <div className="reward-value"></div>+50
        </div>
        <div className="mission-buttons">
          <button className="join-button">Tham gia</button>
          <button className="info-button">Thông tin</button>
        </div>
        <div className="img-part">
          <img src={missionImg} alt="mission img" className="mission-img" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
