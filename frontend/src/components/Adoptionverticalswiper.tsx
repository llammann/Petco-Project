// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../assets/style/Adoptionverticalswiper.scss";

// import required modules
import { Pagination, Autoplay } from "swiper/modules";

export default function Adoptionverticalswiper() {
  return (
    <>
      <div className="vertical">
        <Swiper
          direction={"vertical"}
          pagination={{
            clickable: true,
          }}
          loop={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Pagination, Autoplay]}
          className="verticalswip"
        >
          <SwiperSlide className="first"></SwiperSlide>
          <SwiperSlide className="second"></SwiperSlide>
          <SwiperSlide className="third"></SwiperSlide>
          <SwiperSlide className="fourth"></SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
