import React from "react";
import { useState,useRef,useEffect } from "react";
import "./../../assets/style/Checkout.scss";
import { FaChevronUp } from "react-icons/fa6";
import { Field, Form, Formik } from "formik";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckout } from "./../../redux/slices/PetSlice";
import { RootState } from "../../redux/store";

const OrderSchema = Yup.object().shape({
  firstName: Yup.string().required(),
  lastName: Yup.string().required(),
  campanyName: Yup.string().required(),
  countryRegion: Yup.string().required(),
  streetAddresHouse: Yup.string().required(),
  streetAddresApart: Yup.string().required(),
  townCity: Yup.string().required(),
  stateCountry: Yup.string().required(),
  phone: Yup.string().required(),
  email: Yup.string().required(),
  orderNotes: Yup.string().required(),
});
function Checkout() {
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

  const MyBasket = useSelector((state: RootState) => state.pet.basket);
  const MyAdopts = useSelector((state: RootState) => state.pet.adopts);
  let subTotal = 0;

  MyBasket.map((x: any) => {
    subTotal += x.count * x.price;
  });

  MyAdopts.forEach((item: any) => {
    if (item.price == "Free") {
      subTotal += 0;
    } else {
      subTotal += +item.price;
    }
  });
  
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const dispatch = useDispatch();

  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="head">
        <div className="wrapper">
          <h1>Checkout</h1>
          <p>
            <span>Home</span> Checkout
          </p>
        </div>
      </section>
      <section className="checkout">
        <div className="container">
          <Formik
            initialValues={{
              firstName: "",
              lastName: "",
              campanyName: "",
              countryRegion: "",
              streetAddresHouse: "",
              streetAddresApart: "",
              townCity: "",
              stateCountry: "",
              phone: "",
              email: "",
              orderNotes: "",
            }}
            validationSchema={OrderSchema}
            onSubmit={(values, { resetForm }) => {
              console.log(values);
              dispatch(handleCheckout(values));
              resetForm();
            }}
          >
            {({ errors, touched }) => (
              <Form className="form">
                <div className="leftRight">
                  <div className="left">
                    <h4>Billing details</h4>

                    <div className="tables">
                      <div className="names">
                        <div className="name">
                          <label htmlFor="">First Name *</label>
                          <Field
                            type="text"
                            name="firstName"
                            style={
                              errors.firstName &&
                              touched.firstName && { borderColor: "red" }
                            }
                          />{" "}
                        </div>

                        <div className="last">
                          <label htmlFor="">Last Name *</label>
                          <Field
                            type="text"
                            name="lastName"
                            style={
                              errors.lastName &&
                              touched.lastName && { borderColor: "red" }
                            }
                          />{" "}
                        </div>
                      </div>
                      <div className="com">
                        <label htmlFor="">Company name *</label>
                        <Field
                          type="text"
                          name="campanyName"
                          style={
                            errors.campanyName &&
                            touched.campanyName && { borderColor: "red" }
                          }
                        />{" "}
                      </div>
                      <div className="country">
                        <label htmlFor="">Country / Region *</label>
                        <Field
                          type="text"
                          name="countryRegion"
                          style={
                            errors.countryRegion &&
                            touched.countryRegion && { borderColor: "red" }
                          }
                        />{" "}
                      </div>
                      <div className="street">
                        <label htmlFor="">Street address *</label>
                        <Field
                          name="streetAddresHouse"
                          type="text"
                          placeholder="House number and street name"
                          style={
                            errors.streetAddresHouse &&
                            touched.streetAddresHouse && {
                              borderColor: "red",
                            }
                          }
                        />
                        <Field
                          type="text"
                          name="streetAddresApart"
                          placeholder="Apartment,suite,unit,etc.(optional)"
                          style={
                            errors.streetAddresApart &&
                            touched.streetAddresApart && {
                              borderColor: "red",
                            }
                          }
                        />
                      </div>
                      <div className="town">
                        <label htmlFor="">Town / City *</label>
                        <Field
                          type="text"
                          name="townCity"
                          style={
                            errors.stateCountry &&
                            touched.stateCountry && { borderColor: "red" }
                          }
                        />{" "}
                      </div>
                      <div className="state">
                        <label htmlFor="">State / County (optional)</label>
                        <Field
                          type="text"
                          name="stateCountry"
                          style={
                            errors.phone &&
                            touched.phone && { borderColor: "red" }
                          }
                        />
                      </div>
                      <div className="phone">
                        <label htmlFor="">Phone *</label>
                        <Field
                          type="text"
                          name="phone"
                          style={
                            errors.phone &&
                            touched.phone && { borderColor: "red" }
                          }
                        />
                      </div>
                      <div className="email">
                        <label htmlFor="">Email address *</label>
                        <Field
                          type="text"
                          name="email"
                          style={
                            errors.email &&
                            touched.email && { borderColor: "red" }
                          }
                        />
                      </div>

                      <div className="addition">
                        <h3>Additional information</h3>
                        <div className="order">
                          <label htmlFor="">Order notes *</label>{" "}
                          <Field
                            type="text"
                            placeholder="Notes about your order,e.g.special notes for delivery"
                            name="orderNotes"
                            style={
                              errors.orderNotes &&
                              touched.orderNotes && { borderColor: "red" }
                            }
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rightInp">
                    <div className="mains">
                      <h2>Your order</h2>
                      <div className="subTotal">
                        <span>Subtotal:</span>
                        <p className="dashed"></p>
                        <p>
                          <b>{subTotal}</b>$
                        </p>
                      </div>

                      <div className="total">
                        <span>Total:</span>
                        <p className="dashed"></p>
                        <p>
                          <b>{subTotal}</b>$
                        </p>
                      </div>

                      {subTotal == 0 ? (
                        <div className="sorry" style={{}}>
                          <div className="text">
                            <p>
                              *Sorry, it seems that there are no available
                              payment methods. Please contact us if you require
                              assistance or wish to make alternate arrangements.
                            </p>
                          </div>
                        </div>
                      ) : null}

                      <button
                        type="submit"
                        className="placeOrder"
                        style={{
                          backgroundColor: subTotal === 0 ? "red" : "orangered",
                        }}
                      >
                        PLACE ORDER
                      </button>
                    </div>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </section>
    </>
  );
}

export default Checkout;
