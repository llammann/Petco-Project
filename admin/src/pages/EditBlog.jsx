import './../style/AddBlog.scss';
import React from 'react';
import PropTypes from 'prop-types';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';
import { useSelector, useDispatch } from 'react-redux';
import { patchNews, getAllNews } from './../redux/slices/AdminSlice';
import swal from 'sweetalert';
import { Navigate, useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { useEffect } from 'react';

const RegisterSchema = Yup.object().shape({
  title: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),

  featuredImage: Yup.string().required('Required'),

  content: Yup.string().min(10, 'Too Short!').required('Required'),

  author: Yup.string().min(2, 'Too Short!').max(15, 'Too Long!').required('Required'),

  tags: Yup.array().of(Yup.string().min(2, 'Too Short!').max(15, 'Too Long!')),
});

function Register() {
  const { _id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllNews());
  }, [dispatch]);

  const allNews = useSelector((state) => state.admin.news);
  const news = allNews.find((elem) => elem._id == _id);

  if (!news) {
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
          <h1>Edit Blog</h1>
          <Formik
            initialValues={{
              title: news ? news.title : '',
              featuredImage: news ? news.featuredImage : '',
              content: news ? news.content : '',
              author: news ? news.author : '',
              tags: news ? news.tags : [],
            }}
            validationSchema={RegisterSchema}
            onSubmit={(values, { resetForm }) => {
              dispatch(patchNews({ newsId: news._id, updates: values }));
              navigate('/blog');
              resetForm();
              swal('News edited successfully!', { icon: 'success' });
            }}
          >
            {({ errors, touched, values }) => (
              <Form>
                <div className="right">
                  <div>
                    <Field id="title" name="title" placeholder="Title" />
                    {errors.title && touched.title ? <div>{errors.title}</div> : null}
                  </div>

                  <div>
                    <Field
                      id="featuredImage"
                      name="featuredImage"
                      placeholder="Featured Image URL"
                    />
                    {errors.featuredImage && touched.featuredImage ? (
                      <div>{errors.featuredImage}</div>
                    ) : null}
                  </div>

                  <div>
                    <Field id="author" name="author" placeholder="Author" />
                    {errors.author && touched.author ? <div>{errors.author}</div> : null}
                  </div>
                </div>

                <div className="left">
                  <div>
                    <Field as="textarea" id="content" name="content" placeholder="Content" />
                    {errors.content && touched.content ? <div>{errors.content}</div> : null}
                  </div>

                  <div>
                    <FieldArray name="tags">
                      {({ push, remove }) => (
                        <>
                          {values.tags.map((tag, index) => (
                            <div key={index}>
                              <Field name={`tags.${index}`} id="tags" />
                              <button
                                type="button"
                                onClick={() => remove(index)}
                                className="RemoveTag"
                              >
                                Remove Tag
                              </button>
                            </div>
                          ))}
                          <button type="button" onClick={() => push('')} className="AddTag">
                            Add Tag
                          </button>
                        </>
                      )}
                    </FieldArray>
                  </div>

                  <div className="btn">
                    <button id="registerBtn" type="submit">
                      Submit
                    </button>
                    <Link to="/blog" className="loginBtn"></Link>
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
