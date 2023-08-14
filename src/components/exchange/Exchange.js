import React from 'react';
import "./Exchange.css";
import { useState, useEffect } from "react";
import { db } from "../../firebase";
import { collection, getDocs } from "firebase/firestore";
import Header from '../common-components/Header';
import Footer from '../common-components/Footer';

const Exchange = () => {

    const [presents, setPresents] = useState([]);
    const usersCollectionRef = collection(db, "presents");
    useEffect(() => {
        const getPresents = async () => {
            const data = await getDocs(usersCollectionRef);
            setPresents(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        };

        getPresents();
    }, []);

    return (        
        <div>

            <div className="_263v2">
                <img src="https://vio.edu.vn/assets/de4e7150.png" width="50" height="50" alt="giftCategoryIc" className="CkcRL"/>
                <span className="_9MmQs">Quà Chiến Binh</span>
            </div>

            <div className = "exchange">

                {presents.map( (present) => {
                    return (
                        <div className = "exchange--each-box">
                            <div className = "test">

                                <div className = "present--name">{present.name}</div>

                                <div>
                                    <img src = {present.pic} alt = "fu" className = "exchange--img"></img>
                                </div>
                                
                                <button className = "exchange--button">
                                    <img src = "https://vio.edu.vn/assets/63cb73d5.png" width = "20px"></img>{present.point}
                                </button>

                            </div>
                        </div>
                    )

                })}
            </div>
        </div>
    );
};

export default Exchange;