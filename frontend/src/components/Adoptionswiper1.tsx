// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./../assets/style/Adoptionswiper1.scss";

// import required modules
import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Adoptionswiper1() {
  return (
    <>
      <div className="adoptswip1">
        <Swiper
          className="mySwip"
          spaceBetween={30}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          modules={[Autoplay, Pagination, Navigation]}
        >
          <SwiperSlide className="first"></SwiperSlide>
          <SwiperSlide className="seconddd"></SwiperSlide>
          <SwiperSlide className="third"></SwiperSlide>
          <SwiperSlide className="fourth"></SwiperSlide>
          <SwiperSlide className="fifth"></SwiperSlide>
        </Swiper>
      </div>
    </>
  );
}
