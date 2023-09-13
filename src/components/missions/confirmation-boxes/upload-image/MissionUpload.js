import React from "react";
import "../MissionConfirmCancel.css";
import { useNavigate } from "react-router";
import {
  colRefUsers,
  colRefMissions,
  colRefUserMission,
} from "../../../../firebase";
import { getDocs, updateDoc, doc } from "firebase/firestore";
import { useState, useEffect } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid"
import xmark from "./img/circle-xmark-regular.svg";
import DarkBackground from "../../../common-components/DarkBackground";

const MissionUpload = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  //HandleNotUploadImage,
  HandleConfirmUploadExit,
  HandleUploadImageStatusChange,
}) => {
  const [imageUpload, setImageUpload] = useState(null);
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
      const data = await getDocs(colRefMissions);
      data.docs.forEach((doc) => {
        if (doc.data().title === title) {
          //does not work if compare id
          setMission({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getMission();
  }, []);

  const HandleUploadImage = async () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${id}/${localStorage.email}`);
    uploadBytes(imageRef, imageUpload).then(() => {
      // alert("Đã tải ảnh lên");
    });

    // await updateDoc(doc(colRefMissions, id), {
    //   status: "pending",
    //   statusText: "Chưa duyệt",
    // });
    await updateDoc(
      doc(
        colRefUserMission,
        `${userDoc.email} | ${mission.title} (id: ${mission.id})`
      ),
      {
        userStatus: "pending",
        userStatusText: "Chưa duyệt",
      }
    );
    HandleUploadImageStatusChange();
    HandleConfirmUploadExit();
  };

  return (
    <div className="mission-confirm">
      {/* <div className="mission-confirm--bg"></div> */}
      <DarkBackground />
      <div className="mission-confirm--notif mission-confirm--notif_upload">
        <div
          className="checkImg--xmark_container"
          onClick={HandleConfirmUploadExit}
        >
          <img src={xmark} alt="exit" />
        </div>
        <div className="mission-upload--headline">Tải ảnh lên</div>
        <div className="mission-confirm--buttons">
          <div className="mission-upload--choose-file">
            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="test"
            />

            <div className="mission-upload--buttons">
              {/* <button
                  className="mission-confirm--button mission-confirm--btn1_cancel"
                  onClick={HandleNotUploadImage}
              >
                  Hủy
              </button> */}

              <button
                onClick={HandleUploadImage}
                className="mission-confirm--button mission-confirm--btn2_cancel"
                style={{ margin: "0 auto" }}
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MissionUpload;
