type Props = {};
import "./../../assets/style/Footer.scss";
import logo from "./../../assets/images/logo.png";
import { FaHeadphones } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { Link } from "react-router-dom";
import jake from "./../../assets/images/footer_shape01.png";
function Footer({}: Props) {
  return (
    <>
      <footer>
        <div className="vawe"></div>

        <div className="container">
          <div className="left">
            <Link>
              {" "}
              <div className="imgWrapper">
                <img src={logo} alt="" />
              </div>
            </Link>

            <p>
              The best overall dog DNA test Embark Breed & Health Kit (view at
              Chewy) which provides overall dog you.
            </p>

            <div className="call">
              <span className="icon">
                <FaHeadphones className="head" />
              </span>

              <div>
                <span className="nomer">747-800-9880</span>
                <p>CALL NOW</p>
              </div>
            </div>

            <div className="contacts">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>

          <div className="details">
            <div className="left">
              <span>Our Policies</span>

              <Link to="/shop">
                <p>Shop page</p>
              </Link>
              <Link to="/adoption">
                <p>Adoption page</p>
              </Link>
              <Link to="/blog">
                <p>Blog page</p>
              </Link>
              <Link to="/blog">
                <p>Privacy Policy</p>
              </Link>
              <Link to="/shop">
                <p>Terms and Conditions</p>
              </Link>
            </div>
            <div className="left">
              <span>Our Services</span>

              <Link to="/breeder">
                <p>Breeder page</p>
              </Link>
              <Link to="/contact">
                <p>Contacts page</p>
              </Link>
              <Link to="/home">
                <p>Home page</p>
              </Link>
              <Link to="/home">
                <p>Terms and Conditions</p>
              </Link>
              <Link to="/breeder">
                <p>Editorial Policy</p>
              </Link>
            </div>
          </div>

          <div className="right">
            <div className="conRight">
              <span>Instagram</span>

              <div className="wrapper">
                <span className="first">
                  <a href="/"></a>
                </span>
                <span className="second">
                  <a href="/"></a>
                </span>
                <span className="third">
                  <a href="/"></a>
                </span>
                <span className="fourth">
                  <a href="/"></a>
                </span>
                <span className="fifth">
                  <a href="/"></a>
                </span>
                <span className="sixth">
                  <a href="/"></a>
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="doggos">
          <img
            src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/footer_shape01.png"
            alt=""
          />
          <img
            src="https://themebeyond.com/pre/petco-prev/petco-live/img/images/footer_shape02.png"
            alt=""
          />
        </div>

        <div className="vawe2"></div>
        <div className="copy">
          <div className="container">
            <p>Copyright © 2021 Petco. All Rights Reserved.</p>
            <div className="language">
              <select name="lan" id="lan">
                <option value="english" className="opt">
                  <div className="wrapper">
                    <img
                      src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/united-states.png"
                      alt=""
                    />
                  </div>
                  English
                </option>
                <option value="russia" className="opt">
                  <div className="wrapper">
                    <img
                      src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/russia.png"
                      alt=""
                    />
                  </div>{" "}
                  Russia
                </option>
                <option value="thailand" className="opt">
                  <div className="wrapper">
                    <img
                      src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon//thailand.png"
                      alt=""
                    />
                  </div>{" "}
                  Thailand
                </option>
                <option value="india" className="opt">
                  <div className="wrapper">
                    <img
                      src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/india.png"
                      alt=""
                    />
                  </div>
                  India
                </option>
              </select>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
