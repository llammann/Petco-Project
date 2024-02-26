// import React, { useRef, useState } from "react";
// Import Swiper React components
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import page1 from "./../assets/images/slider_bg01.jpg";
// Import Swiper styles
import "swiper/css";
import "swiper/css/scrollbar";

import "./../assets/style/Homeswiper1.scss";

// import required modules
import { Scrollbar } from "swiper/modules";

import paw from "./../assets/images/w_pawprint.png";
import pawty from "./../assets/images/slider_shape01.png";
export default function Homeswiper1() {
  return (
    <>
      <Swiper
        scrollbar={{
          hide: true,
        }}
        modules={[Scrollbar]}
        className="home1"
      >
        <SwiperSlide>
          {" "}
          <div className="page1">
            <div className="container">
              <div className="detail">
                <div className="pawty">
                  <img src={pawty} alt="" />
                </div>
                <h1>
                  Best Friend <span>with</span> Happy Time
                </h1>
                <p>
                  Human Shampoo on Dogs After six days of delirat, the jury
                  found Hernandez guilty of first-degree murder
                </p>

               <Link to="/dogList"> <button>
                  View More <img src={paw} alt="" />
                </button></Link>
              </div>
            </div>
          </div>
        </SwiperSlide>

        <SwiperSlide>
          {" "}
          <div className="page2">
            <div className="container">
              <div className="detail">
                <div className="pawty">
                  <img src={pawty} alt="" />
                </div>
                <h1>
                  Best Friend <span>with</span> Happy Time
                </h1>
                <p>
                  Human Shampoo on Dogs After six days of delirat, the jury
                  found Hernandez guilty of first-degree murder
                </p>

               <Link to="/dogList"> <button>
                  View More <img src={paw} alt="" />
                </button></Link>
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
