import './../style/AddDog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { getAllPets, patchPet } from './../redux/slices/AdminSlice';
import swal from 'sweetalert';
import { Navigate, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
const RegisterSchema = Yup.object().shape({
  name: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  age: Yup.number().min(0, 'Invalid Age').required('Required'),
  gender: Yup.string().required('Required'),
  color: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  size: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Required'),
  city: Yup.string().min(2, 'Too Short!').max(20, 'Too Long!').required('Required'),
  breed: Yup.string().min(2, 'Too Short!').max(25, 'Too Long!').required('Required'),
  bio: Yup.string().min(2, 'Too Short!').max(500, 'Too Long!').required('Required'),
  img: Yup.string().min(2, 'Too Short!').max(105, 'Too Long!').required('Required'),
  price: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
});

function Register() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPets());
  }, [dispatch]);

  const allPets = useSelector((state) => state.admin.dogs);
  const dog = allPets.find((elem) => elem._id == _id);

  if (!dog) {
    return <div>Loading...</div>;
  }

  return (
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
          <h1>Edit Pet</h1>
          <Formik
            initialValues={{
              name: dog ? dog.name : '',
              age: dog ? dog.age : '',
              gender: dog ? dog.gender : '',
              color: dog ? dog.color : '',
              size: dog ? dog.size : '',
              city: dog ? dog.city : '',
              breed: dog ? dog.breed : '',
              bio: dog ? dog.bio : '',
              img: dog ? dog.img : '',
              price: dog ? dog.price : '',
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { resetForm }) => {
              console.log('INFOO', dog, values,dog._id);
              dispatch(patchPet({ petId: dog._id, updates: values }));
              navigate('/dogs');
              resetForm();
              swal('Dog edited successfully!', { icon: 'success' });
            }}
          >
            {({ errors, touched }) => (
              <Form>
                <div className="right">
                  <div>
                    <Field id="name" name="name" placeholder="Name" />
                    {errors.name && touched.name ? <div>{errors.name}</div> : null}
                  </div>

                  <div>
                    <Field id="age" name="age" placeholder="Age" />
                    {errors.age && touched.age ? <div>{errors.age}</div> : null}
                  </div>

                  <div>
                    <Field id="gender" name="gender" placeholder="Gender" />
                    {errors.gender && touched.gender ? <div>{errors.gender}</div> : null}
                  </div>
                  <div>
                    <Field id="color" name="color" placeholder="Color" />
                    {errors.color && touched.color ? <div>{errors.color}</div> : null}
                  </div>

                  <div>
                    <Field id="size" name="size" placeholder="Size" />
                    {errors.size && touched.size ? <div>{errors.size}</div> : null}
                  </div>

                  <div>
                    <Field id="city" name="city" placeholder="City" />
                    {errors.city && touched.city ? <div>{errors.city}</div> : null}
                  </div>
                </div>

                <div className="left">
                  <div>
                    <Field id="breed" name="breed" placeholder="Breed" />
                    {errors.breed && touched.breed ? <div>{errors.breed}</div> : null}
                  </div>

                  <div>
                    <Field id="bio" name="bio" placeholder="Bio" />
                    {errors.bio && touched.bio ? <div>{errors.bio}</div> : null}
                  </div>

                  <div>
                    <Field id="img" name="img" placeholder="Image URL" />
                    {errors.img && touched.img ? <div>{errors.img}</div> : null}
                  </div>

                  <div>
                    <Field id="price" name="price" placeholder="Price" />
                    {errors.price && touched.price ? <div>{errors.price}</div> : null}
                  </div>

                  <div className="btn">
                    <button id="registerBtn" type="submit">
                      Submit
                    </button>
                    <Link to="/dogs" className="loginBtn"></Link>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
}

Register.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Register;

