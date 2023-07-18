import React from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth } from "../../../firebase";
import { db } from "../../../firebase";
// import { doc, addDoc } from "firebase/firestore";

const SignUpInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [error, setError] = useState("");

  const { createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (repassword === password) {
      setError("");
      try {
        await createUser(email, password);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        // await addDoc(doc(db, "users"), {
        //   name: name,
        //   email: email,
        //   password: password
        // })
        updateProfile(auth.currentUser, {
          displayName: name, //, phoneNumber: "0910"
        })
          .then(() => {
            // Profile updated!
            // ...
          })
          .catch((error) => {
            console.log(error.message);
          });
      } catch (e) {
        setError(e.message);
        console.log(e.message);
      }
      navigate("/about");
    } else {
      alert("Password nhập lại không đúng.");
    }
  };

  return (
    <form className="login--inputs" onSubmit={handleSignupSubmit}>
      <Input
        inputType={"text"}
        inputPlaceholder={"Tên"}
        onChange={(e) => setName(e.target.value)}
      />
      <Input
        inputType={"email"}
        inputPlaceholder={"Email"}
        onChange={(e) => setEmail(e.target.value)}
      />
      <Input
        inputType={"password"}
        inputPlaceholder={"Mật khẩu"}
        onChange={(e) => setPassword(e.target.value)}
      />
      <Input
        inputType={"password"}
        inputPlaceholder={"Nhập lại mật khẩu"}
        onChange={(e) => setRepassword(e.target.value)}
      />
      <LoginButton LoginButtonText={"Tiếp tục"} />
    </form>
  );
};

export default SignUpInputs;
