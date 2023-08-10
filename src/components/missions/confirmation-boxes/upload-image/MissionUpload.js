import React from "react";
import "../MissionConfirmCancel.css";
import { useNavigate } from "react-router";
import { colRefMissions } from "../../../../firebase";
import { getDocs, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes } from "firebase/storage";
// import { v4 } from "uuid"
import xmark from "./img/circle-xmark-regular.svg";

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
  HandleUploadImageStatusChange
}) => {
  const [imageUpload, setImageUpload] = useState(null);

  const HandleUploadImage = async () => {
    if (!imageUpload) return;

    const imageRef = ref(storage, `images/${id}/pic.jpg`);
    uploadBytes(imageRef, imageUpload).then(() => {
      alert("Đã tải ảnh lên");
    });

    await updateDoc(doc(colRefMissions, id), {
      status: "pending",
      statusText: "Chờ duyệt",
    });
    HandleUploadImageStatusChange();
    HandleConfirmUploadExit();
  };

  return (
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif mission-confirm--notif_upload">
        <div
          className="checkImg--xmark_container"
          onClick={HandleConfirmUploadExit}
        >
          <img src={xmark} alt="exit" />
        </div>
        <div className="mission-upload--headline">Tải ảnh lên</div>
        <div className="mission-confirm--buttons">

          <div className = "mission-upload--choose-file">
           
            <input
              type="file"
              onChange={(e) => setImageUpload(e.target.files[0])}
              className="test"
            />
            
            <div className = "mission-upload--buttons">
              {/* <button
                  className="mission-confirm--button mission-confirm--btn1_cancel"
                  onClick={HandleNotUploadImage}
              >
                  Hủy
              </button> */}

              <button
                  onClick={HandleUploadImage}
                  className="mission-confirm--button mission-confirm--btn2_cancel"
                  style={{margin: "0 auto"}}
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
