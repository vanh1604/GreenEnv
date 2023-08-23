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
        <Question
          question={"Sứ mệnh của Green Env là gì?"}
          answer={
            "Sứ mệnh của Green Env là truyền cảm hứng, thúc đẩy và trao quyền cho các cá nhân tham gia vào những phong trào môi trường tại Việt Nam. Từ đó, chúng tôi hy vọng có thể góp phần gìn giữ môi trường của chúng ta."
          }
        />
        <Question
          question={"Green Env hoạt động trên lĩnh vực nào?"}
          answer={
            "Green Env hoạt động trên lĩnh vực Môi trường - nhặt rác, quét dọn làm sạch môi trường, và lĩnh vực Giáo dục - tuyên truyền, gợi cảm hứng cho mỗi người góp phần bảo vệ môi trường."
          }
        />
        <Question
          question={"Green Env là tên viết tắt của những chữ cái nào?"}
          answer={
            "Green Env là viết tắt của Green Environment - Môi trường xanh. Ngoài ra, Env cũng còn là Envision, mang ý nghĩa Hình dung một tương lai sạch và xanh thật tốt đẹp."
          }
        />
        <Question
          question={
            "Làm thế nào để tổ chức doanh nghiệp hợp tác cùng Green Env?"
          }
          answer={
            "Bạn có thể gửi mail cho Green Env dựa vào địa chỉ Email đã được cung cấp ở trên, hoặc liên hệ với chúng tôi qua biểu mẫu ở dưới."
          }
        />
        <Question
          question={"Làm thế nào để bạn có thể tham gia?"}
          answer={`Nếu là một người muốn bảo vệ môi trường, bạn có thể tạo tài khoản và tham gia vào các nhiệm vụ của chúng tôi (Bấm vào "Nhiệm vụ" để biết rõ hơn về chi tiết các nhiệm vụ). Nếu là một doanh nghiệp hoặc tổ chức, bạn có thể yêu cầu hợp tác với chúng tôi qua Email hoặc biểu mẫu bên dưới.`}
        />
        <Question
          question={"Tại sao Green Env cần sự đóng góp từ bạn?"}
          answer={
            "Sứ mệnh của Green Env là bảo vệ môi trường và truyền cảm hứng bảo vệ môi trường đến với thật nhiều người. Vì thế, sự tham gia của bạn có ý nghĩa rất lớn đối với chúng tôi. Dù cho đó là quyên góp tiền, tham gia nhiệm vụ, hay giới thiệu website này tới bạn bè, thì mọi sự đóng góp của bạn đều được chúng tôi vô cùng trân quý."
          }
        />
        <Question
          question={"Tiền đóng góp sẽ được Green Env sử dụng thế nào?"}
          answer={
            "Green Env sẽ dùng tiền quyên góp của các bạn để bảo trì web hoặc mua thêm các phần thưởng cho tình nguyện viên tham gia nhiệm vụ, tạo niềm vui để các bạn tích cực tham gia."
          }
        />
        <Question
          question={"Tôi có thể đóng góp cho Env bằng cách nào?"}
          answer={
            "Các bạn có thể tham gia nhiệm vụ với tư cách tình nguyện viên của chúng tôi. Bạn cũng có thể quyên góp từ thiện cho chúng tôi và nhận được quyền truy cập những thông tin mới nhất của dự án."
          }
        />
      </div>
    </div>
  );
};

export default CommonQuestions;
