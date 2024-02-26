import Adoption from "../pages/adoption";
import Basket from "../pages/basket";
import Blog from "../pages/blog";
import BlogSingle from "../pages/blogSingle";
import Breeder from "../pages/breeder";
import Checkout from "../pages/checkout";
import Contacts from "../pages/contacts";
import DogDetail from "../pages/dogDetail";
import DogList from "../pages/dogList";
import Home from "../pages/home";
import Login from "../pages/login";
import Register from "../pages/register";
import Root from "../pages/root";
import Shop from "../pages/shop";

export const routes = [
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "/",
        element: <Login />,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/home",
        element: <Home />,
      },
      {
        path: "/shop",
        element: <Shop />,
      },
      {
        path: "/basket",
        element: <Basket />,
      },
      {
        path: "/checkout",
        element: <Checkout />,
      },
      {
        path: "/dogList",
        element: <DogList />,
      },
      {
        path: "/dogDetail/:_id",
        element: <DogDetail />,
      },
      {
        path: "/contacts",
        element: <Contacts />,
      },
      {
        path: "/breeder",
        element: <Breeder />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/:_id",
        element: <BlogSingle />,
      },
      {
        path: "/adoption",
        element: <Adoption />,
      },
    ],
  },
];
