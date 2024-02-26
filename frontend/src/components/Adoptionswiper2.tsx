import { FaRegCalendarAlt } from "react-icons/fa";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";

import "./../assets/style/Adoptionswiper2.scss";

// import required modules
import { Navigation } from "swiper/modules";

import { useEffect } from "react";
import type { AppDispatch, RootState } from "./../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllPets } from "./../redux/slices/PetSlice";

export default function Adoptionswiper2() {
  const allDogs = useSelector((state: RootState) => state.pet.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPets());
  }, []);

  console.log("GETdoglist", allDogs);
  return (
    <>
      <Swiper
        navigation={true}
        modules={[Navigation]}
        slidesPerView={4}
        // spaceBetween={70}
        pagination={{
          dynamicBullets: true,
        }}
        className="adoptswip2"
        breakpoints={{
          1: {
            slidesPerView: 1,
            spaceBetween: 20,
          },
          426: {
            slidesPerView: 2,
            spaceBetween: 40,
          },
          1200: {
            slidesPerView: 4,
            spaceBetween: 50,
          },
        }}
      >
        {allDogs &&
          allDogs.map((dog: any) => {
            return (
              <SwiperSlide>
                <Link to={"/dogDetail/" + dog._id}>
                  <div className="dog">
                    <div className="imgWrapper">
                      <img src={dog.img} alt="" />
                      <div className="price">
                        {dog.price != "Free" ? (
                          <span className="numb">{dog.price}</span>
                        ) : (
                          <span>Free</span>
                        )}
                      </div>
                    </div>

                    <div className="detail">
                      <div className="birth">
                        <FaRegCalendarAlt className="calendar" />
                        <p>
                          Birth : <span>{dog.age}</span>
                        </p>
                      </div>

                      <h1>{dog.breed}</h1>

                      <p className="info">{dog.bio}</p>

                      <span className="readMore">
                        Read More
                        <img
                          src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/pawprint.png"
                          alt=""
                        />
                      </span>
                    </div>
                  </div>
                </Link>
              </SwiperSlide>
            );
          })}
      </Swiper>
    </>
  );
}
