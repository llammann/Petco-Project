import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import item1 from "./../assets/images/brand_item01.png";
import item2 from "./../assets/images/brand_item02.png";
import item3 from "./../assets/images/brand_item03.png";
import item4 from "./../assets/images/brand_item04.png";
import item5 from "./../assets/images/brand_item05.png";
import item6 from "./../assets/images/brand_item06.png";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./../assets/style/Homeautoplayswiper.scss";

// import required modules
import { Pagination, Navigation, Autoplay } from "swiper/modules";

export default function Homeautoplayswiper() {
  return (
    <>
     <div className="auto">
     <Swiper
        spaceBetween={70}
        centeredSlides={true}
        slidesPerView={5}
        loop={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="container">
          <div className="imgWrapper">
              <img src={item1} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
          <div className="imgWrapper">
              <img src={item2} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
          <div className="imgWrapper">
              <img src={item3} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={item4} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
          <div className="imgWrapper">
              <img src={item5} alt="" />
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
          <div className="imgWrapper">
              <img src={item6} alt="" />
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
     </div>
    </>
  );
}
