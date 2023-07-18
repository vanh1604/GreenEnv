import React from "react";

const Input = ({inputType, inputPlaceholder, onChange, value}) => {
  return (
    <div className="login--input_container">
      <input type={inputType} placeholder={inputPlaceholder} required onChange={onChange} value={value}/>
    </div>
  );
};

export default Input;
