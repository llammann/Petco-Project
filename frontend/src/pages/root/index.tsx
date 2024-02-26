import { Outlet } from "react-router-dom";
import Navbar from "./../../layout/navbar";
import Footer from "../../layout/footer";
type Props = {};

function Root({}: Props) {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
    </>
  );
}

export default Root;
