import React, { useEffect, useState } from "react";
import "./MissionDetails.css";
import callIcon from "../img/ic_call.png";
import locationIcon from "../img/ic_location_on.png";
import missionImg from "../img/Rectangle 6.png";
import map from "../img/map.png";
import dot1 from "../img/Ellipse 3.svg";
import dot2 from "../img/Ellipse 4.svg";
import dot3 from "../img/Ellipse 5.svg";
import { colRefMissions, colRefUsers } from "../../../firebase";
import { getDocs, updateDoc, doc } from "firebase/firestore";
import MissionCancel from "../confirmation-boxes/mission-cancel/MissionCancel";
import MissionAccept from "../confirmation-boxes/mission-accept/MissionAccept";
import MissionUpload from "../confirmation-boxes/upload-image/MissionUpload";
import backArrow from "../../common-components/img/arrow-left-solid.svg";
import { useNavigate } from "react-router";
import { UserAuth } from "../../../context/AuthContext";

const MissionDetails = (props) => {
  const [userDoc, setUserDoc] = useState({});
  const [mission, setMission] = useState({});
  const [confirmCancel, setConfirmCancel] = useState(false);
  const [confirmAccept, setConfirmAccept] = useState(false);
  const [confirmUpload, setConfirmUpload] = useState(false);
  const [statusDisplay, setStatusDisplay] = useState(
    <div className={`mission--details_chip mission--status_${props.status}`}>
      {props.statusText}
    </div>
  );
  const navigate = useNavigate();
  const { user } = UserAuth();

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
    if (user) getUserDoc();

    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    if (user) getMission();
  }, []);

  const HandleBackToMissions = () => {
    navigate("/missions");
  };

  const HandleAcceptMissionClicked = () => {
    if (!user) {
      alert("Vui lòng đăng nhập trước!");
      return;
    }
    setConfirmAccept(true);
  };

  const HandleAcceptMission = async () => {
    setConfirmAccept(false);
    await updateDoc(doc(colRefMissions, props.id), {
      volunteer: userDoc.email,
    });
    await updateDoc(doc(colRefMissions, props.id), {
      status: "accepted",
      statusText: "Mới",
    });
    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getMission();
  };

  const HandleUploadImageClicked = () => {
    setConfirmUpload(true);
  };

  const HandleNotUploadImage = () => {
    setConfirmUpload(false);
  };

  const HandleNotAcceptMission = () => {
    setConfirmAccept(false);
  };

  const HandleCancelMissionClicked = () => {
    setConfirmCancel(true);
  };

  const HandleKeepMission = () => {
    setConfirmCancel(false);
  };

  const HandleConfirmUploadExit = () => {
    setConfirmUpload(false);
  }

  const updateInfo2 = async (missionId) => {
    await updateDoc(doc(colRefMissions, missionId), {
      volunteer: "",
    });
    await updateDoc(doc(colRefMissions, missionId), {
      status: "not accepted",
      statusText: "Chưa nhận",
    });
    const getMission = async () => {
      const data2 = await getDocs(colRefMissions);
      data2.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getMission();
  };

  const HandleCancelMission = async () => {
    setConfirmCancel(false);
    const data = await getDocs(colRefMissions);
    data.docs.forEach((doc) => {
      if (doc.data().title === props.title) {
        updateInfo2(props.id);
        return;
      }
    });
  };

  return (
    <main className="mission-details--mission-details">
      {confirmCancel ? (
        <MissionCancel
          title={props.title}
          number={props.number}
          address={props.address}
          content={props.content}
          score={props.score}
          duration={props.duration}
          id={props.id}
          HandleKeepMission={HandleKeepMission}
          HandleCancelMission={HandleCancelMission}
        />
      ) : null}
      {confirmAccept ? (
        <MissionAccept
          title={props.title}
          number={props.number}
          address={props.address}
          content={props.content}
          score={props.score}
          duration={props.duration}
          id={props.id}
          HandleNotAcceptMission={HandleNotAcceptMission}
          HandleAcceptMission={HandleAcceptMission}
        />
      ) : null}
      {confirmUpload ? (
        <MissionUpload
          title={props.title}
          number={props.number}
          address={props.address}
          content={props.content}
          point={props.point}
          duration={props.duration}
          id={props.id}
          HandleNotUploadImage={HandleNotUploadImage}
          HandleConfirmUploadExit={HandleConfirmUploadExit}
        />
      ) : null}

      <div
        role="button"
        className="mission-details--back_button"
        onClick={HandleBackToMissions}
      >
        <img
          src={backArrow}
          alt="back"
          className="user-menu--back_button_img"
        />
        <div className="user-menu--back_button_label">Nhiệm vụ</div>
      </div>
      <div className="mission-details--mission-header">
        <div className="mission-details--general-info">
          <div className="mission-details--header--first_line">
            <div className="mission-details--mission-title">{props.title}</div>
            <div className="mission-details--mission-rewards">
              +{props.score}
            </div>
            {statusDisplay ? (
              statusDisplay
            ) : (
              <>
                {props.volunteer === userDoc.email ? (
                  <div
                    className={`mission--details_chip mission--status_${props.status}`}
                  >
                    {props.statusText}
                  </div>
                ) : null}
              </>
            )}
          </div>
          <div className="mission-details--header--second_line">
            <div className="mission-details--contact">
              <img
                src={locationIcon}
                alt=""
                className="mission-details--icon"
              />
              <div className="mission-details--mission-location">
                {props.address}
              </div>
            </div>

            <div className="mission-details--contact">
              <img src={callIcon} alt="" className="mission-details--icon" />
              <div className="mission-details--mission-call">
                {props.number}
              </div>
            </div>
          </div>
        </div>
        <div className="mission-details--button-container">
          {mission.status === "not accepted" || !user ? (
            <button
              className="mission-details--button mission-details--join-button"
              onClick={HandleAcceptMissionClicked}
            >
              Tham gia
            </button>
          ) : (
            <>
              {userDoc.role === "user" ? (
                <>
                  <button
                    className="mission-details--button mission-details--upload_button"
                    onClick={HandleUploadImageClicked}
                  >
                    <span className="mission-details--plus_sign">&#43;</span>{" "}
                    Tải ảnh lên
                  </button>
                  <button
                    className="mission-details--button mission-details--cancel_button"
                    onClick={HandleCancelMissionClicked}
                  >
                    Hủy nhiệm vụ
                  </button>
                </>
              ) : null}
            </>
          )}
        </div>
      </div>
      <div className="mission-details--mission-hero">
        <img src={missionImg} alt="" className="mission-details--mission-img" />
        <div className="mission-details--dots">
          <img src={dot1} alt="" className="mission-details--dot" />
          <img src={dot2} alt="" className="mission-details--dot" />
          <img src={dot3} alt="" className="mission-details--dot" />
        </div>
      </div>
      <div className="mission-details--mission-info">
        <div className="mission-details--mission-description">
          {props.content}
        </div>
        <div className="mission-details--mission-instruction">
          <div className="mission-details--title">Hướng dẫn:</div>
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
        <div className="mission-details--mission-regulation">
          <div className="mission-details--title">Quy định:</div>
          <div className="mission-details--regulation-text">
            Bạn cần phải hoàn thành nhiệm vụ trong vòng tối đa {props.duration}{" "}
            ngày. Sau 3 ngày nhiệm vụ sẽ tự động hủy
          </div>
        </div>
      </div>
      <img src={map} alt="" className="mission-details--map" />
    </main>
  );
};

export default MissionDetails;
