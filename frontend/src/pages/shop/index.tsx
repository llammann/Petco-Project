import { useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./../../assets/style/Shop.scss";
import { FaAngleDoubleRight } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaChevronUp } from "react-icons/fa6";

import Grid from "@mui/material/Grid";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Box from "@mui/material/Box";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./../../redux/store";
import { handleBasket, getAllProducts } from "./../../redux/slices/PetSlice";
import swal from "sweetalert";
// import Tooltip from "@mui/material/Tooltip";

export interface ProductInt {
  name: string;
  price: number;
  img: string;
  _id: string;
  description: string;
  category: string;
}
function Shop() {
  const [searchQuery, setsearchQuery] = useState("");
  const [resultData, setresultData] = useState<ProductInt[]>([]);

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
  const products = useSelector((state: RootState) => state.pet.products);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    setresultData(
      searchQuery == ""
        ? products
        : [...products].filter(
            (elem: ProductInt) =>
              elem.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.price.toString().includes(searchQuery)
          )
    );
  }, [products, searchQuery]);

  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="head">
        <div className="wrapper">
          <h1>Our Shop</h1>
          <p>
            <span>Home</span> Shop
          </p>
        </div>
      </section>

      <section className="shop">
        <div className="container">
          <div className="left">
            <Box sx={{ flexGrow: 1 }}>
              <Grid
                className="grid"
                container
                spacing={{ xs: 2, md: 3 }}
                columns={{ xs: 4, sm: 8, md: 12 }}
              >
                {resultData &&
                  resultData.map((prod: ProductInt) => {
                    return (
                      <Grid item xs={2} sm={4} md={4} key={prod._id}>
                        <div className="card">
                          <div className="imgWrapper">
                            <img src={prod.img} alt="" />
                          </div>

                          <div className="detail">
                            <span>{prod.category}</span>
                            <h3>{prod.name}</h3>
                            <div className="priceAdd">
                              <p>${prod.price}</p>
                              
                              <button
                                onClick={() => {
                                  dispatch(handleBasket(prod));
                                  swal("Added succesfully!");

                                  console.log("ADD +");
                                }}
                              >
                                ADD +
                              </button>
                            </div>
                          </div>
                        </div>
                      </Grid>
                    );
                  })}
              </Grid>
            </Box>
          </div>

          <div className="right">
            <div className="search">
              <p>
                <h3>Search</h3>

                <span>
                  <h5></h5>
                  <h5></h5>
                </span>
              </p>

              <div className="input">
                <input
                  type="text"
                  placeholder="Search ..."
                  onChange={(e) => {
                    setsearchQuery(e.target.value);
                  }}
                />
                <button>
                  <IoSearchSharp />
                </button>
              </div>
            </div>

            <div className="categories">
              <p>
                <h3>Categories</h3>
                <span>
                  <h5></h5>
                  <h5></h5>
                </span>
              </p>

              <ul className="options">
                <li
                  onClick={() => {
                    setsearchQuery("Toys");
                  }}
                >
                  <span>Toys</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("Foods");
                  }}
                >
                  <span>Foods</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("Clothes");
                  }}
                >
                  <span>Clothes</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("Accessories");
                  }}
                >
                  <span>Accessories</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
              </ul>
            </div>

            <div className="rabbit"></div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Shop;
