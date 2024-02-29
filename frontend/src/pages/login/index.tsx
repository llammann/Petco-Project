import "./../../assets/style/Login.scss";

import * as Yup from "yup";
import swal from "sweetalert";

import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import { useSelector, useDispatch } from "react-redux";
import type { AppDispatch, RootState } from "./../../redux/store";
import { getAllUsers } from "../../redux/slices/PetSlice";
import { useEffect } from "react";
interface MyFormValues {
  username: string;
  password: string;
}

interface userInt {
  name: String;
  surname: String;
  username: String;
  password: String;
  email: String;
  city: String;
  basket: object[];
  balance: Number;
}

const LoginSchema = Yup.object().shape({
  username: Yup.string()
    .min(2, "Too Short!")
    .max(10, "Too Long!")
    .required("Required")
    .matches(/^[a-z ,.'-]+$/i),

  password: Yup.string()
    .required("Required")
    .matches(/^[A-Za-z0-9._%+-]+$/),
});

function Login() {
  const users = useSelector((state: RootState) => state.pet.users);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log("LOGIN", users);

  const navigate = useNavigate();
  const initialValues: MyFormValues = {
    username: "",
    password: "",
  };
  return (
    <>
      <section className="login">
        <div className="container">
          <div className="sideImage">
            <div className="imgWrapper">
              <img
                src="https://i.pinimg.com/originals/b5/e5/34/b5e53470a8315fe8b287797c45f87bd2.gif"
                alt=""
              />
            </div>
          </div>
          <div className="myForm">
            <h1>Login</h1>
            <Formik
              className="formik"
              initialValues={initialValues}
              validationSchema={LoginSchema}
              onSubmit={async (values) => {
                const foundUser: any = users.find(
                  (element: any) =>
                    element.username === values.username &&
                    element.password === values.password
                );

                if (foundUser) {
                  // const userData: any = {
                  //   name: foundUser.name,
                  //   surname: foundUser.surname,
                  //   username: foundUser.username,
                  //   password: foundUser.password,
                  //   email: foundUser.email,
                  //   city: foundUser.city,
                  //   basket: foundUser.basket,
                  //   balance: foundUser.balance,
                  // };

                  localStorage.setItem("user", JSON.stringify(foundUser));
                  navigate("/home");
                  // window.location.reload();
                  console.log("foundUser", foundUser);
                } else {
                  swal("User not found");
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div>
                    <Field
                      id="username"
                      name="username"
                      placeholder="Username"
                    />
                    {errors.username && touched.username ? (
                      <div>{errors.username}</div>
                    ) : null}
                  </div>

                  <div>
                    <Field
                      id="password"
                      name="password"
                      placeholder="Password"
                    />
                    {errors.password && touched.password ? (
                      <div>{errors.password}</div>
                    ) : null}
                  </div>

                  <div className="btn">
                    <button id="loginBtn" type="submit">
                      Login
                    </button>
                    <Link to="/register" className="registerBtn"></Link>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </section>
    </>
  );
}

export default Login;
