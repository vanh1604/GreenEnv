import React from "react";
import "./Login.css";
import SignIn from "./SignIn/SignIn";
import SignUp from "./SignUp/SignUp";
import { BrowserRouter, Routes, Route } from "react-router-dom";

const Login = () => {
  return (
    <div className="login--container">
      <BrowserRouter>
        <Routes>
          <Route path="/">
            <Route exact path="signin" element={<SignIn />} />
            <Route exact path="signup" element={<SignUp />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default Login;
