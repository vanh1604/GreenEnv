import React from "react";
import "./css/Main.css";
import logo from "./css/pictures/logo.png";
import gift from "./css/pictures/gifts.png";
import volunteer2 from "./css/pictures/volunteer2.png";
import twitter from "./css/pictures/twitter.svg";
import insta from "./css/pictures/instagram.svg";
import dribble from "./css/pictures/dribbble.svg";
import { Link } from "react-router-dom";

const Main = () => {
  return (
    <div className="main-container">
      <header>
        <div className="logo_text">
          <div className="logo_header">
            <img src={logo} alt="fck"></img>
          </div>
          <div className="header_text">Giới thiệu</div>
          <div className="header_text">Nhiệm vụ</div>
          <div className="header_text">Hành động</div>
          <div className="header_text">Liên hệ</div>
        </div>

        <div className="sign_in_text">
          <button className="sign_in">
            <Link to={"signin"}>Đăng nhập</Link>
          </button>
        </div>
      </header>

      <main>
        {/* <body> */}
        <div className="intro">
          <div className="assist">
            <div className="chungtoi">Chúng tôi là Green Env</div>

            <div className="mission">Nhiệm vụ của chúng tôi</div>

            <div className="la">
              là truyền cảm hứng, thúc đẩy và trao quyền cho các cá nhân tham
              gia vào những phong trào môi trường tại Việt Nam.
            </div>
          </div>

          <button className="thamgia">Tham gia cùng chúng tôi</button>
        </div>

        <div className="challenge">
          <h3 className="challenge_header">Thách thức</h3>
          <div className="challenge_content">
            Trong bối cảnh đô thị hóa và tình trạng bùng nổ dân số gia tăng thì
            rác thải đã trở thành một vấn đề môi trường ngày càng nghiêm trọng.
            Rác thải gây ra rất nhiều vấn đề, như: mùi khó chịu, vi trùng gây
            bệnh, điều kiện sinh hoạt mất vệ sinh. Rác thải không được thu gom,
            tồn đọng, lâu ngày sẽ sinh ra các tác nhân tác động đến sức khoẻ con
            người.
          </div>
        </div>

        <div className="dump">
          <div className="problem">
            <h1 className="problem1">Vấn nạn ô nhiễm môi trường</h1>
            <div className="problem2">
              Cần hành động ngay vì một Việt Nam xanh và sạch
            </div>
          </div>

          <div className="pics">
            <div className="second_pic"></div>
            <div className="third_pic"></div>
          </div>
        </div>

        <div className="doiqua">
          <div className="gift">
            <div className="left_text">
              <div className="upper">
                <h3 className="tichdiem">Tích điểm đổi quà</h3>
                <div className="banseduoc">
                  Bạn sẽ được thưởng điểm tương ứng với mỗi nhiệm vụ thành công.
                  Quy đổi điểm thưởng để đổi lấy các phần quà hấp dẫn.
                </div>
              </div>

              <button className="dennhiemvu">Đến nhiệm vụ</button>
            </div>

            <div className="right_text">
              <img src={gift} alt="fck"></img>
            </div>
          </div>
        </div>

        <div className="tiepcan">
          <h3 className="cachchungta">Cách chúng ta tiếp cận</h3>
          <div className="chungtoi">
            Chúng tôi tạo cơ hội cho các cá nhân và cộng đồng tham gia tích cực
            vào việc xử lý môi trường và tạo giá trị riêng cho bản thân.
          </div>

          <img src={volunteer2} alt="fuck" className="volunteer2"></img>

          <h3 className="hayhanhdong">
            “HÃY HÀNH ĐỘNG cùng nhau, chúng ta có thể cứu môi trường”
          </h3>

          <div className="last">
            <div className="greenenv">(c) Green Env Viet Nam</div>

            <div className="middle">
              <div className="mail">Greenenv@gmail.com</div>

              <div className="number">(+84) 912 345 678</div>
            </div>

            <div className="icon">
              <img src={twitter} alt="fuck"></img>
              <img src={insta} alt="fuck"></img>
              <img src={dribble} alt="fuck"></img>
            </div>
          </div>
        </div>

        {/* </body> */}
      </main>
    </div>
  );
};

export default Main;
