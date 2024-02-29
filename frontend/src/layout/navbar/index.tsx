import { FaRegClock } from "react-icons/fa6";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";
import { FaLinkedinIn } from "react-icons/fa";
import { CiSearch } from "react-icons/ci";
import { LiaShoppingBagSolid } from "react-icons/lia";
import { IoPawOutline } from "react-icons/io5";
import logo from "./../../assets/images/logo.png";
import paw from "./../../assets/images/w_pawprint.png";
import { useState } from "react";
import SearchModal from "./../../components/SearchModal";
import { MenuOutlined } from "@ant-design/icons";
import { Button, Dropdown } from "antd";
import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import "./../../assets/style/Navbar.scss";
type Props = {};

import { RootState } from "./../../redux/store";
import {  useSelector } from "react-redux";
import ProfilOffcanvas from "../../components/ProfilOffcanvas";
import BasicMenu from "../../components/Menu";

function index({}: Props) {
  const items = [
    {
      key: "1",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/home"
          style={{ textDecoration: "none" }}
        >
          Home
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/adoption"
          style={{ textDecoration: "none" }}
        >
          Adoption
        </a>
      ),
    },
    {
      key: "3",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/basket"
          style={{ textDecoration: "none" }}
        >
          Basket
        </a>
      ),
    },
    {
      key: "4",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/blog"
          style={{ textDecoration: "none" }}
        >
          Blog
        </a>
      ),
    },
    {
      key: "5",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/breeder"
          style={{ textDecoration: "none" }}
        >
          Breeder
        </a>
      ),
    },
    {
      key: "6",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/checkout"
          style={{ textDecoration: "none" }}
        >
          Checkout
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/contacts"
          style={{ textDecoration: "none" }}
        >
          Contacts
        </a>
      ),
    },
    {
      key: "7",
      label: (
        <a
          target=""
          rel="noopener noreferrer"
          href="/shop"
          style={{ textDecoration: "none" }}
        >
          Shop
        </a>
      ),
    },
  ];

  const Basket = useSelector((state: RootState) => state.pet.basket);
  const [basketLength, setBasketLength] = useState(0);
  useEffect(() => {
    setBasketLength(Basket.length);
  }, [Basket,JSON.parse(localStorage.getItem("user"))]);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const openSearchModal = () => {
    setIsSearchModalOpen(true);
  };

  const closeSearchModal = () => {
    setIsSearchModalOpen(false);
  };

  const location = useLocation();
  // console.log("Current Path:", location.pathname);
  return (
    <>
      <section className="contact">
        <div className="container">
          <div className="left">
            <div className="phone">
              <span className="tel">
                Call us: <span>747-800-9880</span>
              </span>
            </div>

            <div className="opening">
              <FaRegClock />
              <span>Opening Hours: 7:00 am - 9:00 pm (Mon - Sun)</span>
            </div>
          </div>

          <div className="right">
            <span>Follow: </span>
            <div className="icons">
              <FaFacebookF />
              <FaTwitter />
              <FaInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>
      </section>

      {JSON.parse(localStorage.getItem("user") || null!) ? (
        <nav>
          <section className="navbar">
            <div className="container">
              <div className="left">
                <Link to="/home">
                  {" "}
                  <div className="logo" />
                </Link>

                <div className="options">
                  <ul>
                    <li
                      className={location.pathname === "/home" ? "active" : ""}
                    >
                      <Link to="/home">Home</Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/dogList" ? "active" : ""
                      }
                    >
                      <Link to="/dogList">Dog List</Link>
                    </li>
                    <li
                      className={location.pathname === "/shop" ? "active" : ""}
                    >
                      <Link to="/shop">Shop</Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/adoption" ? "active" : ""
                      }
                    >
                      <Link to="/adoption">Adoption</Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/breeder" ? "active" : ""
                      }
                    >
                      <Link to="/breeder">Breeder</Link>
                    </li>
                    <li
                      className={location.pathname === "/blog" ? "active" : ""}
                    >
                      <Link to="/blog">Blog</Link>
                    </li>
                    <li
                      className={
                        location.pathname === "/contacts" ? "active" : ""
                      }
                    >
                      <Link to="/contacts">Contacts</Link>
                    </li>
                  </ul>
                </div>
              </div>

              <div className="right">
                <button>
                  {/* <CiSearch
                    className="search"
                    onClick={() => {
                      console.log("openSearchModal");
                      openSearchModal();
                    }}
                  /> */}
                  <ProfilOffcanvas />
                  {isSearchModalOpen && (
                    <SearchModal onClose={closeSearchModal} />
                  )}
                </button>
                <Link to="/basket" className="baggy">
                  <span className="spi">
                    <LiaShoppingBagSolid className="bag" />
                  </span>
                  <sup>{basketLength}</sup>
                </Link>

                <Link to="/adoption">
                  <p className="ado">
                    <span>Adopt Here</span>
                    <img src={paw} alt="" />
                  </p>
                </Link>

                <Dropdown
                  className="dropdownMenu"
                  menu={{
                    items,
                  }}
                  placement="bottomLeft"
                  arrow
                >
                  <button>
                    <MenuOutlined />
                  </button>
                </Dropdown>
              </div>
            </div>
          </section>
          <div className="vawy"></div>
        </nav>
      ) : null}
    </>
  );
}

export default index;
