import React from "react";
import { useEffect, useState } from "react";
import "../MissionConfirmCancel.css";
import { storage } from "../../../../firebase"
import { listAll, ref, getDownloadURL} from "firebase/storage"

const MissionAccept = ({
  title,
  score,
  address,
  number,
  content,
  duration,
  status,
  id,
  HandleNotAcceptImage,
  HandleAcceptImage,
}) => {

    const [imageList, setImagelist] = useState([]); 
    const imageListRef = ref(storage, `images/${id}/`);

    useEffect(() => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImagelist((prev) => [...prev, url]); 
                })
            })
        }); 
    }, []);

    const something = () => {
        listAll(imageListRef).then((response) => {
            response.items.forEach((item) => {
                getDownloadURL(item).then((url) => {
                    setImagelist((prev) => [...prev, url]); 
                })
            })
        }); 
    }

  return (
    <div className="mision-confirm">
      <div className="mission-confirm--bg"></div>
      <div className="mission-confirm--notif">
        <div className="mission-confirm--headline">Ảnh người dùng</div>
        
        {imageList.map((url) => {
            return <img src = {url} class = "CheckImage--img"></img>
        })}

        <div className="mission-confirm--buttons">
          <button
            className="mission-confirm--button mission-confirm--btn1_accept"
            onClick={HandleNotAcceptImage}
          >
            Không duyệt
          </button>
          <button
            className="mission-confirm--button mission-confirm--btn2_accept"
            onClick={HandleAcceptImage}
          >
            Duyệt
          </button>
        </div>
      </div>
    </div>
  );
};

export default MissionAccept;
