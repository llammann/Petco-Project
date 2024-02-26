type Props = {};
import { useState, useEffect, useRef } from "react";
import { FaChevronUp } from "react-icons/fa6";
import "./../../assets/style/Contacts.scss";
import { TiStarburst } from "react-icons/ti";
import { FaLocationDot } from "react-icons/fa6";
import { FaPhoneAlt } from "react-icons/fa";
import { HiOutlineMailOpen } from "react-icons/hi";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";
function Contacts({}: Props) {
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
          <h1>Contacs Us</h1>
          <p>
            <span>Home</span> Contact
          </p>
        </div>
      </section>

      <section className="contacts">
        <div className="container">
          <div className="left">
            <span className="head">Contact Us</span>
            <h1>
              Let's Talk Question<span>.</span>
            </h1>
            <p>
              The domestic dog is a doiated dendant of the wolf. The dog derived
              from an ancient, extinct wolf, and the modern grey.
            </p>

            <form>
              <div className="name">
                <span>
                  Your Name{" "}
                  <sup>
                    <TiStarburst className="star" />
                  </sup>
                </span>
                <input type="text" placeholder="John Doe..." />
              </div>

              <div className="email">
                <span>
                  Your Email{" "}
                  <sup>
                    <TiStarburst className="star" />
                  </sup>
                </span>
                <input type="email" placeholder="info.exampe@.com" />
              </div>

              <div className="message">
                <span>
                  Your Message{" "}
                  <sup>
                    <TiStarburst className="star" />
                  </sup>
                </span>
                <textarea
                  name="message"
                  id="mess"
                  placeholder="Opinion..."
                ></textarea>
              </div>

              <div className="checkbox">
                <input type="checkbox" />
                <span>Don't show your email addres</span>
              </div>

              <button>Send Now</button>
            </form>
          </div>

          <div className="right">
            <div className="imgWrapper">
              <img
                src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/contact_img.png"
                alt=""
              />
            </div>

            <div className="location">
              <span>
                <FaLocationDot className="icon" />
              </span>
              <p>W84 New Park Lan, New York, NY 4586 United States</p>
            </div>

            <div className="phone">
              <span>
                <FaPhoneAlt className="icon" />
              </span>
              <p>+9 (256) 254 9568</p>
            </div>

            <div className="email">
              <span>
                <HiOutlineMailOpen className="icon" />
              </span>
              <p>Contact@ info.com</p>
            </div>

            <div className="blueTeam">
              <span>
                <FaFacebookF />
              </span>
              <span>
                <FaTwitter />
              </span>
              <span className="link">
                <FaLinkedinIn />
              </span>
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

export default Contacts;
