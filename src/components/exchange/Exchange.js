import React from "react";
import "./Exchange.css";
import { useState, useEffect } from "react";
import { db, colRefUsers, colRefPresents } from "../../firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";

const Exchange = () => {
  const [presents, setPresents] = useState([]);
  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    const getPresents = async () => {
      const data = await getDocs(colRefPresents);
      setPresents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getPresents();

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
  }, []);


  const handleExchangePresent = async(present, user, id, status) => {
    if (status === "out of stock") {
      alert("Bạn đã đổi quà này trước đây");
      return;
    }

    if (user >= present) {
      alert("Bạn đã đổi quà thành công"); 
      let newScore = user - present;

      await updateDoc(doc(colRefUsers, `${userDoc.email}`), {
        // score: userDoc.score + props.score,
        score: newScore,
      });

      await updateDoc(doc(colRefPresents, `${id}`), {
        status: "out of stock",
      });

      window.location.reload(true);
    }
    else {
      alert("Bạn không đủ điểm để đổi quà"); 
    }
  }
  
  return (
    <div>
      <div className="_263v2">
        <img
          src="https://vio.edu.vn/assets/de4e7150.png"
          width="50"
          height="50"
          alt="giftCategoryIc"
          className="CkcRL"
        />
        <span className="_9MmQs">Quà Chiến Binh</span>
      </div>

      <div className="exchange">
        {presents.map((present) => {
          return (
            <div className="exchange--each-box">
              <div className="test">
                <div className="present--name">{present.name}</div>

                <div>
                  <img
                    src={present.pic}
                    alt="fu"
                    className="exchange--img"
                  ></img>
                </div>

                <button className= {present.status === "in stock" ? "exchange--button--instock" : "exchange--button--outstock"} onClick={() => handleExchangePresent(present.point, userDoc.score, present.id, present.status)}>
                  <img
                    src="https://vio.edu.vn/assets/63cb73d5.png"
                    width="20px"
                  ></img>
                  {present.point}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Exchange;
