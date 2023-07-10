import React from 'react';
import "./css/Main.css";
import logo from "./css/pictures/logo.png";
import gift from "./css/pictures/gifts.png";
import volunteer2 from "./css/pictures/volunteer2.png"
import twitter from "./css/pictures/twitter.svg"
import insta from "./css/pictures/instagram.svg"
import dribble from "./css/pictures/dribbble.svg"

const Main = () => {
    return (
        <div className='main-container'>
            <header>
                <div class = "logo_text">
                    <div class = "logo_header">
                        <img src = {logo} alt = "fck"></img>
                    </div>
                    <div class = "header_text">Giới thiệu</div>
                    <div class = "header_text">Nhiệm vụ</div>
                    <div class = "header_text">Hành động</div>
                    <div class = "header_text">Liên hệ</div>
                </div>

                <div class = "sign_in_text">
                    <button class = "sign_in">Đăng nhập</button>
                </div>
            </header>

            <body>
                <div class = "intro">
                    <div class = "assist">
                        <div class = "chungtoi">
                            Chúng tôi là Green Env
                        </div>

                        <div class = "mission">
                            Nhiệm vụ của chúng tôi
                        </div>

                        <div class = "la">
                            là truyền cảm hứng, thúc đẩy và trao quyền cho các cá nhân tham gia vào những phong trào môi trường tại Việt Nam.
                        </div>
                    </div>
                    

                    <button class = "thamgia">Tham gia cùng chúng tôi</button>
                </div>
                
                
                <div class = "challenge">
                    <h3 class = "challenge_header">
                        Thách thức
                    </h3>
                    <div class = "challenge_content">
                        Trong bối cảnh đô thị hóa và tình trạng bùng nổ dân số gia tăng thì rác thải đã trở thành một vấn đề môi trường ngày càng nghiêm trọng. Rác thải gây ra rất nhiều vấn đề, như: mùi khó chịu, vi trùng gây bệnh, điều kiện sinh hoạt mất vệ sinh. Rác thải không được thu gom, tồn đọng, lâu ngày sẽ sinh ra các tác nhân tác động đến sức khoẻ con người.
                    </div>
                </div>

                <div class = "dump">
                    <div class = "problem">
                        <h1 class = "problem1">Vấn nạn ô nhiễm môi trường</h1>
                        <div class = "problem2">Cần hành động ngay vì một Việt Nam xanh và sạch</div>
                    </div>
                    
                    <div class = "pics">
                        <div class = "second_pic"></div>
                        <div class = "third_pic"></div>
                    </div>
                </div>

                <div class = "doiqua">
                    <div class = "gift">
                        <div class = "left_text">
                            <div class = "upper">
                                <h3 class = "tichdiem">Tích điểm đổi quà</h3>
                                <div class = "banseduoc">
                                Bạn sẽ được thưởng điểm tương ứng với mỗi nhiệm vụ thành công. Quy đổi điểm thưởng để đổi lấy các phần quà hấp dẫn.
                                </div>
                            </div>

                            <button class = "dennhiemvu">Đến nhiệm vụ</button>
                        </div>

                        <div class = "right_text">
                            <img src = {gift} alt = "fck"></img>
                        </div>
                    </div>

                </div>

                <div class = "tiepcan">
                    
                        <h3 class = "cachchungta">
                            Cách chúng ta tiếp cận
                        </h3>
                        <div class = "chungtoi">
                        Chúng tôi tạo cơ hội cho các cá nhân và cộng đồng tham gia tích cực vào việc xử lý môi trường và tạo giá trị riêng cho bản thân.
                        </div>
                        
                        <img src = {volunteer2} alt='fuck' class = "volunteer2"></img>

                        <h3 class = "hayhanhdong">
                        “HÃY HÀNH ĐỘNG cùng nhau, chúng ta có thể cứu môi trường”
                        </h3>

                <div class = "last">
                    <div class = "greenenv">
                        (c) Green Env Viet Nam
                    </div>

                    <div class = "middle">
                        <div class = "mail">
                            Greenenv@gmail.com
                        </div>

                        <div class = "number">
                            (+84)  912 345 678
                        </div>
                    </div>

                    <div class = "icon">
                        <img src = {twitter} alt = "fuck"></img>
                        <img src = {insta} alt = "fuck"></img>
                        <img src = {dribble} alt = "fuck"></img>
                    </div>
                    </div>
                </div>
                
            </body>
        </div>
    );
};

export default Main;