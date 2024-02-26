import { Link } from "react-router-dom";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/pagination";

import "./../assets/style/HomeSwiper2.scss";

// import required modules
import { FreeMode, Pagination } from "swiper/modules";

export default function Homeswiper2() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={3}
        freeMode={true}
        pagination={{
          clickable: true,
        }}
        modules={[FreeMode, Pagination]}
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
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={{ xs: 2, md: 3 }}
            columns={{ xs: 4, sm: 8, md: 12 }}
          >
            <Grid item xs={2} sm={4} md={4}>
              <SwiperSlide className="first">
                <Link to="/breeder">
                  {" "}
                  <span>Golden Retriever</span>
                </Link>
              </SwiperSlide>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <SwiperSlide className="secondd">
                <Link to="/breeder">
                  <span>German Sharped</span>
                </Link>
              </SwiperSlide>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <SwiperSlide className="third">
                <Link to="/breeder">
                  {" "}
                  <span>Bernes Mountain</span>
                </Link>
              </SwiperSlide>
            </Grid>
            <Grid item xs={2} sm={4} md={4}>
              <SwiperSlide className="fourth">
                <Link to="/breeder">
                  {" "}
                  <span>Siberian Husky</span>
                </Link>
              </SwiperSlide>
            </Grid>
          </Grid>
        </Box>
      </Swiper>
    </>
  );
}
