import { GrLocation } from "react-icons/gr";
import { Link } from "react-router-dom";
import { FaDog } from "react-icons/fa";
import { FaCat } from "react-icons/fa";
import { PiBirdFill } from "react-icons/pi";
import paw from "./../../assets/images/w_pawprint.png";
import orangePaw from "./../../assets/images/pawprint.png";
import { FaRegCalendarAlt } from "react-icons/fa";
import { TiStarburst } from "react-icons/ti";
import { FaRegBookmark } from "react-icons/fa";
import { IoPersonOutline } from "react-icons/io5";
import { RiSettings5Fill } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { FaChevronUp } from "react-icons/fa6";
import dog from "./../../assets/images/adoption_img (1).jpg";
import three from "./../../assets/images/adoption_shape.png";
import tv from "./../../assets/images/faq_tv.png";
import family from "./../../assets/images/faq_img.png";
import left from "./../../assets/images/breed_services_shape01.png";
import doggo from "./../../assets/images/faq_shape.png";
import right from "./../../assets/images/breed_services_shape02.png";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
type Props = {};
import Homeswiper1 from "../../components/Homeswiper1";
import "./../../assets/style/Home.scss";
import { useState, useEffect, useRef } from "react";
import Homeswiper2 from "../../components/Homeswiper2";
import Homeaccardion from "../../components/Homeaccordion";
import Homeautoplayswiper from "../../components/Homeautoplayswiper";
import Homecustomerswiper from "../../components/Homecustomerswiper";
import Modal from "./../../components/TvModal";
import type { AppDispatch, RootState } from "./../../redux/store";
import { useSelector, useDispatch } from "react-redux";
import { FaRegBell } from "react-icons/fa6";
import {
  getAllPets,
  getAllNews,
  patchNews,
} from "./../../redux/slices/PetSlice";

export interface dogInt {
  name: string;
  gender: string;
  age: number;
  color: string;
  size: string;
  city: string;
  breed: string;
  bio: string;
  img: string;
  price: string;
}
import { newsInt } from "../blog";
function Home({}: Props) {
  function truncateContent(content: any, numLines: any) {
    const lines = content.split("\n");
    const truncatedContent = lines.slice(0, numLines).join("\n");
    return truncatedContent;
  }

  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllPets());
  }, []);

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const allDogs = useSelector((state: RootState) => state.pet.data);
  const allNews = useSelector((state: RootState) => state.pet.news);

  console.log("GEThome", allDogs);

  const [percentage, setPercentage] = useState(1);
  const [dogs, setDogs] = useState(1);
  const [dogBreeding, setDogBreeding] = useState(1);
  const [history, setHistory] = useState(1);

  const scoresRef = useRef(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Start counting up when element is in view
            const incrementValues = () => {
              setPercentage((prevPercentage) =>
                prevPercentage < 73 ? prevPercentage + 1 : 73
              );
              setDogs((prevDogs) => (prevDogs < 259 ? prevDogs + 1 : 259));
              setDogBreeding((prevDogBreeding) =>
                prevDogBreeding < 39 ? prevDogBreeding + 1 : 39
              );
              setHistory((prevHistory) =>
                prevHistory < 45 ? prevHistory + 1 : 45
              );
            };
            const interval = setInterval(incrementValues, 10);
            return () => clearInterval(interval);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (scoresRef.current) {
      observer.observe(scoresRef.current);
    }

    return () => {
      if (scoresRef.current) {
        observer.unobserve(scoresRef.current);
      }
    };
  }, []);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="bestFriend">
        <Homeswiper1 />
      </section>

      <section className="bestService">
        <div className="container">
          <div className="options">
            <div className="city">
              <div className="detail">
                <GrLocation className="icon" />
                <span>Ener Cit,State.or Zip</span>
              </div>

              {/* <div className="tan"></div> */}
            </div>

            <div className="dog">
              <FaDog className="icon" />
              <span>Find Your Dog</span>
            </div>

            <div className="cat">
              <FaCat className="icon" />
              <span>Find Your Cat</span>
            </div>

            <div className="bird">
              <PiBirdFill className="icon" />
              <span>Find Your Bird</span>
            </div>

            <div className="others">
              <label htmlFor="pets">Find other animals</label>
              <div>
                <select name="pets" id="pets">
                  <option value="default"></option>
                  <option value="dogs" className="opt">
                    Dogs
                  </option>
                  <option value="cats" className="opt">
                    Cats
                  </option>
                  <option value="birds" className="opt">
                    Birds
                  </option>
                </select>
              </div>
            </div>
          </div>

          <div className="wrapper">
            <span>Why Choose Us?</span>
            <p className="best">
              Best Service to Breeds Your Loved Dog Explore
            </p>

            <div className="scores" ref={scoresRef}>
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={{ xs: 2, md: 2 }}
                  columns={{ xs: 1, sm: 8, md: 16 }}
                  className="grido"
                  style={{ margin: "auto" }}
                >
                  <Grid item xs={2} sm={4} md={4} key={0} className="gridItem">
                    <div className="percentage">
                      <span>{percentage}%</span>
                      <p>DOGS ARE FIRST BRED</p>
                    </div>
                  </Grid>

                  <Grid item xs={2} sm={4} md={4} key={1} className="gridItem">
                    <div className="dogs">
                      <span>{dogs}+</span>
                      <p>MOST DOGS ARE FIRST</p>
                    </div>
                  </Grid>

                  <Grid item xs={2} sm={4} md={4} key={2} className="gridItem">
                    <div className="breeding">
                      <span>{dogBreeding}K</span>
                      <p>DOG BREEDING</p>
                    </div>
                  </Grid>

                  <Grid item xs={2} sm={4} md={4} key={3} className="gridItem">
                    <div className="history">
                      <span>{history}+</span>
                      <p>YEARS OF HISTORY</p>
                    </div>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
        </div>
      </section>

      <section className="adoptionFree">
        <div className="container">
          <div className="left">
            <div className="paw">
              <img src={three} alt="" />
            </div>
            <h1>
              Working Dog <span>Adoption</span> Free,Happy Time
            </h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
              blanditiis minima aspernatur cum non accusamus iusto repudiandae
              libero odio eos cumque.
            </p>

            <Link to="/adoption">
              <button>
                <span>Adoption</span> <img src={paw} alt="" />
              </button>
            </Link>
          </div>

          <div className="imgWrapper">
            <img src={dog} alt="" />
          </div>
        </div>
      </section>

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
              <Link to="/dogList">
                <button>
                  <span>More Pets</span>
                  <img src={orangePaw} alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      <div className="vawe"></div>
      <section className="questionAndHistory">
        <div className="container">
          <div className="left">
            <div className="tv">
              <img
                src={tv}
                alt=""
                onClick={() => {
                  console.log("openTvModal");
                  openModal();
                }}
              />
            </div>
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
      <div className="vawysecond"></div>

      <section className="figures">
        <div className="container">
          <Homeautoplayswiper />
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
                  allDogs.map((dog: dogInt) => {
                    return (
                      <Grid item xs={6} sm={4} md={3}>
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
                                  Total Price :{" "}
                                  {dog.price ? (
                                    <span className="numb">${dog.price}</span>
                                  ) : (
                                    <span>Free</span>
                                  )}
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

      <div className="vawythird"></div>

      <section className="happyCustomers">
        <div className="header">
          <div className="imgWrapper">
            <img src={left} alt="" />
          </div>
          <div className="head">
            <div className="paw">
              <img src={orangePaw} alt="" />
            </div>

            <span>Testimonials</span>
            <h1>Our Happy Customers</h1>
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

        <div className="containerr">
          <Homecustomerswiper />
        </div>
      </section>
      <div className="vawyfourth"></div>

      <section className="news">
        <div className="header">
          <div className="imgWrapper">
            <img src={left} alt="" />
          </div>
          <div className="head">
            <div className="paw">
              <img src={orangePaw} alt="" />
            </div>

            <span>Our News</span>
            <h1>Latest News Update</h1>
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
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={{ xs: 2, md: 3 }}
              columns={{ xs: 4, sm: 8, md: 12 }}
              className="grid"
            >
              {allNews &&
                allNews.slice(0, 3).map((news: any) => {
                  return (
                    <Grid item xs={12} sm={4} md={4}>
                      <div className="card">
                        <div className="imgWrapper">
                          <img src={news.featuredImage} alt="" />
                          <button className="category">
                            <FaRegBookmark className="bookmark" />{" "}
                            <span>{news.tags[0]}</span>
                          </button>
                        </div>

                        <div className="details">
                          <div className="adminDate">
                            <span>
                              <IoPersonOutline className="person" />{" "}
                              {news.author}
                            </span>
                            <span>/</span>
                            <p>
                              <FaRegBell className="bell" />
                              {formatDate(news.publicationDate)}
                            </p>
                          </div>

                          <h2>{news.title}</h2>
                          <p className="about">
                            {truncateContent(news.content, 1)}
                          </p>

                          <Link
                            to={"/" + news._id}
                            onClick={() => {
                              dispatch(
                                patchNews({
                                  newsId: news._id,
                                  updates: { views: news.views + 1 },
                                })
                              );
                            }}
                          >
                            Read More{" "}
                            <img
                              src="	https://themebeyond.com/pre/petco-prev/petco-live/img/icon/pawprint.png"
                              alt=""
                            />
                          </Link>
                        </div>
                      </div>
                    </Grid>
                  );
                })}
            </Grid>
          </Box>
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
              <input type="text" placeholder="Enter Your Email..." />
              <button>Subscribe</button>
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

export default Home;
