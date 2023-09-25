import React, { useState, useEffect } from "react";
import "./MissionItem.css";
import { updateDoc, doc, getDocs } from "firebase/firestore";
import { colRefUserMission } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { colRefMissions, colRefUsers } from "../../firebase";
import CheckImage from "../missions/confirmation-boxes/check-image/CheckImage";

const MissionItem = (props) => {
  const [statusDisplay, setStatusDisplay] = useState(
    <div
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
  }, [mission]);

  useEffect(() => {
    const getUserMissionLink = async () => {
      const data = await getDocs(colRefUserMission);
      data.docs.forEach((doc) => {
        if (
          // doc.data().userEmail === props.userEmail &&
          doc.data().userEmail === user.email &&
          doc.data().missionId == mission.id
        ) {
          setUserMissionLink({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserMissionLink();
  }, [mission, userMissionLink]);

  useEffect(() => {
    const getVolunteerDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        if (doc.data().email === props.userEmail) {
          // console.log("reached");
          setVolunteerDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getVolunteerDoc();
  }, [volunteerDoc]);

  const checkImageButtonClicked = () => {
    setCheckImage(true);
    // console.log(props.userEmail, volunteerDoc.email);
  };

  const HandleNotAcceptImage = async () => {
    // await updateDoc(doc(colRefMissions, props.id), {
    //   status: "denied",
    //   statusText: "Chưa đạt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${props.userEmail} | ${mission.title} (id: ${mission.id})`
      ),
      {
        userStatus: "denied",
        userStatusText: "Chưa đạt",
      }
    );

    setStatus("denied");

    setStatusDisplay(
      <div className={`mission-item--status_chip mission-item--status_denied`}>
        Chưa đạt
      </div>
    );
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
        `${props.userEmail} | ${mission.title} (id: ${mission.id})`
      ),
      {
        userStatus: "done",
        userStatusText: "Đã duyệt",
      }
    );
    setStatus("done");
    setStatusDisplay(
      <div className={`mission-item--status_chip mission-item--status_done`}>
        Đã duyệt
      </div>
    );
    let newScore = volunteerDoc.score + props.score;
    await updateDoc(doc(colRefUsers, `${props.userEmail}`), {
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
          prev="MissionItem"
          HandleNotAcceptImage={HandleNotAcceptImage}
          HandleAcceptImage={HandleAcceptImage}
          HandleConfirmCheckExit={HandleCheckExit}
          id={mission.id}
          email={props.userEmail}
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
        {props.userRole === "admin" ? (
          <div className="mission-item--volunteer">{props.userEmail}</div>
        ) : null}
        {props.userRole === "admin" ? (
          <div className="mission-item--time">{props.acceptedAt}</div>
        ) : null}
        {props.userRole === "admin" ? (
          <div className="mission-item--time">{props.updatedAt}</div>
        ) : null}
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
    </>
  );
};

export default MissionItem;
