import React from "react";
import "./About.css";
import img1 from "./img/environment-volunteer-concept 1.png";
import img2 from "./img/environment-volunteer-teamwork-concept 1.png";
import img3 from "./img/group-volunteers-collecting-garbage 3.png";

const About = () => {
  return (
    <main className="about">
      <div className="text-container">
        <div className="who">
          <div className="headline">Green Env là ai?</div>
          <div className="text">
            Green Env là tổ chức phi lợi nhuận hoạt động tại thành phố Hồ Chí
            Minh, hướng đến giải quyết các vấn đề môi trường cấp bách tại Việt
            Nam. Green Env được thành lập năm 2022 với sứ mệnh khuyến khích,
            thúc đẩy việc giữ gìn và bảo tồn môi trường, truyền thông sáng tạo
            nhằm thay đổi hành vi và truyền cảm hứng để cộng đồng Việt Nam cùng
            hành động.
          </div>
        </div>
      </div>
      <div className="images">
        <img src={img1} alt="person collecting litter" className="img" />
        <img
          src={img2}
          alt="people determined in teamworking"
          className="img"
        />
        <img src={img3} alt="people collecting trash" className="img" />
      </div>
      <div className="text-container">
        <div className="what">
          <div className="headline">Chiến lược của Green Env</div>
          <div className="text">
            Chúng tôi tạo ra các hoạt động chung tay làm sạch môi trường. Lan
            tỏa tinh thần, trách nhiệm và kêu gọi những hành động thiết thực từ
            mỗi cá nhân, gia đình, xã hội và cộng đồng để xây dựng môi trường
            sống của chúng ta xanh, sạch, đẹp, bền vững.
          </div>
        </div>
      </div>
    </main>
  );
};

export default About;
