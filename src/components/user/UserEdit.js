import React from "react";
import avatar from "../common-components/img/Avatar.png";
import "./UserEdit.css";
import { useState, useEffect } from "react";
import { updateDoc, doc, getDocs } from "firebase/firestore";
import { auth, colRefUsers } from "../../firebase";
import { UserAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router";
import { updateProfile } from "firebase/auth";

const UserEdit = () => {
  const navigate = useNavigate();
  const { user } = UserAuth();

  const [userDoc, setUserDoc] = useState({});

  useEffect(() => {
    const getUserDoc = async () => {
      const data = await getDocs(colRefUsers);
      data.docs.forEach((doc) => {
        // console.log(doc.data());
        if (doc.data().email === localStorage.email) {
          setUserDoc({ ...doc.data(), id: doc.id });
          return;
        }
      });
    };
    getUserDoc();
  }, []);

  const [username, setUsername] = useState(userDoc.username);
  const [name, setName] = useState(userDoc.name);
  const [phoneNumber, setPhoneNumber] = useState(userDoc.phoneNumber);

  const handleUserEdit = (e) => {
    e.preventDefault();

    const saveInfo = async () => {
      updateProfile(auth.currentUser, {
        displayName: username,
      })
        .then(() => {
          // alert("Bạn đã cập nhật thành công!");
        })
        .catch((error) => {
          console.log(error.message);
        });

      const check = () => {
        if (!username) setUsername("");
        if (!name) setName("");
        if (!phoneNumber) setPhoneNumber("");
      };
      check();

      if (username) {
        await updateDoc(doc(colRefUsers, `${user.email}`), {
          username: username,
        });
      }
      if (name) {
        await updateDoc(doc(colRefUsers, `${user.email}`), {
          name: name,
        });
      }
      if (phoneNumber) {
        await updateDoc(doc(colRefUsers, `${user.email}`), {
          phoneNumber: phoneNumber,
        });
      }
      // console.log(name, " ", username, " ", phoneNumber);
    };
    saveInfo();
    navigate("/user");
    // window.location.reload();
  };

  return (
    <form className="user-edit" onSubmit={handleUserEdit}>
      <div className="user-edit--account_line">
        <div className="user-edit--account_container">
          <img src={avatar} alt="" className="user-edit--avatar" />
          <input
            className="user-edit--input"
            id="user-edit--account"
            placeholder="Username..."
            defaultValue={userDoc.username}
            onChange={(e) => {
              setUsername(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="user-edit--info">
        <div className="user-edit--info_line1">
          <div className="user-edit--name">
            <div className="user-edit--label user-edit--name_label">
              Họ và tên
            </div>
            <input
              type="text"
              className="user-edit--input marginTop12"
              placeholder="Họ và tên..."
              defaultValue={userDoc.name}
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          </div>
          <div className="user-edit--phone">
            <div className="user-edit--label user-edit--phone_label">
              Số điện thoại
            </div>
            <input
              id="user-edit--phone_number"
              className="user-edit--input marginTop12"
              defaultValue={userDoc.phoneNumber}
              placeholder="Số điện thoại..."
              onChange={(e) => {
                setPhoneNumber(e.target.value);
              }}
            />
          </div>
        </div>
        <div className="user-edit--info_line2">
          <button className="user-edit--update_btn">Cập nhật</button>
        </div>
      </div>
    </form>
  );
};

export default UserEdit;
