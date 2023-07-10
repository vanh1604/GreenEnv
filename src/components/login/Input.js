import React from "react";

const Input = ({inputType, inputPlaceholder}) => {
  return (
    <div className="login--input_container">
      <input type={inputType} placeholder={inputPlaceholder} required/>
    </div>
  );
};

export default Input;
