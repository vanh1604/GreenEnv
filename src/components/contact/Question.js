import React from 'react';
import plus from "./img/Group 24.svg";
import "./Question.css";

const Question = ({question}) => {
  return (
    <div className='question'>
      <img src={plus} alt="" className="plus" />
      <div className="questionText">{question}</div>
    </div>
  );
};

export default Question;