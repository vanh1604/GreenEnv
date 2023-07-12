import React from "react";
import "./Login.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "../../context/AuthContext";

const Login = () => {
  return (
    <div className="login--container">
      {/* <AuthContextProvider> */}
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      {/* </AuthContextProvider> */}
    </div>
  );
};

export default Login;
