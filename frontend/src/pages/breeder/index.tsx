type Props = {};
import { useState, useEffect, useRef } from "react";
import "./../../assets/style/Adoption.scss";
import { IoMdCheckmark } from "react-icons/io";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import right from "./../../assets/images/breed_services_shape02.png";
import left from "./../../assets/images/breed_services_shape01.png";
import orangePaw from "./../../assets/images/pawprint.png";
import doggo from "./../../assets/images/faq_shape.png";
import Adoptionswiper1 from "../../components/Adoptionswiper1";

import Adoptionswiper2 from "../../components/Adoptionswiper2";

import { FaChevronUp } from "react-icons/fa6";
import Homeaccardion from "../../components/Homeaccordion";
import Adoptionverticalswiper from "../../components/Adoptionverticalswiper";
import { Link } from "react-router-dom";
function Adoption({}: Props) {
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
            // Increment values every 10 milliseconds
            const interval = setInterval(incrementValues, 10);
            // Clear interval on element exit
            return () => clearInterval(interval);
          }
        });
      },
      { threshold: 0.5 } // Trigger when 50% of the element is visible
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

  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="head">
        <div className="wrapper">
          <h1>Get Adoption</h1>
          <p>
            <span>Home</span> Adoption
          </p>
        </div>
      </section>

      <section className="adoptionHappyTime">
        <div className="container">
          <div className="left">
            <span className="head">Meet Adoption</span>
            <h1>
              Work For <span>Adoption</span> Happy Time
            </h1>
            <p>
              The best overall dog DNA test is Embark Breed & Health Kit view at
              Chewy which pres domesti dog is a sticated descendant.
            </p>
            <div className="first">
              <IoMdCheckmark className="mark" />
              <span>Embark Breed & Health</span>
            </div>
            <div className="second">
              <IoMdCheckmark className="mark" />
              <span>The domestic dog is a domesticated</span>
            </div>
          </div>

          <div className="right">
            <div className="swiper">
              <Adoptionswiper1 />
            </div>

            <div className="available">
              <span className="breeder">Dog Breeder</span>
              <h1>Available for Adoption</h1>
              <p>
                The best overall dog DNA test is Embark Breed & Health Kit (view
                at Chewy), which provid dogs
              </p>
              <Link to="/dogList">
                <button>
                  {" "}
                  <span>More Pets</span>
                  <img src={orangePaw} alt="" />
                </button>
              </Link>
            </div>
          </div>
        </div>

        <div className="scoreWrapper">
          <div className="wrapper">
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

      <section className="waitingForAdoption">
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

        <div className="all">
          <Adoptionswiper2 />
        </div>
      </section>

      <section className="questions">
        <div className="container">
          <div className="imgWrapper"></div>
          <div className="right">
            <span>FAQ question</span>
            <h1>History & Family Adoption</h1>
            <div className="accordions">
              <Homeaccardion />
            </div>
            <div className="dog">
              <img src={doggo} alt="" />
            </div>
          </div>
        </div>
      </section>

      <section className="happyAdoption">
        <div className="container">
          <div className="left">
            <span className="head">Meet Adoption</span>
            <h1>
              Work For <span>Adoption</span> Happy Time
            </h1>
            <p>
              The best overall dog DNA test is Embark Breed & Health Kit view at
              Chewy which pres domesti dog is a sticated descendant.
            </p>
            <div className="first">
              <IoMdCheckmark className="mark" />
              <span>Embark Breed & Health</span>
            </div>
            <div className="second">
              <IoMdCheckmark className="mark" />
              <span>The domestic dog is a domesticated</span>
            </div>
          </div>

          <div className="right">
            <Adoptionverticalswiper />
          </div>
        </div>
      </section>
    </>
  );
}

export default Adoption;
