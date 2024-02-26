import './../style/addProduct.scss';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import { Link } from 'react-router-dom';
import * as Yup from 'yup';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getAllProducts, putProduct } from './../redux/slices/AdminSlice';
import { useEffect } from 'react';
import swal from 'sweetalert';

const RegisterSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, 'Too Short!')
    .max(15, 'Too Long!')
    .required('Required')
    .matches(/^[a-z ,.'-]+$/i),

  img: Yup.string().required('Required'),

  description: Yup.string().min(2, 'Too Short!').max(200, 'Too Long!').required('Required'),

  category: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),

  price: Yup.number().min(1, 'Too little').required('Required'),
});

function Register() {
  const { _id } = useParams();
  const products = useSelector((state) => state.admin.products);
  const dispatch = useDispatch();
  const product = products.find((elem) => elem._id == _id);

  useEffect(() => {
    dispatch(getAllProducts());
  }, [dispatch]);
  console.log('REGISTER', product);

  const navigate = useNavigate();
  if (!product) {
    return <div>Loading...</div>;
  }

  console.log('ddd', product?.name);
  const initialValues = {
    name: product ? product.name : '',
    img: product ? product.img : '',
    description: product ? product.description : '',
    category: product ? product.category : '',
    price: product ? product.price : 0,
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
            <h1>Edit Product</h1>
            <Formik
              initialValues={initialValues}
              validationSchema={RegisterSchema}
              onSubmit={(values) => {
                console.log(values);

                dispatch(putProduct({ prodId: product._id, newObj: values }));

                navigate('/products');
                swal('Product edited successfully!');
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
                      <Field id="img" name="img" placeholder="Image URL" />
                      {errors.img && touched.img ? <div>{errors.img}</div> : null}
                    </div>

                    <div>
                      <Field id="description" name="description" placeholder="Description" />
                      {errors.description && touched.description ? (
                        <div>{errors.description}</div>
                      ) : null}
                    </div>
                  </div>
                  <div className="right">
                    <div>
                      <Field id="category" name="category" placeholder="Category" />
                      {errors.category && touched.category ? <div>{errors.category}</div> : null}
                    </div>

                    <div>
                      <Field id="price" name="price" placeholder="Price" />
                      {errors.price && touched.price ? <div>{errors.price}</div> : null}
                    </div>
                    <div className="btn">
                      <button id="registerBtn" type="submit">
                        Submit
                      </button>
                      <Link to="/products" className="loginBtn"></Link>
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
