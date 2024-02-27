type Props = {};
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import "./../../assets/style//DogList.scss";
import { FaChevronUp } from "react-icons/fa6";
import { FaRegCalendarAlt } from "react-icons/fa";
import { RiSettings5Fill } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { TiStarburst } from "react-icons/ti";
import paw from "./../../assets/images/w_pawprint.png";
import orangePaw from "./../../assets/images/pawprint.png";
import left from "./../../assets/images/breed_services_shape01.png";
import right from "./../../assets/images/breed_services_shape02.png";
import tv from "./../../assets/images/faq_tv.png";
import family from "./../../assets/images/faq_img.png";
import doggo from "./../../assets/images/faq_shape.png";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";

import Modal from "./../../components/TvModal";
import Homeaccardion from "../../components/Homeaccordion";
import Homeswiper2 from "../../components/Homeswiper2";

import type { AppDispatch, RootState } from "./../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { getAllPets, postEmail } from "./../../redux/slices/PetSlice";
import { dogInt } from "../home";
function DogList({}: Props) {

  const [emailValue, setemailValue] = useState("");

  
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const allDogs = useSelector((state: RootState) => state.pet.data);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPets());
  }, []);

  console.log("GETdoglist", allDogs);

  const [width, setWidth] = useState("");
  const scrollRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const currentScrollPos = window.pageYOffset;
      if (currentScrollPos > 100) {
        setWidth("block");
      } else {
        setWidth("none");
      }
    }

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="head">
        <div className="wrapper">
          <h1>Dog List</h1>
          <p>
            <span>Home</span> Dog List
          </p>
        </div>
      </section>

      <section className="meetAnimals">
        <div className="header">
          <div className="imgWrapper">
            <img src={left} alt="" />
          </div>
          <div className="head">
            <div className="paw">
              <img src={orangePaw} alt="" />
            </div>

            <span>Meet the animals</span>
            <h1>Puppies Waiting for Adoption</h1>
            <p>
              The best overall dog DNA test is Embark Breed & Health Kit (view
              at Chewy), which provides you with a breed brwn and information
              Most dogs
            </p>
          </div>
          <div className="imgWrapper">
            <img src={right} alt="" />
          </div>
        </div>

        <div className="animals">
          <div className="container">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
                className="grid"
              >
                {allDogs &&
                  allDogs.map((dog: any) => {
                    return (
                      <Grid item xs={2} sm={4} md={4}>
                        <div className="card">
                          <div className="imgWrapper">
                            <img src={dog.img} alt="" />
                            <button className="adoption">
                              <Link to={"/dogDetail/" + dog._id}>
                                <span>Adoption</span> <img src={paw} alt="" />
                              </Link>
                            </button>
                          </div>

                          <div className="details">
                            <span className="name">{dog.name}</span>
                            <div className="breedBirth">
                              <div className="left">
                                <RiSettings5Fill className="icon" />
                                <span>{dog.breed}</span>
                              </div>
                              <div className="right">
                                <FaRegCalendarAlt className="icon icon2" />
                                <p>
                                  Birth :<span>{dog.age}</span>
                                </p>
                              </div>
                            </div>

                            <div className="starsPrice">
                              <div className="icons">
                                <RiStarSFill />
                                <RiStarSFill />
                                <RiStarSFill />
                                <RiStarSFill />
                                <RiStarSFill />
                              </div>
                              <div className="total">
                                <p>
                                  Total Price : $<span>30</span>
                                </p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </div>
        </div>
      </section>
      <div className="vawyfirst"></div>

      <section className="questionAndHistory">
        <div className="container">
          <div className="left">
            <img
              src={tv}
              alt=""
              className="tv"
              onClick={() => {
                console.log("openTvModal");
                openModal();
              }}
            />
            {isModalOpen && <Modal onClose={closeModal} />}
            <img src={family} alt="" className="family" />
          </div>
          <div className="right">
            <span>FAQ question</span>
            <h1>History & Family Adoption</h1>
            <div className="accordions">
              <Homeaccardion />
            </div>
          </div>
        </div>
        <div className="dog">
          <img src={doggo} alt="" />
        </div>
      </section>
      <div className="vawysec"></div>

      <section className="popularDogs">
        <div className="header">
          <div className="imgWrapper">
            <img src={left} alt="" />
          </div>
          <div className="head">
            <div className="paw">
              <img src={orangePaw} alt="" />
            </div>

            <span>Service to Breeds</span>
            <h1>Most Popular Dog Breed</h1>
            <p>
              The best overall dog DNA test is Embark Breed & Health Kit (view
              at Chewy), which provides you with a breed brwn and information
              Most dogs
            </p>
          </div>
          <div className="imgWrapper">
            <img src={right} alt="" />
          </div>
        </div>

        <div className="container">
          <div className="dogs">
            <div className="swiper">
              <Homeswiper2 />
            </div>
            <div className="available">
              <span className="breeder">Dog Breeder</span>
              <h1>Available for Breed</h1>
              <p>
                The best overall dog DNA test is Embark Breed & Health Kit (view
                at Chewy), which provid dogs
              </p>
              <Link to="/adoption">
                <button>
                  <span>More Pets</span>
                  <img src={orangePaw} alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="subscribe">
        <div className="container">
          <div className="head">
            <img
              src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/newsletter_shape01.png"
              alt=""
            />
          </div>
          <div className="wrapper">
            <div className="left">
              <h1>Newsletter For</h1>
              <div>
                <TiStarburst className="icon" />
                Do Not Show Your Email
              </div>
            </div>

            <div className="right">
              <input type="text" placeholder="Enter Your Email..." 
                onChange={(e) => {
                  setemailValue(e.target.value);
                }}
              />
              <button
                onClick={() => {
                  const user: any = JSON.parse(
                    localStorage.getItem("user") || "{}"
                  );
                  console.log("postEmail", user);
                  dispatch(
                    postEmail({
                      name: user.name,
                      surname: user.surname,
                      email: emailValue,
                    })
                  );
                }}
              >Subscribe</button>
            </div>
          </div>
          <div className="tail">
            <img
              src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/newsletter_shape02.png"
              alt=""
            />
          </div>
        </div>
      </section>
    </>
  );
}

export default DogList;
