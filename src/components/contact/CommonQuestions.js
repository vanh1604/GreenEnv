import React from "react";
import "./CommonQuestions.css";
import Question from "./Question";

const CommonQuestions = () => {
  return (
    <div className="commonQuestions">
      <div className="cq--headline">
        Trước khi gửi tin nhắn cho chúng tôi đây là những điều bạn nên biết
      </div>
      <div className="cq--questions_container">
        <Question question={"Sứ mệnh của Green Env là gì?"}/>
        <Question question={"Green Env hoạt động trên lĩnh vực nào?"}/>
        <Question question={"Green Env là tên viết tắt của những chữ cài nào?"}/>
        <Question question={"Làm thế nào để tổ chức doanh nghiệp hợp tác cùng Green Env?"}/>
        <Question question={"Làm thế nào để bạn có thể tham gia?"}/>
        <Question question={"Tại sao Green Env cần sự đóng góp từ bạn?"}/>
        <Question question={"Tiền đóng góp sẽ được Green Env sử dụng thế nào?"}/>
        <Question question={"Tôi có thể đóng góp cho Env bằng cách nào?"}/>
      </div>
    </div>
  );
};

export default CommonQuestions;
