import React, { useState, useEffect } from "react";
import callIcon from "../img/ic_call.png";
import locationIcon from "../img/ic_location_on.png";
import rewardIcon from "../img/ic_database.png";
import missionImg from "../img/mission-img.png";
import "./Mission.css";
import { useNavigate } from "react-router";
import { colRefMissions, colRefUsers } from "../../../firebase";
import { updateDoc, doc, getDocs } from "firebase/firestore";
import MissionConfirm from "../confirmation-boxes/mission-confirm/MissionConfirm";

const Mission = ({ title, content, address, number, point, id }) => {
  const navigate = useNavigate();
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [userDoc, setUserDoc] = useState({});
  const [mission, setMission] = useState({});

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

    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        // console.log(doc.data(), doc.id);
        if (doc.data().title === title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getMission();
  }, []);

  const HandleAcceptMissionClicked = () => {
    // console.log(`You have accepted mission ${id}`);
    setConfirmAccept(true);
    // alert(`Bạn đã nhận thành công nhiệm vụ ${id}`);
  };

  const HandleAcceptMission = async () => {
    setConfirmAccept(false);
    console.log("Accepted!");
    await updateDoc(doc(colRefMissions, id), {
      volunteer: userDoc.email,
    });
    await updateDoc(doc(colRefMissions, id), {
      status: "accepted",
    });
    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        // console.log(doc.data(), doc.id);
        if (doc.data().title === title) {
          setMission({ ...doc.data(), id: doc.id });
          // console.log(mission);
          return;
        }
      });
    };
    getMission();
  };

  const HandleNotAcceptMission = () => {
    setConfirmAccept(false);
  };

  const handleToMissionInfo = () => {
    navigate(`/missions/details/${id}`);
  };

  return (
    <div className="mission">
      {confirmAccept ? (
        <MissionConfirm
          title={mission.title}
          number={mission.number}
          address={mission.address}
          content={mission.content}
          point={mission.point}
          duration={mission.duration}
          id={mission.id}
          HandleAcceptMission={HandleAcceptMission}
          HandleNotAcceptMission={HandleNotAcceptMission}
        />
      ) : null}
      <div className="mission--container">
        <div className="mission--about_part">
          <div className="mission--title">{title}</div>
          <div className="mission--description">{content}</div>
        </div>
        <div className="mission--contacts">
          <div className="mission--contact">
            <img
              src={callIcon}
              alt="phone call icon"
              className="mission--contact_icon"
            />
            <div className="mission--contact_info" id="contact-call">
              {number}
            </div>
          </div>
          <div className="mission--contact">
            <img
              src={locationIcon}
              alt="location icon"
              className="mission--contact_info"
            />
            <div className="mission--contact_info">{address}</div>
          </div>
        </div>
        <div className="mission--rewards">
          <img src={rewardIcon} alt="" className="mission--reward_icon" />
          <div className="mission--reward_value">+{point}</div>
        </div>
        <div className="mission--buttons">
          {mission.status === "not accepted" ? (
            <button
              className="mission--button mission--join_button"
              onClick={HandleAcceptMissionClicked}
            >
              Tham gia
            </button>
          ) : null}
          <button
            className="mission--button mission--info_button"
            onClick={handleToMissionInfo}
          >
            Thông tin
          </button>
        </div>
        <div className="img-part">
          <img src={missionImg} alt="mission img" className="mission--img" />
        </div>
      </div>
    </div>
  );
};

export default Mission;
