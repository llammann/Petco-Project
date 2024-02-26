type Props = {};
import "./../../assets/style/Blog.scss";
import { Link } from "react-router-dom";
import left from "./../../assets/images/breed_services_shape01.png";
import orangePaw from "./../../assets/images/pawprint.png";
import right from "./../../assets/images/breed_services_shape02.png";
import { FaChevronUp } from "react-icons/fa6";
import { FaRegBookmark } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa6";
import { FaRegBell } from "react-icons/fa";
import { IoSearchSharp } from "react-icons/io5";
import { FaAngleDoubleRight } from "react-icons/fa";

import { useState, useEffect, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./../../redux/store";
import { getAllNews, patchNews } from "./../../redux/slices/PetSlice";

export interface newsInt {
  featuredImage: string;
  tags: string[];
  author: string;
  content: string;
  title: string;
  _id: string;
  views: number;
  likes: number;
  dislikes: number;
  comments: object[];
  publicationDate: string;
}
function Blog({}: Props) {
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const allNews = useSelector((state: RootState) => state.pet.news);
  console.log("GETblogNews", allNews);


  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  function truncateContent(content: any, numSentences: any) {
    const sentences = content.split(/[.!?]/);
    const truncatedContent = sentences.slice(0, numSentences).join(". ") + ".";
    return truncatedContent;
  }
  const [searchQuery, setsearchQuery] = useState("");
  const [resultData, setresultData] = useState<newsInt[]>([]);

  useEffect(() => {
    dispatch(getAllNews());
  }, [searchQuery]);

  console.log("GETblogNews", allNews);
  console.log("djsndk");

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

  useEffect(() => {
    setresultData(
      searchQuery == ""
        ? allNews
        : [...allNews].filter(
            (elem: newsInt) =>
              elem.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
              elem.content.toLowerCase().includes(searchQuery.toLowerCase())
          )
    );
  }, [allNews, searchQuery]);

  console.log(resultData);
  return (
    <>
      {width === "block" && (
        <div className="sticky" ref={scrollRef} onClick={scrollToTop}>
          <FaChevronUp className="icon" />
        </div>
      )}
      <section className="head">
        <div className="wrapper">
          <h1>Our Blog</h1>
          <p>
            <span>Home</span> Our Blog
          </p>
        </div>
      </section>

      <section className="blog">
        <div className="container">
          <div className="left">
            {resultData &&
              resultData.map((elem: newsInt) => {
                return (
                  <div className="card">
                    <div className="imgWrapper">
                      <img src={elem.featuredImage} alt="" />
                    </div>

                    <div className="detail">
                      <div className="headDate">
                        <p className="head">
                          {" "}
                          <FaRegBookmark className="bookmark" />
                          <span>{elem.tags[0]} /</span>
                        </p>

                        <p className="admin">
                          <FaRegUser className="person" />
                          <span> {elem.author} /</span>
                        </p>

                        <p className="date">
                          <FaRegBell className="bell" />
                          <span>{formatDate(elem.publicationDate)}</span>
                        </p>
                      </div>

                      <h1>{elem.title}</h1>
                      <p className="info">{truncateContent(elem.content, 2)}</p>

                      <Link to={"/" + elem._id} onClick={()=>{
                        dispatch(patchNews({ newsId: elem._id, updates: { views: elem.views + 1 } }));
                        console.log("VIEW ++",elem.views)
                      }}>
                        Read More{" "}
                        <img
                          src="	https://themebeyond.com/pre/petco-prev/petco-live/img/icon/pawprint.png"
                          alt=""
                        />
                      </Link>

                      <div className="vawe"></div>
                    </div>
                  </div>
                );
              })}
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
                    setsearchQuery("Siberian Husky");
                  }}
                >
                  <span>Siberian Husky</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("German Shepherd");
                    console.log(searchQuery);
                  }}
                >
                  <span>German Sherped</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("French Bulldog");
                  }}
                >
                  <span>French Bulldog</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
                <li
                  onClick={() => {
                    setsearchQuery("Golden Retriever");
                  }}
                >
                  <span>Golden Retriever</span>
                  <FaAngleDoubleRight className="angle" />
                </li>
              </ul>
            </div>

            <div className="subscribeNewsletter">
              <div className="imgWrapper">
                <img
                  src="https://themebeyond.com/pre/petco-prev/petco-live/img/icon/sn_icon.png"
                  alt=""
                />
              </div>

              <div className="inputs">
                <h1>Subscribe Newsletter</h1>
                <p>Sign-up For Latest News</p>

                <input type="text" placeholder="Enter Your Email" />
                <button>Subscribe</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Blog;
