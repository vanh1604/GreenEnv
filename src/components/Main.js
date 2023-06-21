import React from 'react';
import "./css/Main.css";
import logo from "./pictures/logo.png";

const Main = () => {
    return (
        <div class = "test">
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
                
                
            </body>
        </div>
    );
};

export default Main;