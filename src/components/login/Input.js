import React from "react";

const Input = ({inputType, inputPlaceholder, onChange}) => {
  return (
    <div className="login--input_container">
      <input type={inputType} placeholder={inputPlaceholder} required onChange={onChange}/>
    </div>
  );
};

export default Input;
