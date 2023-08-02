import React from "react";
import "../MissionConfirmCancel.css";
import { useNavigate } from "react-router";
import { colRefMissions } from "../../../../firebase";
import { getDocs, updateDoc, doc } from "firebase/firestore";
import { useState } from "react";
import { storage } from "../../../../firebase";
import { ref, uploadBytes } from "firebase/storage" 
import { v4 } from "uuid"

const MissionUpload = ({
  title,
  point,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotUploadImage,
}) => {

  const [imageUpload, setImageUpload] = useState(null); 

  const HandleUploadImage = async () => {
    if (!imageUpload) return; 

    const imageRef = ref(storage, `images/ ${imageUpload.name}` ); 
    uploadBytes(imageRef, imageUpload).then( () => {
      alert("Đã tải ảnh lên");
    });

    await updateDoc(doc(colRefMissions, id), {
      status: "pending",
    });
  }

  const dosomething = () => {
    console.log(123);
  }

  return (
    
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Tải ảnh lên</div>
        <div className="mission-confirm--question">
          Tải ảnh bạn đã hoàn thành nhiệm vụ
        </div>
        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn1_cancel"
            onClick={HandleNotUploadImage}
          >
            Hủy
          </button>

          <input
            
            type = "file"
            onChange = {(e) => setImageUpload(e.target.files[0])}
          >
          </input>

          <button onClick = {HandleUploadImage} className="mission-confirm--button mission-confirm--btn2_cancel">
            Upload image
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionUpload;
