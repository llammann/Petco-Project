// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
// import { BiSolidQuoteSingleLeft } from "react-icons/bi";
import avatar from "./../assets/images/testi_avatar01.png";
import { ImQuotesLeft } from "react-icons/im";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../assets/style/Homecustomerswiper.scss";

// import required modules
import { Pagination } from "swiper/modules";

export default function Homecustomerswiper() {
  return (
    <>
     <div className="custom">
     <Swiper
        slidesPerView={2}
        spaceBetween={40}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper"
        breakpoints={{
          1: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          768: {
            slidesPerView: 1,
            spaceBetween: 40,
          },
          1024: {
            slidesPerView: 2,
            spaceBetween: 50,
          },
        }}
      >
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="container">
            <div className="imgWrapper">
              <img src={avatar} alt="" />
            </div>

            <div className="details">
              <p className="comment">
                "The best overall dog DNA test is Embark Breed & Health Kit
                (view at Chewy), which provides you with a breed brwn and
                information Most dogs"
              </p>
              <div className="who">
                <div className="name">
                  <span>Alessia Cara</span>
                  <p>Google Ceo</p>
                </div>

                <ImQuotesLeft className="quotes" />
              </div>
            </div>
          </div>
        </SwiperSlide>
      </Swiper>
     </div>
    </>
  );
}
