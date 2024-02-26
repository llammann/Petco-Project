import React from "react";
import { useState, useRef, useEffect } from "react";
import "./../../assets/style/Basket.scss";
// import { IconName } from "react-icons/ai";
import { TiDeleteOutline } from "react-icons/ti";
import { FaChevronUp } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import paw from "./../../assets/images/w_pawprint.png";
import { RiSettings5Fill } from "react-icons/ri";
import { RiStarSFill } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";

import {
  handleDelete,
  handleDeleteAdopt,
  handleMinus,
  handlePlus,
} from "./../../redux/slices/PetSlice";
import { RootState } from "../../redux/store";

function Basket() {
  const MyAdopts = useSelector<RootState>((state) => state.pet.adopts);

  const dispatch = useDispatch();
  const MyBasket = useSelector<RootState>((state) => state.pet.basket);
  console.log("basket: ", MyBasket);
  let subtotal = 0;
  MyBasket &&
    MyBasket.forEach((item: any) => {
      subtotal += item.count * item.price;
    });

  MyAdopts &&
    MyAdopts.forEach((item: any) => {
      if (item.price == "Free") {
        subtotal += 0;
      } else {
        subtotal += +item.price;
      }
    });
  // console.log("TOTALLLLLLL",subtotal.toFixed(2));

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
          <h1>Basket</h1>
          <p>
            <span>Home</span> Basket
          </p>
        </div>
      </section>

      <section className="firstTable">
        <div className="container">
          <h1>Your Products</h1>
          <div className="cartTable">
            <table>
              <tr>
                <th></th>
                <th>Image</th>
                <th>
                  <span>Product</span>
                </th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Subtotal</th>
              </tr>

              {MyBasket &&
                MyBasket.map((x: any) => {
                  return (
                    <tr>
                      <td>
                        <div className="cancel">
                          <button
                            onClick={() => {
                              dispatch(handleDelete(x));
                              //   dispatch(updateBasket());
                            }}
                          >
                            <TiDeleteOutline className="CancelCart" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="imgWrapper">
                          <img src={x.img} alt="" />
                        </div>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.price}$</td>
                      <td>
                        <div className="quantity">
                          <button
                            className="minus"
                            onClick={() => {
                              dispatch(handleMinus(x));
                            }}
                          >
                            -
                          </button>
                          <span> {x.count}</span>
                          <button
                            className="plus"
                            onClick={() => {
                              console.log("Before dispatching Plus");
                              dispatch(handlePlus(x));
                              console.log("After dispatching Plus");
                            }}
                          >
                            +
                          </button>
                        </div>
                      </td>
                      <td>{(x.price * x.count).toFixed(2)}$</td>
                    </tr>
                  );
                })}
            </table>

            <div className="buttons">
              <div className="tableInpBtn">
                <div className="Inp">
                  <input type="text" placeholder="Coupon code" />
                </div>

                <div className="Btn">
                  <button>APLY COUPON</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="secondTable">
        <div className="container">
          <h1>Your Dogs</h1>
          <div className="cartTable">
            <table>
              <tr>
                <th></th>
                <th>Image</th>
                <th>
                  <span>Name</span>
                </th>
                <th>Price</th>
                <th>Breed</th>
                <th>Subtotal</th>
              </tr>

              {MyAdopts && MyAdopts.map((x: any) => {
                  return (
                    <tr>
                      <td>
                        <div className="cancel">
                          <button
                            onClick={() => {
                              dispatch(handleDeleteAdopt(x));
                            }}
                          >
                            <TiDeleteOutline className="CancelCart" />
                          </button>
                        </div>
                      </td>
                      <td>
                        <div className="imgWrapper">
                          <img src={x.img} alt="" />
                        </div>
                      </td>
                      <td>{x.name}</td>
                      <td>{x.price}$</td>
                      <td>
                        <div className="breed">
                          <span>{x.breed}</span>
                        </div>
                      </td>
                      <td>{x.price}$</td>
                    </tr>
                  );
                })}
            </table>

            <div className="buttons">
              <div className="tableInpBtn">
                <div className="Inp">
                  <input type="text" placeholder="Coupon code" />
                </div>

                <div className="Btn">
                  <button>APLY COUPON</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="YourBasketSituation">
        <div className="container">
          <div className="subTotal">
            <div className="cartTotals">
              <h5>
                <b>Cart Totals</b>
              </h5>
            </div>
            <hr />

            <div className="body">
              <div className="sub">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <hr
                style={{
                  width: "90%",
                  margin: "auto",
                }}
              />
              <div className="total">
                <span>Total</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>

              <hr style={{ width: "90%", margin: "auto" }} />
              <div className="btn">
                <Link
                  to="/checkout"
                  style={{ textDecoration: "none", color: "white" }}
                >
                  <button>PROCCED TO CHECKOUT</button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Basket;
