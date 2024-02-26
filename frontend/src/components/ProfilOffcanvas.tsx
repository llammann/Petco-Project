import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MailIcon from "@mui/icons-material/Mail";
import { Link } from "react-router-dom";
import "./../assets/style/ProfilOffcanvas.scss";
import { MdOutlineManageAccounts } from "react-icons/md";
import { MdOutlineCancel } from "react-icons/md";
import { putUser } from "../redux/slices/PetSlice";
import { UseDispatch, useDispatch } from "react-redux";
import { AppDispatch } from "../redux/store";

export default function ProfilOffcanvas() {
  const dispatch = useDispatch<AppDispatch>();
  // const user = JSON.parse(localStorage.getItem("user") || "{}");
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user") || "{}")
  );
  const [updateUser, setupdateUser] = useState({});

  // setupdateUser({
  //   name: "",
  //   surname: "",
  //   username: "",
  //   password: "",
  //   balance: "",
  //   email: "",
  // });
  const [Edit, setEdit] = useState(false);
  const [state, setState] = React.useState({
    right: false,
  });

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }

      setState({ ...state, right: open });
    };

  const list = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      // onClick={toggleDrawer(false)}
      // onKeyDown={toggleDrawer(false)}
      className="box"
    >
      <div className="cancel">
        <MdOutlineCancel className="cancelIcon" onClick={toggleDrawer(false)} />
      </div>

      <div
        className="card"
        style={{
          padding: !Edit ? "30px 0 0 30px" : "0px",
          borderLeft: Edit ? "0px" : "2px solid gray",
          borderTop: Edit ? "0px" : "2px solid gray",
        }}
      >
        <div className="user">
          <div className="imgWrapper">
            <img
              src="https://a0.anyrgb.com/pngimg/1784/296/client-icon-login-avatar-user-light-service-orange-business-icons-circle.png"
              alt=""
            />
          </div>

          <div className="articles">
            <p>
              {user.name} {user.surname}
            </p>
            <em>{user.username}</em>
          </div>
        </div>
        <div
          className="detail"
          style={{
            padding: Edit ? "0px" : "30px 0",
          }}
        >
          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Name:
              {!Edit ? <span>{user.name}</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.name}
                  onChange={(e) => {
                    setUser({ ...user, name: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Surname:
              {!Edit ? <span>{user.surname}</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.surname}
                  onChange={(e) => {
                    setUser({ ...user, surname: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Username:
              {!Edit ? <span>{user.username}</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.username}
                  onChange={(e) => {
                    setUser({ ...user, username: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Password:
              {!Edit ? <span>{user.password}</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.password}
                  onChange={(e) => {
                    setUser({ ...user, password: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Balance:
              {!Edit ? <span>{user.balance}$</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.balance}
                  onChange={(e) => {
                    setUser({ ...user, balance: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>

          <div className="info">
            <p
              style={{
                padding: Edit ? "0" : "4px",
              }}
            >
              Email:
              {!Edit ? <span>{user.email}</span> : null}
            </p>
            {Edit ? (
              <div className="edit">
                <input
                  type="text"
                  placeholder={user.email}
                  className="inpo"
                  onChange={(e) => {
                    setUser({ ...user, email: e.target.value });
                  }}
                />
              </div>
            ) : null}
          </div>
        </div>

        <div className="buttons">
          {Edit ? (
            <button
              onClick={() => {
                setEdit(false);
                console.log(Edit);
                localStorage.setItem("user", JSON.stringify(user));
              }}
            >
              Submit
            </button>
          ) : (
            <button
              onClick={() => {
                setEdit(true);
                console.log(Edit);
              }}
            >
              Edit
            </button>
          )}

          <Link to="/">
            {" "}
            <button
              className="logout"
              onClick={() => {
                // JSON.parse(localStorage.getItem("user")|| "{}")
                dispatch(
                  putUser({
                    userId: user._id,
                    newObj: JSON.parse(localStorage.getItem("user") || "{}"),
                  })
                );
                console.log("LAMAN", user);
                localStorage.removeItem("user");
              }}
            >
              Log out
            </button>
          </Link>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      <React.Fragment key={"right"}>
        <button onClick={toggleDrawer(true)} className="btn">
          <MdOutlineManageAccounts className="account" />
        </button>
        <Drawer
          anchor={"right"}
          open={state["right"]}
          onClose={toggleDrawer(false)}
        >
          {list}
        </Drawer>
      </React.Fragment>
    </div>
  );
}
