import './../style/addUser.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';

import { useSelector, useDispatch } from 'react-redux';
import { getAllUsers, postUser } from './../redux/slices/AdminSlice';
import { useEffect } from 'react';
import swal from 'sweetalert';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
    .matches(/^[a-z ,.'-]+$/i),

  username: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
    .matches(/^[a-z ,.'-]+$/i),

  surname: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .required('Required')
    .matches(/^[a-z ,.'-]+$/i),

  email: Yup.string().email('Invalid email').required('Required'),

  password: Yup.string()
    .required('Required')
    .matches(/^[A-Za-z0-9._%+-]+$/),

  balance: Yup.number().min(1, 'Too little').required('Required'),
});

function Register() {
  const users = useSelector((state) => state.admin.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  console.log('REGISTER', users);

  const navigate = useNavigate();
  const initialValues = {
    name: '',
    surname: '',
    username: '',
    password: '',
    email: '',
    basket: [],
    balance: 0,
  };

  return (
    <>
      <div className="register">
        <div className="container">
          <div className="sideImage">
            <div className="imgWrapper">
              <img
                src="https://i.pinimg.com/originals/21/27/2d/21272d7d89d39451737885b05d6d940d.gif"
                alt=""
              />
            </div>
          </div>
          <div className="myForm">
            <h1>Add User</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                console.log(values);

                let findUsername = users.find((elem) => elem.username == values.username);

                let findEmail = users.find((elem) => elem.email == values.email);

                if (findUsername) {
                  swal('Username is already taken. Please choose a different one.');
                }
                if (findEmail) {
                  swal('Email address is already registered. Please use a different email.');
                } else {
                  swal('Succesfully registered!');
                  dispatch(postUser(values));
                  navigate('/user');
                  console.log('kjhdewkld;riufd');
                }
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <div className="left">
                    <div>
                      <Field id="name" name="name" placeholder="Name" />
                      {errors.name && touched.name ? <div>{errors.name}</div> : null}
                    </div>

                    <div>
                      <Field id="username" name="username" placeholder="Username" />
                      {errors.username && touched.username ? <div>{errors.username}</div> : null}
                    </div>

                    <div>
                      <Field id="surname" name="surname" placeholder="Surname" />
                      {errors.surname && touched.surname ? <div>{errors.surname}</div> : null}
                    </div>
                  </div>
                  <div className="right">
                    <div>
                      <Field id="email" name="email" placeholder="Email" />
                      {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    </div>
                    <div>
                      <Field id="password" name="password" placeholder="Password" />
                      {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    </div>

                    {/* <div>
                      <Field id="city" name="city" placeholder="City" />
                      {errors.city && touched.city ? (
                        <div>{errors.city}</div>
                      ) : null}
                    </div> */}

                    <div>
                      <Field
                        id="balance"
                        name="balance"
                        placeholder="Balance"
                        style={{ color: 'gray' }}
                      />
                      {errors.balance && touched.balance ? <div>{errors.balance}</div> : null}
                    </div>

                    <div className="btn">
                      <button id="registerBtn" type="submit">
                        Register
                      </button>
                      <Link to="/user" className="loginBtn"></Link>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </div>
    </>
  );
}

export default Register;
