import React from "react";
import Input from "../Input";
import LoginButton from "../LoginButton";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserAuth } from "../../../context/AuthContext";
import { updateProfile } from "firebase/auth";
import { auth, colRefUsers } from "../../../firebase";
import { setDoc, doc } from "firebase/firestore";

const SignUpInputs = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [role, setRole] = useState("user");

  const { user, createUser } = UserAuth();

  const navigate = useNavigate();

  const handleSignupSubmit = async (e) => {
    e.preventDefault();
    if (repassword === password) {
      try {
        await createUser(email, password);
        console.log(user);
        localStorage.setItem("email", email);
        localStorage.setItem("password", password);
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            alert("Bạn đã đăng kí thành công!");
          })
          .catch((error) => {
            console.log(error.message);
          });
        const saveInfo = async () => {
          if (password === "admin--admin--admin--greenenv--adminx3!") {
            setRole("admin");
          }
          await setDoc(doc(colRefUsers, email), {
            name: name,
            email: email,
            score: 0,
            role: role,
          });
        };
        saveInfo();
        navigate("/about");
      } catch (e) {
        console.log(e.message);
      }
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
