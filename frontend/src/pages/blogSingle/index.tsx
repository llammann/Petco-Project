type Props = {};
import "./../../assets/style/BlogSingle.scss";
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
import { FaTags } from "react-icons/fa6";
import StarBorderIcon from "@mui/icons-material/StarBorder";
import { FaFacebookF } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaLinkedinIn } from "react-icons/fa";

import { GrLike } from "react-icons/gr";
import { GrDislike } from "react-icons/gr";
import { PiEyeLight } from "react-icons/pi";

import { FaAnglesRight } from "react-icons/fa6";
import { FaAnglesLeft } from "react-icons/fa6";

import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./../../redux/store";
import { getAllNews, patchNews } from "./../../redux/slices/PetSlice";
import axios from "axios";

interface newsInt {
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

interface Comment {
  commenter: string;
  email: string;
  content: string;
  _id?: string;
  timestamp?: string;
}
function BlogSingle({}: Props) {
  const [newComment, setNewComment] = useState<Comment>({
    commenter: "",
    email: "",
    content: "",
  });

  const { _id } = useParams();
  function formatDate(dateString: any) {
    const date = new Date(dateString);
    const options = { month: "short", day: "2-digit", year: "numeric" };
    return date.toLocaleDateString("en-US", options);
  }

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch, newComment]);

  const allNews = useSelector((state: RootState) => state.pet.news);
  console.log("GETblogNews", allNews);

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

  const currentIndex = allNews.findIndex((elem: any) => elem._id === _id);
  const totalPosts = allNews.length;

  const nextIndex = currentIndex < totalPosts - 1 ? currentIndex + 1 : 0;
  const nextPost: any = allNews[nextIndex];

  const prevIndex = currentIndex > 0 ? currentIndex - 1 : totalPosts - 1;
  const prevPost: any = allNews[prevIndex];

  const news: newsInt | undefined = allNews.find(
    (elem: any) => elem._id == _id
  ) as newsInt;

  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);

  const handleLikeToggle = () => {
    const updatedLikes = liked ? news.likes - 1 : news.likes + 1;

    dispatch(patchNews({ newsId: news._id, updates: { likes: updatedLikes } }));
    setLiked(!liked);
  };

  const handleDislikeToggle = () => {
    const updatedDislikes = disliked ? news.dislikes - 1 : news.dislikes + 1;
    dispatch(
      patchNews({ newsId: news._id, updates: { dislikes: updatedDislikes } })
    );
    setDisliked(!disliked);
  };

  if (!news) {
    return null;
  }

  const handleSubmitComment = () => {
    if (
      newComment.commenter.trim() !== "" &&
      newComment.content.trim() !== ""
    ) {
      axios
        .patch(`http://localhost:7070/news/${news._id}`, {
          comments: [...news.comments, newComment],
        })
        .then((res) => {
          useEffect(() => {
            dispatch(getAllNews());
          }, [newComment]);
        })
        .catch((error) => {
          console.error("Error adding comment:", error);
        });

      setNewComment({ commenter: "", email: "", content: "" });
    } else {
      alert("Please fill in all required fields.");
    }
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
          <h1>Blog Single</h1>
          <p>
            <span>Home</span> Blog Single
          </p>
        </div>
      </section>

      <section className="blog">
        <div className="container">
          <div className="left">
            {/* {resultData &&
              resultData.map((elem: newsInt) => {
                return ( */}
            <div className="card">
              <div className="imgWrapper">
                <img src={news.featuredImage} alt="" />
              </div>

              <div className="detail">
                <div className="headDate">
                  <p className="head">
                    {" "}
                    <FaRegBookmark className="bookmark" />
                    <span>{news.tags[0]} /</span>
                  </p>

                  <p className="admin">
                    <FaRegUser className="person" />
                    <span> {news.author} /</span>
                  </p>

                  <p className="date">
                    <FaRegBell className="bell" />
                    <span>{formatDate(news.publicationDate)}</span>
                  </p>
                </div>

                <h1>{news.title}</h1>
                <p className="info">{news.content}</p>

                <div className="tagsContact">
                  <div className="tagsLeft">
                    <span>
                      {" "}
                      <FaTags className="tags" />
                      TAGS:{" "}
                    </span>
                    <ul>
                      {news.tags &&
                        news.tags.map((tag: string) => {
                          return <li>{tag}</li>;
                        })}
                    </ul>
                  </div>

                  <div className="contact">
                    <span>
                      <FaFacebookF className="icon" />
                    </span>
                    <span>
                      <FaTwitter className="icon" />
                    </span>
                    <span className="link">
                      <FaLinkedinIn className="icon" />
                    </span>
                  </div>
                </div>

                <div className="likeView">
                  <span>
                    <PiEyeLight className="view" />
                    {news.views}
                  </span>
                  <span>
                    <GrLike className="like" onClick={handleLikeToggle} />
                    {liked ? news.likes + 1 : news.likes}
                  </span>
                  <span>
                    <GrDislike
                      className="dislike"
                      onClick={handleDislikeToggle}
                    />
                    {disliked ? news.dislikes + 1 : news.dislikes}
                  </span>
                </div>

                <div className="nextPrevious">
                  <div className="prev">
                    <Link to={"/" + prevPost._id}>
                      <p>
                        <FaAnglesLeft className="prevIcon" />
                      </p>
                      <span>PREVIOUS POST</span>
                    </Link>
                  </div>
                  <div className="next">
                    <Link to={"/" + nextPost._id}>
                      <span>NEXT POST</span>
                      <p>
                        <FaAnglesRight className="nextIcon" />
                      </p>
                    </Link>
                  </div>
                </div>

                <div className="comments">
                  <ul>
                    {news.comments.map((comment: any) => (
                      <li>
                        <div className="imgWrapper">
                          <img
                            src="	https://secure.gravatar.com/avatar/b507128c4a8c964e410e4cf47bc89a67?s=60&d=mm&r=g"
                            alt=""
                          />
                        </div>
                        <div className="articles">
                          <span>
                            {comment.commenter}{" "}
                            <em>{formatDate(comment.timestamp)}</em>
                          </span>
                          {/* <div className="stars">
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                            <StarBorderIcon />
                          </div> */}
                          <p>{comment.content}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleSubmitComment();
                    console.log("newComment", newComment);
                    dispatch(getAllNews());
                  }}
                >
                  <h2>Add a Review</h2>
                  <h4>
                    Your email address will not be published. Required fields
                    are marked *
                  </h4>
                  {/* Include rating stars UI here */}
                  <p>Your review *</p>
                  <input
                    type="text"
                    value={newComment.content}
                    className="yourReview"
                    onChange={(e) =>
                      setNewComment({ ...newComment, content: e.target.value })
                    }
                    required
                  />
                  <div className="nameEmail">
                    <div className="name">
                      <h3>Name *</h3>
                      <input
                        type="text"
                        value={newComment.commenter}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            commenter: e.target.value,
                          })
                        }
                        required
                      />
                    </div>

                    <div className="email">
                      <h3>Email *</h3>
                      <input
                        type="email"
                        value={newComment.email}
                        onChange={(e) =>
                          setNewComment({
                            ...newComment,
                            email: e.target.value,
                          })
                        }
                        required
                      />
                    </div>
                  </div>
                  <input type="checkbox" />
                  <span>
                    Save my name, email, and website in this browser for the
                    next time I comment.
                  </span>
                  <br />
                  <button type="submit">SUBMIT</button>
                </form>

                <div className="vawe"></div>
              </div>
            </div>
            {/* );
              })} */}
          </div>

          <div className="right">
            {/* <div className="search">
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
            </div> */}

            <div className="categories">
              <p>
                <h3>Categories</h3>
                <span>
                  <h5></h5>
                  <h5></h5>
                </span>
              </p>

              <ul className="options">
                <Link to="/blog">
                  <li>
                    <span>Siberian Husky</span>
                    <FaAngleDoubleRight className="angle" />
                  </li>
                </Link>
                <Link to="/blog">
                  <li>
                    <span>German Sherped</span>
                    <FaAngleDoubleRight className="angle" />
                  </li>
                </Link>
                <Link to="/blog">
                  <li>
                    <span>French Bulldog</span>
                    <FaAngleDoubleRight className="angle" />
                  </li>
                </Link>
                <Link to="/blog">
                  <li>
                    <span>Golden Retriever</span>
                    <FaAngleDoubleRight className="angle" />
                  </li>
                </Link>
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

export default BlogSingle;
