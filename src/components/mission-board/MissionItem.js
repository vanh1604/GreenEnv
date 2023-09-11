import React, { useState, useEffect } from "react";
import "./MissionItem.css";
<<<<<<< Updated upstream
import userIcon from "./img/user-solid.svg";
=======
import { updateDoc, doc, getDocs } from "firebase/firestore";
import { colRefUserMission } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { colRefMissions, colRefUsers } from "../../firebase";
import CheckImage from "../missions/confirmation-boxes/check-image/CheckImage";
>>>>>>> Stashed changes

const MissionItem = (props) => {
  let statusDisplay = (
    <div
<<<<<<< Updated upstream
      className={`mission-item--status_chip mission-item--status_${props.status}`}
    >
      {props.statusText}
    </div>
  );

  return (
    <>
      {props.volunteers.map((volunteer) => (
        <div className="mission-item">
          <div className="mission-item--mission">
            {props.id + ". " + props.mission}
          </div>
          <div className="mission-item--location">{props.address}</div>
          {props.userRole !== "admin" ? (
            <div className="mission-item--time">{props.time}</div>
          ) : null}
          <div className="mission-item--reward">{props.score}</div>
          <div className="mission-item--status">{statusDisplay}</div>
          {props.userRole === "admin" ? (
            <div className="mission-item--buttons">
              <div className="mission-item--volunteer">
                <img src={userIcon} alt="" />
                <div>{volunteer}</div>
              </div>
              {props.status !== "not accepted" && props.status !== "accepted" ? (
                <button className="mission-item--button mission-item--check_button">
                  Xem ảnh nộp
                </button>
              ) : null}
            </div>
          ) : null}
        </div>
      ))}
=======
      className={`mission-item--status_chip mission-item--status_${props.userStatus}`}
    >
      {props.userStatusText}
    </div>
  );

  const [checkImage, setCheckImage] = useState(false);

  const [volunteerDoc, setVolunteerDoc] = useState({});
  const [mission, setMission] = useState({});
  const [userMissionLink, setUserMissionLink] = useState({});
  const { user } = UserAuth();
  const [status, setStatus] = useState(props.userStatus);
  const [messageShowing, setMessageShowing] = useState(false);
  const [notifType, setNotifType] = useState("Thông báo");
  const [message, setMessage] = useState("");

  // console.log(props.userStatus, props.userStatusText);

  useEffect(() => {
    const getVolunteerDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (props.volunteers.includes(doc.data().email)) {
          setVolunteerDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getVolunteerDoc();

    // const getVolunteerDoc = async () => {
    //   const data = await getDocs(colRefUsers);
    //   data.docs.forEach((doc) => {
    //     if (doc.data().email === props.volunteer) {
    //       setVolunteerDoc({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // };
    // getVolunteerDoc();

    const getMission = async () => {
      const data = await getDocs(colRefMissions);
      data.docs.forEach((doc) => {
        if (doc.data().title === props.title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    if (user) getMission();

    // const getUserMissionLink = async () => {
    //   const data = await getDocs(colRefUserMission);
    //   data.docs.forEach((doc) => {
    //     if (
    //       doc.data().userEmail === userDoc.email &&
    //       doc.data().missionId == mission.id
    //     ) {
    //       setUserMissionLink({ ...doc.data(), id: doc.id });
    //       return;
    //     }
    //   });
    // };
    // getUserMissionLink();
  }, []);

  useEffect(() => {
    const getUserMissionLink = async () => {
      const data = await getDocs(colRefUserMission);
      data.docs.forEach((doc) => {
        if (
          doc.data().userEmail === user.email &&
          doc.data().missionId == mission.id
        ) {
          setUserMissionLink({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserMissionLink();
  }, [mission]);

  const checkImageButtonClicked = () => {
    setCheckImage(true);
  };

  const HandleNotAcceptImage = async () => {
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "denied",
    //   statusText: "Chưa đạt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${user.email} | ${props.title} (id: ${props.missionId})`
      ),
      {
        userStatus: "denied",
        userStatusText: "Chưa đạt",
      }
    );

    setStatus("denied");
    setCheckImage(false);
  };

  const HandleAcceptImage = async () => {
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "done",
    //   statusText: "Đã duyệt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${user.email} | ${props.title} (id: ${props.missionId})`
      ),
      {
        userStatus: "done",
        userStatusText: "Đã duyệt",
      }
    );
    setStatus("done");
    let newScore = volunteerDoc.score + props.score;
    await updateDoc(doc(colRefUsers, `${props.volunteer}`), {
      // score: userDoc.score + props.score,
      score: newScore,
    });
    setCheckImage(false);
  };

  const HandleCheckExit = () => {
    setCheckImage(false);
  };

  // if (props.status === "accepted") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Mới</div>
  // }
  // else if (props.status === "pending") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Chưa duyệt</div>
  // }
  // else if (props.status === "denied") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Chưa đạt</div>
  // }
  // else if (props.status === "done") {
  //   statusDisplay = <div className={`mission-item--status_chip mission-item--status_${props.status}`}>Đã duyệt</div>
  // }

  return (
    <>
      {checkImage ? (
        <CheckImage
          HandleNotAcceptImage={HandleNotAcceptImage}
          HandleAcceptImage={HandleAcceptImage}
          HandleConfirmCheckExit={HandleCheckExit}
        />
      ) : null}
      <div className="mission-item">
        {props.userRole === "user" ? (
          <div className="mission-item--mission">
            {props.id + ". " + props.mission}
          </div>
        ) : null}
        {props.userRole === "user" ? (
          <div className="mission-item--location">{props.address}</div>
        ) : null}
        <div className="mission-item--volunteer">{props.userEmail}</div>
        <div className="mission-item--time">{props.acceptedAt}</div>
        <div className="mission-item--time">{props.updatedAt}</div>
        {props.userRole === "user" ? (
          <div className="mission-item--reward">{props.score}</div>
        ) : null}
        <div className="mission-item--status">{statusDisplay}</div>
        <div className="mission-item--check_image">
          <butto
            className="mission-item--check_image_button"
            onClick={checkImageButtonClicked}
          >
            Xem
          </butto>
        </div>
      </div>
>>>>>>> Stashed changes
    </>
  );
};

export default MissionItem;
